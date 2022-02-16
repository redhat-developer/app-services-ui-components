import { assign, createMachine } from "xstate";
import {
  DurationOptions,
  TimeSeriesMetrics,
  PartitionBytesMetric,
  GetTopicsMetricsResponse,
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
          { target: "#topicsMetrics.criticalFail" },
        ],
      },
    },
  },
};

export const TopicsMetricsMachine = createMachine(
  {
    tsTypes: {} as import("./TopicsMetricsMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        lastUpdated: Date | undefined;

        // from the UI elements
        selectedTopic: string | undefined;
        duration: DurationOptions;

        // from the api
        kafkaTopics: string[];
        metricsTopics: string[];
        bytesOutgoing: TimeSeriesMetrics;
        bytesIncoming: TimeSeriesMetrics;
        bytesPerPartition: PartitionBytesMetric;
        incomingMessageRate: TimeSeriesMetrics;

        // how many time did we try a fetch (that combines more api)
        fetchFailures: number;
      },
      events: {} as  // called when a new kafka id has been specified
        | ({ type: "fetchSuccess" } & GetTopicsMetricsResponse)
        | { type: "fetchFail" }

        // to refresh the data
        | { type: "refresh" }

        // from the UI elements
        | { type: "selectTopic"; topic: string | undefined }
        | { type: "selectDuration"; duration: DurationOptions },
    },
    id: "topicsMetrics",
    context: {
      lastUpdated: undefined,

      // from the UI elements
      selectedTopic: undefined,
      duration: DurationOptions.Last1hour,

      // from the api
      kafkaTopics: [],
      metricsTopics: [],
      bytesOutgoing: {},
      bytesIncoming: {},
      bytesPerPartition: {},
      incomingMessageRate: {},

      // how many time did we try a fetch (that combines more api)
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
              target: "#topicsMetrics.withResponse",
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
            target: "#topicsMetrics.withResponse",
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
        initial: "idle",
        states: {
          idle: {},
          refreshing: {
            tags: "refreshing",
            entry: "setFetchTimestamp",
            invoke: {
              src: "api",
            },
            on: {
              fetchSuccess: {
                actions: "setMetrics",
                target: "#topicsMetrics.withResponse",
              },
              fetchFail: {
                // 👀 we silently ignore this happened
                target: "#topicsMetrics.withResponse",
              },
            },
          },
        },
        on: {
          refresh: {
            target: "#topicsMetrics.withResponse.refreshing",
          },
          selectTopic: {
            actions: "setTopic",
            target: "callApi",
          },
          selectDuration: {
            actions: "setDuration",
            target: "callApi",
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
      setMetrics: assign((_context, event) => {
        const {
          kafkaTopics,
          metricsTopics,
          bytesPerPartition,
          bytesIncoming,
          bytesOutgoing,
          incomingMessageRate,
        } = event;
        return {
          kafkaTopics,
          metricsTopics,
          bytesPerPartition,
          bytesIncoming,
          bytesOutgoing,
          incomingMessageRate,
        };
      }),
      incrementRetries: assign({
        fetchFailures: (context) => context.fetchFailures + 1,
      }),
      resetRetries: assign({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchFailures: (_context) => 0,
      }),
      setTopic: assign({
        selectedTopic: (_context, event) => event.topic,
      }),
      setDuration: assign({
        duration: (_, event) => event.duration,
      }),
    },
    guards: {
      canRetryFetching: (context) => context.fetchFailures < MAX_RETRIES,
      isJustCreated: (_, event) => {
        if (event.type === "fetchSuccess") {
          return (
            Object.keys(event.bytesIncoming).length > 0 ||
            Object.keys(event.bytesOutgoing).length > 0 ||
            Object.keys(event.bytesPerPartition).length > 0 ||
            Object.keys(event.incomingMessageRate).length > 0
          );
        }
        return false;
      },
    },
  }
);

export type TopicsMetricsMachineType = typeof TopicsMetricsMachine;
