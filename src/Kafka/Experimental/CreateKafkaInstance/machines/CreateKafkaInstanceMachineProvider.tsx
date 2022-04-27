import { useInterpret, useSelector } from "@xstate/react";
import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
} from "react";
import { ActorRefFrom } from "xstate";
import {
  AZ_VALID,
  makeCreateKafkaInstanceMachine,
  NAME_EMPTY,
  NAME_INVALID,
  NAME_VALID,
  PROVIDER_VALID,
  REGION_VALID,
  SIZE_INVALID,
  SIZE_VALID,
  SYSTEM_UNAVAILABLE,
} from "./CreateKafkaInstanceMachine";
import {
  AZ,
  MakeCreateKafkaInstanceMachine,
  Provider,
  Region,
  Size,
} from "./types";

const CreateKafkaInstanceMachineContext = createContext<{
  service: ActorRefFrom<ReturnType<typeof makeCreateKafkaInstanceMachine>>;
}>(null!);

export const CreateKafkaInstanceProvider: FunctionComponent<
  MakeCreateKafkaInstanceMachine
> = ({ onCreate, getAvailableProvidersAndDefaults, children }) => {
  const service = useInterpret(
    () =>
      makeCreateKafkaInstanceMachine({
        getAvailableProvidersAndDefaults,
        onCreate,
      }),
    { devTools: true }
  );
  return (
    <CreateKafkaInstanceMachineContext.Provider value={{ service }}>
      {children}
    </CreateKafkaInstanceMachineContext.Provider>
  );
};

export function useCreateKafkaInstanceMachine() {
  const { service } = useContext(CreateKafkaInstanceMachineContext);

  const setName = useCallback(
    (name: string) => service.send({ type: "nameChange", name }),
    [service]
  );
  const setProvider = useCallback(
    (provider: Provider) => service.send({ type: "providerChange", provider }),
    [service]
  );
  const setRegion = useCallback(
    (region: Region) => service.send({ type: "regionChange", region }),
    [service]
  );
  const setAZ = useCallback(
    (az: AZ) => service.send({ type: "azChange", az }),
    [service]
  );
  const create = useCallback(() => service.send("create"), [service]);
  const setSize = useCallback(
    (size: Size) => service.send({ type: "sizeChange", size }),
    [service]
  );

  const selector = useCallback(
    (state: typeof service.state) => {
      const selectedProviderInfo = state.context.availableProviders.find(
        (p) => p.id === state.context.provider
      );

      const isFormInvalid = state.context.creationError === "form-invalid";
      const isNameTaken = state.context.creationError === "name-taken";

      const {
        size,
        name,
        provider,
        region,
        az,
        availableProviders,
        instanceAvailability,
      } = state.context;

      const isLoading = state.matches("loading");
      const isSaving = state.matches("saving");
      const canCreate = state.matches("configuring");

      return {
        name,
        provider,
        region,
        az,
        size,
        usedStreamingUnits: 3,
        maxStreamingUnits: 5,
        remainingStreamingUnits: 2,

        azOptions: selectedProviderInfo?.AZ,
        regions: selectedProviderInfo?.regions,

        availableProviders,
        instanceAvailability,

        isFormEnabled: !isLoading && !isSaving && canCreate,

        isNameInvalid: state.hasTag(NAME_INVALID),
        isNameEmpty: state.hasTag(NAME_EMPTY),
        isNameError:
          state.hasTag(NAME_INVALID) ||
          isNameTaken ||
          (!state.hasTag(NAME_VALID) && isFormInvalid),
        isNameTaken,
        isSizeInvalid: state.hasTag(SIZE_INVALID),
        isSizeError:
          state.hasTag(SIZE_INVALID) ||
          (!state.hasTag(SIZE_VALID) && isFormInvalid),

        isProviderError: !state.hasTag(PROVIDER_VALID) && isFormInvalid,
        isRegionError: !state.hasTag(REGION_VALID) && isFormInvalid,
        isAzError: !state.hasTag(AZ_VALID) && isFormInvalid,

        isTrial:
          state.context.instanceAvailability === undefined ||
          ["trial", "trial-used", "trial-unavailable"].includes(
            state.context.instanceAvailability
          ),
        isLoading,
        isSaving,
        canCreate,
        canSave: state.can("create"),
        isSystemUnavailable: state.hasTag(SYSTEM_UNAVAILABLE),

        error: state.context.creationError,

        setName,
        setProvider,
        setRegion,
        setAZ,
        create,
        setSize,
      };
    },
    [create, service, setAZ, setName, setProvider, setRegion, setSize]
  );

  return useSelector(service, selector);
}
