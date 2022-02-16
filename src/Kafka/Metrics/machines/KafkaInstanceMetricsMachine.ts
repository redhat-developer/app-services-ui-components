import { assign, createMachine } from "xstate";
import {
  DurationOptions,
  GetKafkaInstanceMetricsResponse,
  TimeSeriesMetrics,
} from "../types";

const MAX_RETRIES = 3;

const apiState = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: "api",
      },
      on: {
        fetchFail: {
          actions: "incrementRetries",
          target: "failure",
        },
      },
    },
    failure: {
      after: {
        1000: [
          { cond: "canRetryFetching", target: "loading" },
          { target: "#kafkaInstanceMetrics.criticalFail" },
        ],
      },
    },
  },
};

export const KafkaInstanceMetricsMachine = createMachine(
  {
    tsTypes: {} as import("./KafkaInstanceMetricsMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        lastUpdated: Date | undefined;

        // from the UI elements
        duration: DurationOptions;

        // from the api
        usedDiskSpaceMetrics: TimeSeriesMetrics;
        clientConnectionsMetrics: TimeSeriesMetrics;
        connectionAttemptRateMetrics: TimeSeriesMetrics;
        // how many time did we try a fetch (that combines more api)
        fetchFailures: number;
      },
      events: {} as
        | ({ type: "fetchSuccess" } & GetKafkaInstanceMetricsResponse)
        | { type: "fetchFail" }
        // to refresh the data
        | { type: "refresh" }
        // from the UI elements
        | { type: "selectTopic"; topic: string | undefined }
        | { type: "selectDuration"; duration: DurationOptions },
    },
    id: "kafkaInstanceMetrics",
    context: {
      lastUpdated: undefined,
      duration: DurationOptions.Last1hour,
      usedDiskSpaceMetrics: {},
      clientConnectionsMetrics: {},
      connectionAttemptRateMetrics: {},
      fetchFailures: 0,
    },
    initial: "initialLoading",
    states: {
      initialLoading: {
        ...apiState,
        tags: "initialLoading",
        entry: "setFetchTimestamp",
        on: {
          fetchSuccess: [
            {
              cond: "isJustCreated",
              actions: "setMetrics",
              target: "#kafkaInstanceMetrics.withResponse",
            },
            { actions: "setMetrics", target: "justCreated" },
          ],
        },
      },
      callApi: {
        ...apiState,
        tags: "loading",
        entry: "setFetchTimestamp",
        on: {
          fetchSuccess: {
            actions: "setMetrics",
            target: "#kafkaInstanceMetrics.withResponse",
          },
        },
      },
      criticalFail: {
        tags: "failed",
        on: {
          refresh: {
            actions: "resetRetries",
            target: "callApi",
          },
        },
      },
      justCreated: {
        tags: "justCreated",
        on: {
          refresh: {
            target: "initialLoading",
          },
        },
      },
      withResponse: {
        tags: "withResponse",
        on: {
          refresh: {
            target: "refreshing",
          },
          selectDuration: {
            actions: "setDuration",
            target: "callApi",
          },
        },
      },
      refreshing: {
        tags: "refreshing",
        entry: "setFetchTimestamp",
        invoke: {
          src: "api",
        },
        on: {
          fetchSuccess: {
            actions: "setMetrics",
            target: "withResponse",
          },
          fetchFail: {
            // 👀 we silently ignore this happened and go back to the right
            // state depending on the previous data
            target: "withResponse",
          },
        },
      },
    },
  },
  {
    actions: {
      setFetchTimestamp: assign({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        lastUpdated: (_context) => new Date(),
      }),
      setMetrics: assign((_, event) => {
        const {
          usedDiskSpaceMetrics,
          clientConnectionsMetrics,
          connectionAttemptRateMetrics,
        } = event;
        return {
          usedDiskSpaceMetrics,
          clientConnectionsMetrics,
          connectionAttemptRateMetrics,
        };
      }),
      incrementRetries: assign({
        fetchFailures: (context) => context.fetchFailures + 1,
      }),
      resetRetries: assign({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchFailures: (_context) => 0,
      }),
      setDuration: assign((_context, event) => ({
        duration: event.duration,
        usedDiskSpaceMetrics: {},
        clientConnectionsMetrics: {},
        connectionAttemptRateMetrics: {},
      })),
    },
    guards: {
      canRetryFetching: (context) => context.fetchFailures < MAX_RETRIES,
      isJustCreated: (_, event) => {
        if (event.type === "fetchSuccess") {
          return (
            Object.keys(event.clientConnectionsMetrics).length > 0 ||
            Object.keys(event.connectionAttemptRateMetrics).length > 0 ||
            Object.keys(event.usedDiskSpaceMetrics).length > 0
          );
        }
        return false;
      },
    },
  }
);

export type KafkaInstanceMetricsMachineType =
  typeof KafkaInstanceMetricsMachine;
