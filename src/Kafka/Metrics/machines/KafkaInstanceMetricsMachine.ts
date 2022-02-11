import { createModel } from "xstate/lib/model";
import {
  DurationOptions,
  GetKafkaInstanceMetricsResponse,
  TimeSeriesMetrics,
} from "../types";

const MAX_RETRIES = 3;

export const KafkaInstanceMetricsModel = createModel(
  {
    lastUpdated: undefined as Date | undefined,

    // from the UI elements
    duration: 60 as DurationOptions,

    // from the api
    usedDiskSpaceMetrics: {} as TimeSeriesMetrics,
    clientConnectionsMetrics: {} as TimeSeriesMetrics,
    connectionAttemptRateMetrics: {} as TimeSeriesMetrics,
    // how many time did we try a fetch (that combines more api)
    fetchFailures: 0 as number,
  },
  {
    events: {
      // called when a new kafka id has been specified
      fetchSuccess: (value: GetKafkaInstanceMetricsResponse) => ({ ...value }),
      fetchFail: () => ({}),

      // to refresh the data
      refresh: () => ({}),

      // from the UI elements
      selectTopic: (topic: string | undefined) => ({
        selectedTopic: topic,
      }),
      selectDuration: (duration: DurationOptions) => ({
        duration: duration,
      }),
    },
  }
);

const setFetchTimestamp = KafkaInstanceMetricsModel.assign({
  lastUpdated: () => new Date(),
});

const setMetrics = KafkaInstanceMetricsModel.assign((_, event) => {
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
}, "fetchSuccess");

const incrementRetries = KafkaInstanceMetricsModel.assign(
  {
    fetchFailures: (context) => context.fetchFailures + 1,
  },
  "fetchFail"
);

const resetRetries = KafkaInstanceMetricsModel.assign(
  {
    fetchFailures: () => 0,
  },
  "refresh"
);

const setDuration = KafkaInstanceMetricsModel.assign(
  {
    duration: (_, event) => event.duration,
    usedDiskSpaceMetrics: {},
    clientConnectionsMetrics: {},
    connectionAttemptRateMetrics: {},
  },
  "selectDuration"
);

const apiState = {
  initial: "loading",
  states: {
    loading: {
      invoke: {
        src: "api",
      },
      on: {
        fetchFail: {
          actions: incrementRetries,
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

export const KafkaInstanceMetricsMachine =
  KafkaInstanceMetricsModel.createMachine(
    {
      id: "kafkaInstanceMetrics",
      context: KafkaInstanceMetricsModel.initialContext,
      initial: "initialLoading",
      states: {
        initialLoading: {
          ...apiState,
          tags: "initialLoading",
          entry: setFetchTimestamp,
          on: {
            fetchSuccess: [
              {
                cond: "isJustCreated",
                actions: setMetrics,
                target: "#kafkaInstanceMetrics.withResponse",
              },
              { actions: setMetrics, target: "justCreated" },
            ],
          },
        },
        callApi: {
          ...apiState,
          tags: "loading",
          entry: setFetchTimestamp,
          on: {
            fetchSuccess: {
              actions: setMetrics,
              target: "#kafkaInstanceMetrics.withResponse",
            },
          },
        },
        criticalFail: {
          tags: "failed",
          on: {
            refresh: {
              actions: resetRetries,
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
              actions: setDuration,
              target: "callApi",
            },
          },
        },
        refreshing: {
          tags: "refreshing",
          entry: setFetchTimestamp,
          invoke: {
            src: "api",
          },
          on: {
            fetchSuccess: {
              actions: setMetrics,
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
