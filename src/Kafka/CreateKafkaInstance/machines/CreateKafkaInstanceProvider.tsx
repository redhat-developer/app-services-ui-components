import { useInterpret } from "@xstate/react";
import type { FunctionComponent } from "react";
import { createContext } from "react";
import type { ActorRefFrom } from "xstate";
import { makeCreateKafkaInstanceMachine } from "./CreateKafkaInstanceMachine";
import type { CreateKafkaInstanceServices } from "./CreateKafkaInstanceMachine";

export const CreateKafkaInstanceContext = createContext<{
  service: ActorRefFrom<ReturnType<typeof makeCreateKafkaInstanceMachine>>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export const CreateKafkaInstanceProvider: FunctionComponent<
  CreateKafkaInstanceServices
> = ({
  onCreate,
  checkStandardQuota,
  checkDeveloperAvailability,
  fetchProvidersWithRegions,
  getStandardSizes,
  getTrialSizes,
  children,
}) => {
  const service = useInterpret(
    () =>
      makeCreateKafkaInstanceMachine({
        checkStandardQuota,
        checkDeveloperAvailability,
        fetchProvidersWithRegions,
        getStandardSizes,
        getTrialSizes,
        onCreate,
      }),
    { devTools: true }
  );
  service.onTransition((state) => console.log(state.value));
  return (
    <CreateKafkaInstanceContext.Provider value={{ service }}>
      {children}
    </CreateKafkaInstanceContext.Provider>
  );
};
