import { createModel } from "xstate/lib/model";
import { GetMetricsKpiResponse } from "../types";

const MAX_RETRIES = 3;

export const MetricsKpiModel = createModel(
  {
    // from the api
    topics: undefined as number | undefined,
    topicPartitions: undefined as number | undefined,
    consumerGroups: undefined as number | undefined,

    // how many time did we try a fetch (that combines more api)
    fetchFailures: 0 as number,
  },
  {
    events: {
      // called when a new kafka id has been specified
      fetch: () => ({}),
      fetchSuccess: (value: GetMetricsKpiResponse) => ({ ...value }),
      fetchFail: () => ({}),

      // to refresh the data
      refresh: () => ({}),
    },
  }
);

const setMetrics = MetricsKpiModel.assign((_, event) => {
  const { topics, topicPartitions, consumerGroups } = event;
  return {
    topics,
    topicPartitions,
    consumerGroups,
  };
}, "fetchSuccess");

const incrementRetries = MetricsKpiModel.assign(
  {
    fetchFailures: (context) => context.fetchFailures + 1,
  },
  "fetchFail"
);

const resetRetries = MetricsKpiModel.assign(
  {
    fetchFailures: () => 0,
  },
  "refresh"
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
          { target: "#kpis.criticalFail" },
        ],
      },
    },
  },
};

export const MetricsKpiMachine = MetricsKpiModel.createMachine(
  {
    id: "kpis",
    context: MetricsKpiModel.initialContext,
    initial: "initialLoading",
    states: {
      initialLoading: {
        ...apiState,
        tags: "initialLoading",
        on: {
          fetchSuccess: [
            {
              cond: "isJustCreated",
              actions: setMetrics,
              target: "#kpis.withResponse",
            },
            { actions: setMetrics, target: "justCreated" },
          ],
        },
      },
      callApi: {
        ...apiState,
        tags: "loading",
        on: {
          fetchSuccess: {
            actions: setMetrics,
            target: "#kpis.withResponse",
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
                target: "#kpis.withResponse",
              },
              fetchFail: {
                // 👀 we silently ignore this happened
                target: "#kpis.withResponse",
              },
            },
          },
        },
        on: {
          refresh: {
            target: "#kpis.withResponse.refreshing",
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
            event.topics !== undefined ||
            event.topicPartitions !== undefined ||
            event.consumerGroups !== undefined
          );
        }
        return false;
      },
    },
  }
);

export type MetricsKpiMachineType = typeof MetricsKpiMachine;
