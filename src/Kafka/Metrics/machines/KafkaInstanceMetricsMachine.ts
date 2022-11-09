import { assign, createMachine } from "xstate";
import type {
  BrokerBytesMetric,
  BrokerFilter,
  GetKafkaInstanceMetricsResponse,
  PartitionBytesMetric,
  PartitionSelect,
  TimeSeriesMetrics,
} from "../types";
import { DurationOptions } from "../types";

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

export type KafkaInstanceMetricsMachineContext = {
  lastUpdated: Date | undefined;

  // from the UI elements
  duration: DurationOptions;
  selectedBroker: string | undefined;
  selectedToggle: BrokerFilter | undefined;
  selectedPartition: PartitionSelect;

  // from the api
  brokers: string[];
  usedDiskSpaceMetrics: BrokerBytesMetric;
  clientConnectionsMetrics: TimeSeriesMetrics;
  connectionAttemptRateMetrics: TimeSeriesMetrics;
  bytesPerPartitionMetrics: PartitionBytesMetric;
  diskSpaceLimit: number | undefined;
  connectionsLimit: number | undefined;
  connectionRateLimit: number | undefined;
  // how many time did we try a fetch (that combines more api)
  fetchFailures: number;
};

export const KafkaInstanceMetricsMachine = createMachine(
  {
    tsTypes: {} as import("./KafkaInstanceMetricsMachine.typegen").Typegen0,
    schema: {
      context: {} as KafkaInstanceMetricsMachineContext,
      events: {} as
        | ({ type: "fetchSuccess" } & GetKafkaInstanceMetricsResponse)
        | { type: "fetchFail" }
        // to refresh the data
        | { type: "refresh" }
        // from the UI elements
        | { type: "selectTopic"; topic: string | undefined }
        | { type: "selectDuration"; duration: DurationOptions }
        | { type: "selectBroker"; broker: string | undefined }
        | { type: "selectToggle"; value: BrokerFilter | undefined }
        | { type: "selectPartition"; value: PartitionSelect },
    },
    id: "kafkaInstanceMetrics",
    context: {
      lastUpdated: undefined,
      selectedBroker: undefined,
      duration: DurationOptions.Last1hour,
      usedDiskSpaceMetrics: {},
      bytesPerPartitionMetrics: {},
      clientConnectionsMetrics: {},
      connectionAttemptRateMetrics: {},
      diskSpaceLimit: undefined,
      connectionsLimit: undefined,
      connectionRateLimit: undefined,
      fetchFailures: 0,
      brokers: [],
      selectedToggle: "total",
      selectedPartition: "Top10",
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
          selectBroker: {
            actions: "setBroker",
            target: "callApi",
          },
          selectToggle: {
            actions: "setToggle",
            target: "callApi",
          },
          selectPartition: {
            actions: "setPartition",
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
          bytesPerPartitionMetrics,
          clientConnectionsMetrics,
          connectionAttemptRateMetrics,
          diskSpaceLimit,
          connectionsLimit,
          connectionRateLimit,
          brokers,
        } = event;
        return {
          brokers,
          usedDiskSpaceMetrics,
          bytesPerPartitionMetrics,
          clientConnectionsMetrics,
          connectionAttemptRateMetrics,
          diskSpaceLimit: diskSpaceLimit * 1024 ** 3, // convert it to GiB
          connectionsLimit,
          connectionRateLimit,
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
        bytesPerPartitionMetrics: {},
        clientConnectionsMetrics: {},
        connectionAttemptRateMetrics: {},
      })),
      setBroker: assign({
        selectedBroker: (_context, event) => event.broker,
      }),
      setToggle: assign((_, { value }) => ({ selectedToggle: value })),
      setPartition: assign((_, { value }) => ({ selectedPartition: value })),
    },
    guards: {
      canRetryFetching: (context) => context.fetchFailures < MAX_RETRIES,
      isJustCreated: (_, event) => {
        if (event.type === "fetchSuccess") {
          return (
            Object.keys(event.clientConnectionsMetrics).length > 0 ||
            Object.keys(event.connectionAttemptRateMetrics).length > 0 ||
            Object.keys(event.usedDiskSpaceMetrics).length > 0 ||
            Object.keys(event.bytesPerPartitionMetrics).length > 0
          );
        }
        return false;
      },
    },
  }
);

export type KafkaInstanceMetricsMachineType =
  typeof KafkaInstanceMetricsMachine;
