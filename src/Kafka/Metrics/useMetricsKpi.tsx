import { useSelector } from "@xstate/react";
import { useCallback, useContext } from "react";
import type { MetricsKpiMachineContext } from "./machines";
import { MetricsKpiContext } from "./MetricsKpiProvider";

type SelectorReturn = MetricsKpiMachineContext & {
  isInitialLoading: boolean;
  isRefreshing: boolean;
  isLoading: boolean;
  isFailed: boolean;
  isJustCreated: boolean;
};

export function useMetricsKpi() {
  const { service } = useContext(MetricsKpiContext);

  const {
    topics,
    topicPartitions,
    topicPartitionsLimit,
    consumerGroups,
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
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

  const onRefresh = useCallback(() => service.send("refresh"), [service]);

  return {
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    topics,
    topicPartitions,
    consumerGroups,
    topicPartitionsLimit,
    onRefresh,
  };
}
