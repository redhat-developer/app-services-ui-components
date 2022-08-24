import { useSelector } from "@xstate/react";
import { useCallback } from "react";
import type { CloudProvider, CloudRegion } from "../../types";
import type { CloudProviderInfo, CreateKafkaInstanceError } from "../types";
import type { TrialPlanMachineContext } from "./TrialPlanMachine";
import { useCreateKafkaInstance } from "./useCreateKafkaInstance";

type SelectorReturn = {
  form: TrialPlanMachineContext["form"];
  capabilities: TrialPlanMachineContext["capabilities"];
  selectedProvider: CloudProviderInfo | undefined;
  sizes: TrialPlanMachineContext["sizes"];

  isFormEnabled: boolean;

  isNameInvalid: boolean;
  isNameEmpty: boolean;
  isNameError: boolean;
  isNameTaken: boolean;
  isSizeLoadingError: boolean;
  isSizeAvailable: boolean;
  isSizeError: boolean;

  isProviderError: boolean;
  isRegionError: boolean;

  isLoading: boolean;
  isLoadingSizes: boolean;
  isSaving: boolean;

  error: CreateKafkaInstanceError | "form-invalid" | undefined;

  setName: (name: string) => void;
  setProvider: (name: CloudProvider) => void;
  setRegion: (name: CloudRegion) => void;
  onCreate: () => void;
};

export function useTrialPlanMachine(): SelectorReturn {
  const {
    trialPlanMachine: service,
    isLoading,
    isSaving,
  } = useCreateKafkaInstance();

  if (!service) {
    throw new Error(
      "useTrialPlanMachine should be called only when the parent CreateKafkaInstanceMachine is in the right state"
    );
  }

  const setName = useCallback(
    (name: string) => service.send({ type: "nameChange", name }),
    [service]
  );
  const setProvider = useCallback(
    (provider: CloudProvider) =>
      service.send({ type: "providerChange", provider }),
    [service]
  );
  const setRegion = useCallback(
    (region: CloudRegion) => service.send({ type: "regionChange", region }),
    [service]
  );
  const onCreate = useCallback(() => service.send("create"), [service]);

  return useSelector<typeof service, SelectorReturn>(
    service,
    useCallback(
      (state) => {
        const isBlocked = state.hasTag("blocked");
        const isFormInvalid =
          state.hasTag("formInvalid") && state.hasTag("submitted");
        const isNameTaken = state.context.creationError === "name-taken";
        const isConfigurable = state.hasTag("configurable");
        const isLoadingSizes = state.hasTag("sizeLoading");

        const selectedProvider = isBlocked
          ? undefined
          : state.context.capabilities.availableProviders.find(
              (p) => p.id === state.context.form.provider
            );

        const error: SelectorReturn["error"] = state.context.creationError
          ? state.context.creationError
          : isFormInvalid
          ? "form-invalid"
          : undefined;

        return {
          form: state.context.form,
          capabilities: state.context.capabilities,
          selectedProvider,
          sizes: state.context.sizes,

          isFormEnabled: !isLoading && !isSaving && !isBlocked,

          isNameInvalid: state.hasTag("nameInvalid"),
          isNameEmpty: state.hasTag("nameEmpty"),
          isNameError:
            state.hasTag("nameInvalid") ||
            isNameTaken ||
            (!state.hasTag("nameValid") && isFormInvalid),
          isNameTaken,
          isSizeLoadingError: state.hasTag("sizeError"),
          isSizeAvailable: !state.hasTag("sizeIdle"),
          isSizeError: !state.hasTag("sizeValid") && isFormInvalid,

          isProviderError: !state.hasTag("providerValid") && isFormInvalid,
          isRegionError: !state.hasTag("regionValid") && isFormInvalid,

          isLoading,
          isLoadingSizes,
          isConfigurable,
          isSaving,

          error,

          setName,
          setProvider,
          setRegion,
          onCreate,
        };
      },
      [isLoading, isSaving, onCreate, setName, setProvider, setRegion]
    )
  );
}
