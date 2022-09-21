import { useInterpret } from "@xstate/react";
import type { FunctionComponent } from "react";
import { createContext } from "react";
import type { ActorRefFrom } from "xstate";
import { timeIntervalsMapping } from "./consts";
import type { KafkaInstanceMetricsMachineType } from "./machines";
import { KafkaInstanceMetricsMachine } from "./machines";
import type { DurationOptions, GetKafkaInstanceMetricsResponse } from "./types";

export const KafkaInstanceMetricsContext = createContext<{
  service: ActorRefFrom<KafkaInstanceMetricsMachineType>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export type KafkaInstanceMetricsProviderProps = {
  getKafkaInstanceMetrics: (options: {
    duration: DurationOptions;
    interval: number;
  }) => Promise<GetKafkaInstanceMetricsResponse>;
  children: React.ReactNode;
};
export const KafkaInstanceMetricsProvider: FunctionComponent<
  KafkaInstanceMetricsProviderProps
> = ({ children, getKafkaInstanceMetrics }) => {
  const service = useInterpret(
    () =>
      KafkaInstanceMetricsMachine.withConfig({
        services: {
          api: (context) => {
            return (callback) => {
              getKafkaInstanceMetrics({
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
    <KafkaInstanceMetricsContext.Provider
      value={{
        service,
      }}
    >
      {children}
    </KafkaInstanceMetricsContext.Provider>
  );
};
