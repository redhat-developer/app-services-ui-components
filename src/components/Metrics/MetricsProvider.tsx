import { useInterpret } from "@xstate/react";
import React, { createContext, FunctionComponent } from "react";
import { InterpreterFrom } from "xstate";
import {
  DiskSpaceMetricsMachine,
  TopicsMetricsMachineType,
  TopicsMetricsMachine,
  TopicsMetricsModel,
  DiskSpaceMachineType,
  DiskSpaceMetricsModel,
  GetTopicsMetricsResponse,
  GetDiskSpaceMetricsResponse,
} from "./machines";
import { timeIntervalsMapping } from "./types";

export const MetricsContext = createContext<{
  topicsMetricsMachineService: InterpreterFrom<TopicsMetricsMachineType>;
  diskSpaceMetricsMachineService: InterpreterFrom<DiskSpaceMachineType>;
}>(null!);

export type MetricsProviderProps = UseTopicsMetricsMachineServiceOptions &
  UseDiskSpaceMetricsMachineServiceOptions;
export const MetricsProvider: FunctionComponent<MetricsProviderProps> = ({
  children,
  getDiskSpaceMetrics,
  getTopicsMetrics,
}) => {
  const topicsMetricsMachineService = useTopicsMetricsMachineService({
    getTopicsMetrics,
  });
  const diskSpaceMetricsMachineService = useDiskSpaceMetricsMachineService({
    getDiskSpaceMetrics,
  });
  return (
    <MetricsContext.Provider
      value={{
        diskSpaceMetricsMachineService,
        topicsMetricsMachineService,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

type GetTopicsMetricsOptions = {
  timeDuration: number;
  timeInterval: number;
  selectedTopic: string | undefined;
};
type UseTopicsMetricsMachineServiceOptions = {
  getTopicsMetrics: (
    options: GetTopicsMetricsOptions
  ) => Promise<GetTopicsMetricsResponse>;
};
function useTopicsMetricsMachineService({
  getTopicsMetrics,
}: UseTopicsMetricsMachineServiceOptions) {
  return useInterpret(
    TopicsMetricsMachine.withConfig({
      services: {
        api: (context) => {
          return (callback) => {
            getTopicsMetrics({
              selectedTopic: context.selectedTopic,
              timeDuration: context.timeDuration,
              timeInterval: timeIntervalsMapping[context.timeDuration],
            })
              .then((results) =>
                callback(TopicsMetricsModel.events.fetchSuccess(results))
              )
              .catch((e) => {
                console.error("Failed fetching data", e);
                callback(TopicsMetricsModel.events.fetchFail());
              });
          };
        },
      },
    }),
    {
      devTools: true,
    }
  );
}

type GetDiskSpaceMetricsOptions = {
  timeDuration: number;
  timeInterval: number;
};
type UseDiskSpaceMetricsMachineServiceOptions = {
  getDiskSpaceMetrics: (
    options: GetDiskSpaceMetricsOptions
  ) => Promise<GetDiskSpaceMetricsResponse>;
};
function useDiskSpaceMetricsMachineService({
  getDiskSpaceMetrics,
}: UseDiskSpaceMetricsMachineServiceOptions) {
  return useInterpret(
    DiskSpaceMetricsMachine.withConfig({
      services: {
        api: (context) => {
          return (callback) => {
            getDiskSpaceMetrics({
              timeDuration: context.timeDuration,
              timeInterval: timeIntervalsMapping[context.timeDuration],
            })
              .then((results) =>
                callback(DiskSpaceMetricsModel.events.fetchSuccess(results))
              )
              .catch((e) => {
                console.error("Failed fetching data", e);
                callback(DiskSpaceMetricsModel.events.fetchFail());
              });
          };
        },
      },
    }),
    {
      devTools: true,
    }
  );
}
