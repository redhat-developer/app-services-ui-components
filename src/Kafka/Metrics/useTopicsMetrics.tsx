import { useSelector } from "@xstate/react";
import { useCallback, useContext, useMemo } from "react";
import type { TopicsMetricsMachineContext } from "./machines";
import { TopicsMetricsContext } from "./TopicsMetricsProvider";
import type { DurationOptions, PartitionSelect } from "./types";

type SelectorReturn = TopicsMetricsMachineContext & {
  isInitialLoading: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  isFailed: boolean;
  isJustCreated: boolean;
};

export function useTopicsMetrics() {
  const { service } = useContext(TopicsMetricsContext);

  const {
    selectedTopic,
    duration,
    kafkaTopics,
    metricsTopics,
    bytesIncoming,
    bytesOutgoing,
    bytesPerPartition,
    incomingMessageRate,
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    lastUpdated,
    selectedPartition,
  } = useSelector<typeof service, SelectorReturn>(
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

  const onTopicChange = useCallback(
    (topic: string | undefined) => service.send({ type: "selectTopic", topic }),
    [service]
  );

  const onDurationChange = useCallback(
    (duration: DurationOptions) =>
      service.send({ type: "selectDuration", duration }),
    [service]
  );

  const onRefresh = useCallback(() => service.send("refresh"), [service]);

  const mergedTopics = useMemo((): string[] => {
    const topics = Array.from(
      new Set<string>([...kafkaTopics, ...metricsTopics])
    );
    topics.sort((a, b) => a.localeCompare(b));
    return topics;
  }, [kafkaTopics, metricsTopics]);

  const onSelectPartition = useCallback(
    (value: PartitionSelect) =>
      service.send({ type: "selectPartition", value }),
    [service]
  );

  return {
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    lastUpdated,
    topics: mergedTopics,
    selectedTopic,
    duration,
    bytesIncoming,
    bytesOutgoing,
    bytesPerPartition,
    incomingMessageRate,
    onTopicChange,
    onDurationChange,
    onRefresh,
    onSelectPartition,
    selectedPartition,
  };
}
