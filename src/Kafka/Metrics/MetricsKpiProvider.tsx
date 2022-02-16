import { useInterpret } from "@xstate/react";
import { createContext, FunctionComponent } from "react";
import { MetricsKpiMachine } from "./machines";
import { GetMetricsKpiResponse } from "./types";

export const MetricsKpiContext = createContext<{
  service: ReturnType<typeof useInterpret>;
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
