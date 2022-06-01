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
  SIZE_DISABLED,
  SIZE_ERROR,
  SIZE_IDLE,
  SIZE_LOADING,
  SIZE_OVER_QUOTA,
  SIZE_VALID,
  SYSTEM_UNAVAILABLE,
} from "./CreateKafkaInstanceMachine";
import type {
  CreateKafkaInstanceError,
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
      const isTrial = state.matches("trialPlan");
      const isFormInvalid = state.hasTag("formInvalid");
      const isNameTaken = state.context.creationError === "name-taken";

      const isLoading = state.matches("loading");
      const isSaving = state.hasTag("formSaving");
      const canCreate = state.hasTag("configurable");
      const isLoadingSizes = state.hasTag(SIZE_LOADING);

      const selectedSize = isTrial
        ? state.context.sizes?.trial
        : state.context.sizes?.standard.find(
            (s) => state.context.form.size?.id === s.id
          );

      const error: CreateKafkaInstanceError | "form-invalid" | undefined = state
        .context.creationError
        ? state.context.creationError
        : state.hasTag("formInvalid")
        ? "form-invalid"
        : undefined;

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
        isSizeDisabled: state.hasTag(SIZE_DISABLED),
        isSizeOverQuota: state.hasTag(SIZE_OVER_QUOTA),
        isSizeLoadingError: state.hasTag(SIZE_ERROR),
        isSizeAvailable: !state.hasTag(SIZE_IDLE),
        isSizeError: !state.hasTag(SIZE_VALID) && isFormInvalid,

        isProviderError: !state.hasTag(PROVIDER_VALID) && isFormInvalid,
        isRegionError: !state.hasTag(REGION_VALID) && isFormInvalid,

        isTrial,
        isLoading,
        isLoadingSizes,
        isSaving,
        canCreate,
        canSave: state.can("create"),
        isSystemUnavailable: state.hasTag(SYSTEM_UNAVAILABLE),

        error,

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
