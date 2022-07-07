import { useInterpret, useSelector } from "@xstate/react";
import type { FunctionComponent } from "react";
import { createContext, useCallback, useContext } from "react";
import type { ActorRefFrom } from "xstate";
import {
  type CreateKafkaInstanceMachineContext,
  makeCreateKafkaInstanceMachine,
  SYSTEM_UNAVAILABLE,
} from "./machines/CreateKafkaInstanceMachine";
import type {
  CreateKafkaInstanceError,
  MakeCreateKafkaInstanceMachine,
  Provider,
  Region,
  Size,
} from "./types";

const CreateKafkaInstanceContext = createContext<{
  service: ActorRefFrom<ReturnType<typeof makeCreateKafkaInstanceMachine>>;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
}>(null!);

export const CreateKafkaInstanceProvider: FunctionComponent<
  MakeCreateKafkaInstanceMachine
> = ({
  onCreate,
  getAvailableProvidersAndDefaults,
  getStandardSizes,
  getTrialSizes,
  children,
}) => {
  const service = useInterpret(
    () =>
      makeCreateKafkaInstanceMachine({
        getAvailableProvidersAndDefaults,
        getStandardSizes,
        getTrialSizes,
        onCreate,
      }),
    { devTools: true }
  );
  return (
    <CreateKafkaInstanceContext.Provider value={{ service }}>
      {children}
    </CreateKafkaInstanceContext.Provider>
  );
};

type SelectorReturn = {
  form: CreateKafkaInstanceMachineContext["form"];
  capabilities: CreateKafkaInstanceMachineContext["capabilities"];
  selectedProvider: CreateKafkaInstanceMachineContext["selectedProvider"];
  selectedSize: Size | undefined;
  sizes: CreateKafkaInstanceMachineContext["sizes"];

  isFormEnabled: boolean;

  isNameInvalid: boolean;
  isNameEmpty: boolean;
  isNameError: boolean;
  isNameTaken: boolean;
  isSizeDisabled: boolean;
  isSizeOverQuota: boolean;
  isSizeLoadingError: boolean;
  isSizeAvailable: boolean;
  isSizeError: boolean;

  isProviderError: boolean;
  isRegionError: boolean;

  isTrial: boolean;
  isLoading: boolean;
  isLoadingSizes: boolean;
  isSaving: boolean;
  canCreate: boolean;
  canSave: boolean;
  isSystemUnavailable: boolean;

  error: CreateKafkaInstanceError | "form-invalid" | undefined;

  setName: (name: string) => void;
  setProvider: (name: Provider) => void;
  setRegion: (name: Region) => void;
  create: () => void;
  setSize: (size: Size) => void;
};

export function useCreateKafkaInstanceMachine(): SelectorReturn {
  const { service } = useContext(CreateKafkaInstanceContext);

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

  return useSelector<typeof service, SelectorReturn>(
    service,
    useCallback(
      (state) => {
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

        const error: SelectorReturn["error"] = state.context.creationError
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
      [create, setName, setProvider, setRegion, setSize]
    )
  );
}
