import { useSelector } from "@xstate/react";
import { useCallback, useContext, useMemo } from "react";
import { DurationOptions } from "./types";
import { TopicsMetricsContext } from "./TopicsMetricsProvider";

export function useTopicsMetrics() {
  const { service } = useContext(TopicsMetricsContext);

  const selector = useCallback(
    (state: typeof service.state) => ({
      ...state.context,
      isInitialLoading: state.hasTag("initialLoading"),
      isRefreshing: state.hasTag("refreshing"),
      isLoading: state.hasTag("loading"),
      isFailed: state.hasTag("failed"),
      isJustCreated: state.hasTag("justCreated"),
    }),
    [service]
  );
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
  } = useSelector(service, selector);

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
  };
}
