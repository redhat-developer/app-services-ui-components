import { createModel } from "xstate/lib/model";
import {
  DurationOptions,
  TimeSeriesMetrics,
  PartitionBytesMetric,
  GetTopicsMetricsResponse,
} from "../types";

const MAX_RETRIES = 3;

export const TopicsMetricsModel = createModel(
  {
    // from the UI elements
    selectedTopic: undefined as string | undefined,
    duration: 60 as DurationOptions,

    // from the api
    kafkaTopics: [] as string[],
    metricsTopics: [] as string[],
    bytesOutgoing: {} as TimeSeriesMetrics,
    bytesIncoming: {} as TimeSeriesMetrics,
    bytesPerPartition: {} as PartitionBytesMetric,
    incomingMessageRate: {} as TimeSeriesMetrics,

    // how many time did we try a fetch (that combines more api)
    fetchFailures: 0 as number,
  },
  {
    events: {
      // called when a new kafka id has been specified
      fetch: () => ({}),
      fetchSuccess: (value: GetTopicsMetricsResponse) => ({ ...value }),
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

const setMetrics = TopicsMetricsModel.assign((_, event) => {
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
}, "fetchSuccess");

const incrementRetries = TopicsMetricsModel.assign(
  {
    fetchFailures: (context) => context.fetchFailures + 1,
  },
  "fetchFail"
);

const resetRetries = TopicsMetricsModel.assign(
  {
    fetchFailures: () => 0,
  },
  "refresh"
);

const setTopic = TopicsMetricsModel.assign(
  {
    selectedTopic: (_, event) => event.selectedTopic,
  },
  "selectTopic"
);

const setDuration = TopicsMetricsModel.assign(
  {
    duration: (_, event) => event.duration,
  },
  "selectDuration"
);

export const TopicsMetricsMachine = TopicsMetricsModel.createMachine(
  {
    id: "topics",
    context: TopicsMetricsModel.initialContext,
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
                target: "#topics.verifyData",
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
                { target: "#topics.criticalFail" },
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
          { cond: "hasMetrics", target: "withTopics" },
          { target: "noData" },
        ],
      },
      noData: {
        tags: "no-data",
        initial: "idle",
        states: {
          idle: {},
          refreshing: {
            tags: "refreshing",
            invoke: {
              src: "api",
            },
            on: {
              fetchSuccess: {
                actions: setMetrics,
                target: "#topics.verifyData",
              },
              fetchFail: {
                // 👀 we silently ignore this happened
                target: "#topics.noData",
              },
            },
          },
        },
        on: {
          refresh: {
            target: "#topics.noData.refreshing",
          },
          selectTopic: {
            actions: setTopic,
            target: "#topics.noData.refreshing",
          },
          selectDuration: {
            actions: setDuration,
            target: "#topics.noData.refreshing",
          },
        },
      },
      withTopics: {
        initial: "idle",
        states: {
          idle: {},
          refreshing: {
            tags: "refreshing",
            invoke: {
              src: "api",
            },
            on: {
              fetchSuccess: {
                actions: setMetrics,
                target: "#topics.verifyData",
              },
              fetchFail: {
                // 👀 we silently ignore this happened
                target: "#topics.withTopics",
              },
            },
          },
        },
        on: {
          refresh: {
            target: "#topics.withTopics.refreshing",
          },
          selectTopic: {
            actions: setTopic,
            target: "#topics.withTopics.refreshing",
          },
          selectDuration: {
            actions: setDuration,
            target: "#topics.withTopics.refreshing",
          },
        },
      },
    },
  },
  {
    guards: {
      canRetryFetching: (context) => context.fetchFailures < MAX_RETRIES,
      hasMetrics: (context) => {
        const hasSomeTopics =
          context.kafkaTopics.length > 0 || context.metricsTopics.length > 0;
        const hasSomeMetrics =
          Object.keys(context.bytesIncoming).length > 0 ||
          Object.keys(context.bytesOutgoing).length > 0;
        return hasSomeTopics && hasSomeMetrics;
      },
    },
  }
);

export type TopicsMetricsMachineType = typeof TopicsMetricsMachine;
