import { useInterpret } from "@xstate/react";
import { createContext, FunctionComponent } from "react";
import { ActorRefFrom } from "xstate";
import { timeIntervalsMapping } from "./consts";
import {
  KafkaInstanceMetricsMachine,
  KafkaInstanceMetricsMachineType,
} from "./machines";
import { DurationOptions, GetKafkaInstanceMetricsResponse } from "./types";

export const KafkaInstanceMetricsContext = createContext<{
  service: ActorRefFrom<KafkaInstanceMetricsMachineType>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export type KafkaInstanceMetricsProviderProps = {
  getKafkaInstanceMetrics: (options: {
    duration: DurationOptions;
    interval: number;
  }) => Promise<GetKafkaInstanceMetricsResponse>;
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
