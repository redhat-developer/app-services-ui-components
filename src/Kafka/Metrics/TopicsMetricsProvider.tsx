import { useInterpret } from "@xstate/react";
import React, { createContext, FunctionComponent } from "react";
import { InterpreterFrom } from "xstate";
import {
  TopicsMetricsMachine,
  TopicsMetricsMachineType,
  TopicsMetricsModel,
} from "./machines";
import { DurationOptions, GetTopicsMetricsResponse } from "./types";
import { timeIntervalsMapping } from "./consts";

export const TopicsMetricsContext = createContext<{
  service: InterpreterFrom<TopicsMetricsMachineType>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export type TopicsMetricsProviderProps = UseTopicsMetricsMachineServiceOptions;
export const TopicsMetricsProvider: FunctionComponent<
  TopicsMetricsProviderProps
> = ({ children, getTopicsMetrics }) => {
  const service = useTopicsMetricsMachineService({
    getTopicsMetrics,
  });
  return (
    <TopicsMetricsContext.Provider
      value={{
        service,
      }}
    >
      {children}
    </TopicsMetricsContext.Provider>
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
