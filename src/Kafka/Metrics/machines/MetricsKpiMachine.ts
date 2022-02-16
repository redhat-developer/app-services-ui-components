import { assign, createMachine } from "xstate";
import { GetMetricsKpiResponse } from "../types";

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
          { target: "#kpis.criticalFail" },
        ],
      },
    },
  },
};

export const MetricsKpiMachine = createMachine(
  {
    tsTypes: {} as import("./MetricsKpiMachine.typegen").Typegen0,
    schema: {
      context: {} as {
        // from the api
        topics: number | undefined;
        topicPartitions: number | undefined;
        consumerGroups: number | undefined;

        // how many time did we try a fetch (that combines more api)
        fetchFailures: number;
      },
      events: {} as
        | { type: "fetch" }
        | ({ type: "fetchSuccess" } & GetMetricsKpiResponse)
        | { type: "fetchFail" }
        | { type: "refresh" },
    },
    id: "kpis",
    context: {
      topics: undefined,
      topicPartitions: undefined,
      consumerGroups: undefined,
      fetchFailures: 0,
    },
    initial: "initialLoading",
    states: {
      initialLoading: {
        ...apiState,
        tags: "initialLoading",
        on: {
          fetchSuccess: [
            {
              cond: "isJustCreated",
              actions: "setMetrics",
              target: "#kpis.withResponse",
            },
            { actions: "setMetrics", target: "justCreated" },
          ],
        },
      },
      callApi: {
        ...apiState,
        tags: "loading",
        on: {
          fetchSuccess: {
            actions: "setMetrics",
            target: "#kpis.withResponse",
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
            invoke: {
              src: "api",
            },
            on: {
              fetchSuccess: {
                actions: "setMetrics",
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
    actions: {
      setMetrics: assign((_, event) => {
        const { topics, topicPartitions, consumerGroups } = event;
        return {
          topics,
          topicPartitions,
          consumerGroups,
        };
      }),

      incrementRetries: assign({
        fetchFailures: (context) => context.fetchFailures + 1,
      }),

      resetRetries: assign({
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        fetchFailures: (_context) => 0,
      }),
    },
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
