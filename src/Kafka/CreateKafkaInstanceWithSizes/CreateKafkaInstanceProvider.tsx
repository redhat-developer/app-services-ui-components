import { useInterpret, useSelector } from "@xstate/react";
import {
  createContext,
  FunctionComponent,
  useCallback,
  useContext,
} from "react";
import { ActorRefFrom } from "xstate";
import {
  makeCreateKafkaInstanceMachine,
  NAME_EMPTY,
  NAME_INVALID,
  NAME_VALID,
  PROVIDER_VALID,
  REGION_VALID,
  SIZE_ERROR,
  SIZE_IDLE,
  SIZE_LOADING,
  SIZE_OVER_QUOTA,
  SYSTEM_UNAVAILABLE,
} from "./CreateKafkaInstanceMachine";
import {
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
> = ({ onCreate, getAvailableProvidersAndDefaults, getSizes, children }) => {
  const service = useInterpret(
    () =>
      makeCreateKafkaInstanceMachine({
        getAvailableProvidersAndDefaults,
        getSizes,
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
  const create = useCallback(() => service.send("create"), [service]);
  const setSize = useCallback(
    (size: Size) => service.send({ type: "sizeChange", size }),
    [service]
  );

  const selector = useCallback(
    (state: typeof service.state) => {
      const isFormInvalid = state.context.creationError === "form-invalid";
      const isNameTaken = state.context.creationError === "name-taken";

      const isLoading = state.matches("loading");
      const isSaving = state.matches("saving");
      const canCreate = state.matches("configuring");
      const isLoadingSizes = state.hasTag(SIZE_LOADING);

      const selectedSize = state.context.sizes?.find(
        (s) => state.context.form.size?.id === s.id
      );

      return {
        form: state.context.form,
        capabilities: state.context.capabilities,
        selectedProvider: state.context.selectedProvider,
        selectedSize,
        sizes: state.context.sizes,

        isFormEnabled: !isLoading && !isSaving && canCreate,

        isNameInvalid: state.hasTag(NAME_INVALID),
        isNameEmpty: state.hasTag(NAME_EMPTY),
        isNameError:
          state.hasTag(NAME_INVALID) ||
          isNameTaken ||
          (!state.hasTag(NAME_VALID) && isFormInvalid),
        isNameTaken,
        isSizeOverQuota: state.hasTag(SIZE_OVER_QUOTA),
        isSizeError: state.hasTag(SIZE_ERROR),
        isSizeAvailable: !state.hasTag(SIZE_IDLE),

        isProviderError: !state.hasTag(PROVIDER_VALID) && isFormInvalid,
        isRegionError: !state.hasTag(REGION_VALID) && isFormInvalid,

        isTrial:
          state.context.capabilities === undefined ||
          state.context.capabilities.plan === "trial",
        isLoading,
        isLoadingSizes,
        isSaving,
        canCreate,
        canSave: state.can("create"),
        isSystemUnavailable: state.hasTag(SYSTEM_UNAVAILABLE),

        error: state.context.creationError,

        setName,
        setProvider,
        setRegion,
        create,
        setSize,
      };
    },
    [create, service, setName, setProvider, setRegion, setSize]
  );

  return useSelector(service, selector);
}
