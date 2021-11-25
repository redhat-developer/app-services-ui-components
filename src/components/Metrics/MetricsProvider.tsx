import { useInterpret } from "@xstate/react";
import React, { createContext, FunctionComponent } from "react";
import { InterpreterFrom } from "xstate";
import {
  KafkaInstanceMetricsMachine,
  TopicsMetricsMachineType,
  TopicsMetricsMachine,
  TopicsMetricsModel,
  KafkaInstanceMetricsMachineType,
  KafkaInstanceMetricsModel,
  GetTopicsMetricsResponse,
  GetKafkaInstanceMetricsResponse,
} from "./machines";
import { DurationOptions } from "./types";
import { timeIntervalsMapping } from "./consts";

export const MetricsContext = createContext<{
  topicsMetricsMachineService: InterpreterFrom<TopicsMetricsMachineType>;
  kafkaInstanceMetricsMachineService: InterpreterFrom<KafkaInstanceMetricsMachineType>;
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
  const kafkaInstanceMetricsMachineService = useKafkaInstanceMetricsMachineService(
    {
      getDiskSpaceMetrics,
    }
  );
  return (
    <MetricsContext.Provider
      value={{
        kafkaInstanceMetricsMachineService,
        topicsMetricsMachineService,
      }}
    >
      {children}
    </MetricsContext.Provider>
  );
};

type GetTopicsMetricsOptions = {
  duration: DurationOptions;
  interval: number;
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
              duration: context.duration,
              interval: timeIntervalsMapping[context.duration].interval,
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
  duration: DurationOptions;
  interval: number;
};
type UseDiskSpaceMetricsMachineServiceOptions = {
  getDiskSpaceMetrics: (
    options: GetDiskSpaceMetricsOptions
  ) => Promise<GetKafkaInstanceMetricsResponse>;
};
function useKafkaInstanceMetricsMachineService({
  getDiskSpaceMetrics,
}: UseDiskSpaceMetricsMachineServiceOptions) {
  return useInterpret(
    KafkaInstanceMetricsMachine.withConfig({
      services: {
        api: (context) => {
          return (callback) => {
            getDiskSpaceMetrics({
              duration: context.duration,
              interval: timeIntervalsMapping[context.duration].interval,
            })
              .then((results) =>
                callback(KafkaInstanceMetricsModel.events.fetchSuccess(results))
              )
              .catch((e) => {
                console.error("Failed fetching data", e);
                callback(KafkaInstanceMetricsModel.events.fetchFail());
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
