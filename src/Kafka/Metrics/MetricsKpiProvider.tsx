import { useInterpret } from "@xstate/react";
import type { FunctionComponent } from "react";
import { createContext } from "react";
import type { ActorRefFrom } from "xstate";
import type { MetricsKpiMachineType } from "./machines";
import { MetricsKpiMachine } from "./machines";
import type { GetMetricsKpiResponse } from "./types";

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
