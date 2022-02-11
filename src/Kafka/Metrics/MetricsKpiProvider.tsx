import { useInterpret } from "@xstate/react";
import React, { createContext, FunctionComponent } from "react";
import { InterpreterFrom } from "xstate";
import {
  MetricsKpiMachine,
  MetricsKpiMachineType,
  MetricsKpiModel,
} from "./machines";
import { GetMetricsKpiResponse } from "./types";

export const MetricsKpiContext = createContext<{
  service: InterpreterFrom<MetricsKpiMachineType>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export type MetricsKpiProviderProps = UseMetricsKpiMachineServiceOptions;
export const MetricsKpiProvider: FunctionComponent<MetricsKpiProviderProps> = ({
  children,
  getMetricsKpi,
}) => {
  const service = useMetricsKpiMachineService({
    getMetricsKpi,
  });
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

type UseMetricsKpiMachineServiceOptions = {
  getMetricsKpi: () => Promise<GetMetricsKpiResponse>;
};
function useMetricsKpiMachineService({
  getMetricsKpi,
}: UseMetricsKpiMachineServiceOptions) {
  return useInterpret(
    MetricsKpiMachine.withConfig({
      services: {
        api: () => {
          return (callback) => {
            getMetricsKpi()
              .then((results) =>
                callback(MetricsKpiModel.events.fetchSuccess(results))
              )
              .catch((e) => {
                console.error("Failed fetching data", e);
                callback(MetricsKpiModel.events.fetchFail());
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
