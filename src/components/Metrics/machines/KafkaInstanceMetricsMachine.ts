import { createModel } from "xstate/lib/model";
import {
  DurationOptions,
  GetKafkaInstanceMetricsResponse,
  TimeSeriesMetrics,
} from "../types";

const MAX_RETRIES = 3;

export const KafkaInstanceMetricsModel = createModel(
  {
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
      fetch: () => ({}),
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
  },
  "selectDuration"
);

export const KafkaInstanceMetricsMachine = KafkaInstanceMetricsModel.createMachine(
  {
    id: "diskSpace",
    context: KafkaInstanceMetricsModel.initialContext,
    initial: "callApi",
    states: {
      callApi: {
        tags: "loading",
        initial: "loading",
        states: {
          loading: {
            invoke: {
              src: "api",
            },
            on: {
              fetchSuccess: {
                actions: setMetrics,
                target: "#diskSpace.verifyData",
              },
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
                { target: "#diskSpace.criticalFail" },
              ],
            },
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
      verifyData: {
        always: [
          { cond: "hasMetrics", target: "withMetrics" },
          { target: "noData" },
        ],
      },
      noData: {
        tags: "no-data",
        on: {
          refresh: {
            actions: resetRetries,
            target: "callApi",
          },
          selectDuration: {
            actions: setDuration,
            target: "refreshing",
          },
        },
      },
      withMetrics: {
        on: {
          refresh: {
            target: "refreshing",
          },
          selectDuration: {
            actions: setDuration,
            target: "refreshing",
          },
        },
      },
      refreshing: {
        tags: "refreshing",
        invoke: {
          src: "api",
        },
        on: {
          fetchSuccess: {
            actions: setMetrics,
            target: "verifyData",
          },
          fetchFail: {
            // 👀 we silently ignore this happened and go back to the right
            // state depending on the previous data
            target: "verifyData",
          },
        },
      },
    },
  },
  {
    guards: {
      canRetryFetching: (context) => context.fetchFailures < MAX_RETRIES,
      hasMetrics: (context) =>
        Object.keys(context.usedDiskSpaceMetrics).length > 0,
    },
  }
);

export type KafkaInstanceMetricsMachineType = typeof KafkaInstanceMetricsMachine;
