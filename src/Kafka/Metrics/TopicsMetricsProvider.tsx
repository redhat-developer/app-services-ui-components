import { useInterpret } from "@xstate/react";
import { createContext, FunctionComponent } from "react";
import { timeIntervalsMapping } from "./consts";
import { TopicsMetricsMachine } from "./machines";
import { DurationOptions, GetTopicsMetricsResponse } from "./types";

export const TopicsMetricsContext = createContext<{
  service: ReturnType<typeof useInterpret>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export type TopicsMetricsProviderProps = {
  getTopicsMetrics: (options: {
    duration: DurationOptions;
    interval: number;
    selectedTopic: string | undefined;
  }) => Promise<GetTopicsMetricsResponse>;
};
export const TopicsMetricsProvider: FunctionComponent<
  TopicsMetricsProviderProps
> = ({ children, getTopicsMetrics }) => {
  const service = useInterpret(
    () =>
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
                  callback({ type: "fetchSuccess", ...results })
                )
                .catch((e) => {
                  console.error("Failed fetching data", e);
                  callback("fetchFail");
                });
            };
          },
        },
      }),
    {
      devTools: true,
    }
  );
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
