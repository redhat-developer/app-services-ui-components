import { useInterpret } from "@xstate/react";
import React, { createContext, FunctionComponent } from "react";
import { InterpreterFrom } from "xstate";
import {
  KafkaInstanceMetricsMachine,
  KafkaInstanceMetricsMachineType,
  KafkaInstanceMetricsModel,
} from "./machines";
import { DurationOptions, GetKafkaInstanceMetricsResponse } from "./types";
import { timeIntervalsMapping } from "./consts";

export const KafkaInstanceMetricsContext = createContext<{
  service: InterpreterFrom<KafkaInstanceMetricsMachineType>;
}>(null!);

export type KafkaInstanceMetricsProviderProps =
  UseKafkaInstanceMetricsMachineServiceOptions;
export const KafkaInstanceMetricsProvider: FunctionComponent<
  KafkaInstanceMetricsProviderProps
> = ({ children, getKafkaInstanceMetrics }) => {
  const service = useKafkaInstanceMetricsMachineService({
    getKafkaInstanceMetrics,
  });
  return (
    <KafkaInstanceMetricsContext.Provider
      value={{
        service,
      }}
    >
      {children}
    </KafkaInstanceMetricsContext.Provider>
  );
};

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
