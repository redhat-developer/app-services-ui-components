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
} from "./machines";
import {
  DurationOptions,
  GetKafkaInstanceMetricsResponse,
  GetTopicsMetricsResponse,
} from "./types";
import { timeIntervalsMapping } from "./consts";

export const MetricsContext = createContext<{
  topicsMetricsMachineService: InterpreterFrom<TopicsMetricsMachineType>;
  kafkaInstanceMetricsMachineService: InterpreterFrom<KafkaInstanceMetricsMachineType>;
}>(null!);

export type MetricsProviderProps = UseTopicsMetricsMachineServiceOptions &
  UseKafkaInstanceMetricsMachineServiceOptions;
export const MetricsProvider: FunctionComponent<MetricsProviderProps> = ({
  children,
  getKafkaInstanceMetrics: getDiskSpaceMetrics,
  getTopicsMetrics,
}) => {
  const topicsMetricsMachineService = useTopicsMetricsMachineService({
    getTopicsMetrics,
  });
  const kafkaInstanceMetricsMachineService = useKafkaInstanceMetricsMachineService(
    {
      getKafkaInstanceMetrics: getDiskSpaceMetrics,
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

type UseTopicsMetricsMachineServiceOptions = {
  getTopicsMetrics: (options: {
    duration: DurationOptions;
    interval: number;
    selectedTopic: string | undefined;
  }) => Promise<GetTopicsMetricsResponse>;
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

type UseKafkaInstanceMetricsMachineServiceOptions = {
  getKafkaInstanceMetrics: (options: {
    duration: DurationOptions;
    interval: number;
  }) => Promise<GetKafkaInstanceMetricsResponse>;
};
function useKafkaInstanceMetricsMachineService({
  getKafkaInstanceMetrics,
}: UseKafkaInstanceMetricsMachineServiceOptions) {
  return useInterpret(
    KafkaInstanceMetricsMachine.withConfig({
      services: {
        api: (context) => {
          return (callback) => {
            getKafkaInstanceMetrics({
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
