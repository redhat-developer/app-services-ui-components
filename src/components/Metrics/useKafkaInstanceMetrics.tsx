import { useSelector } from "@xstate/react";
import { useCallback, useContext } from "react";
import { KafkaInstanceMetricsModel } from "./machines";
import { KafkaInstanceMetricsContext } from "./KafkaInstanceMetricsProvider";
import { DurationOptions } from "./types";

export function useKafkaInstanceMetrics() {
  const { service } = useContext(KafkaInstanceMetricsContext);

  const selector = useCallback(
    (state: typeof service.state) => ({
      ...state.context,
      isInitialLoading: state.hasTag("initialLoading"),
      isRefreshing: state.hasTag("refreshing"),
      isLoading: state.hasTag("loading"),
      isFailed: state.hasTag("failed"),
    }),
    []
  );
  const {
    usedDiskSpaceMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    duration,
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
  } = useSelector(service, selector);

  const onDurationChange = useCallback(
    (duration: DurationOptions) =>
      service.send(KafkaInstanceMetricsModel.events.selectDuration(duration)),
    [service]
  );

  const onRefresh = useCallback(
    () => service.send(KafkaInstanceMetricsModel.events.refresh()),
    [service]
  );

  return {
    usedDiskSpaceMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    duration,
    onDurationChange,
    onRefresh,
  };
}
