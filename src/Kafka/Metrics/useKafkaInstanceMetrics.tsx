import { useSelector } from "@xstate/react";
import { useCallback, useContext } from "react";
import { KafkaInstanceMetricsContext } from "./KafkaInstanceMetricsProvider";
import type { KafkaInstanceMetricsMachineContext } from "./machines";
import type { BrokerFilter, DurationOptions, PartitionSelect } from "./types";

type SeletorReturn = KafkaInstanceMetricsMachineContext & {
  isInitialLoading: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  isFailed: boolean;
  isJustCreated: boolean;
};

export function useKafkaInstanceMetrics() {
  const { service } = useContext(KafkaInstanceMetricsContext);

  const {
    selectedToggle,
    selectedBroker,
    brokers,
    usedDiskSpaceMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    bytesPerPartitionMetrics,
    diskSpaceLimit,
    connectionsLimit,
    connectionRateLimit,
    duration,
    lastUpdated,
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    selectedPartition,
  } = useSelector<typeof service, SeletorReturn>(
    service,
    useCallback(
      (state) => ({
        ...state.context,
        isInitialLoading: state.hasTag("initialLoading"),
        isRefreshing: state.hasTag("refreshing"),
        isLoading: state.hasTag("loading"),
        isFailed: state.hasTag("failed"),
        isJustCreated: state.hasTag("justCreated"),
      }),
      []
    )
  );

  const onBrokerChange = useCallback(
    (broker: string | undefined) =>
      service.send({ type: "selectBroker", broker }),
    [service]
  );

  const onDurationChange = useCallback(
    (duration: DurationOptions) =>
      service.send({ type: "selectDuration", duration }),
    [service]
  );

  const onRefresh = useCallback(() => service.send("refresh"), [service]);

  const onSelectToggle = useCallback(
    (value: BrokerFilter) => service.send({ type: "selectToggle", value }),
    [service]
  );

  const onSelectPartition = useCallback(
    (value: PartitionSelect) =>
      service.send({ type: "selectPartition", value }),
    [service]
  );

  return {
    usedDiskSpaceMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    bytesPerPartitionMetrics,
    diskSpaceLimit,
    connectionsLimit,
    connectionRateLimit,
    lastUpdated,
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    duration,
    onDurationChange,
    onRefresh,
    onBrokerChange,
    selectedBroker,
    brokers,
    selectedToggle,
    onSelectToggle,
    onSelectPartition,
    selectedPartition,
  };
}
