import { useInterpret } from "@xstate/react";
import { createContext, FunctionComponent } from "react";
import { ActorRefFrom } from "xstate";
import { MetricsKpiMachine, MetricsKpiMachineType } from "./machines";
import { GetMetricsKpiResponse } from "./types";

export const MetricsKpiContext = createContext<{
  service: ActorRefFrom<MetricsKpiMachineType>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export type MetricsKpiProviderProps = {
  getMetricsKpi: () => Promise<GetMetricsKpiResponse>;
};
export const MetricsKpiProvider: FunctionComponent<MetricsKpiProviderProps> = ({
  children,
  getMetricsKpi,
}) => {
  const service = useInterpret(
    () =>
      MetricsKpiMachine.withConfig({
        services: {
          api: () => {
            return (callback) => {
              getMetricsKpi()
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
    <MetricsKpiContext.Provider
      value={{
        service,
      }}
    >
      {children}
    </MetricsKpiContext.Provider>
  );
};
