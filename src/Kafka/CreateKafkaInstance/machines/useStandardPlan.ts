import { useSelector } from "@xstate/react";
import { useCallback } from "react";
import {
  CloudProvider,
  CreateKafkaInstanceError,
  Region,
  Size,
} from "../types";
import { StandardPlanMachineContext } from "./StandardPlanMachine";
import { useCreateKafkaInstance } from "./useCreateKafkaInstance";

type SelectorReturn = {
  form: StandardPlanMachineContext["form"];
  capabilities: StandardPlanMachineContext["capabilities"];
  selectedProvider: StandardPlanMachineContext["selectedProvider"];
  selectedSize: Size | undefined;
  sizes: StandardPlanMachineContext["sizes"];

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

  isLoading: boolean;
  isLoadingSizes: boolean;
  isSaving: boolean;
  isCreatable: boolean;

  error: CreateKafkaInstanceError | "form-invalid" | undefined;

  setName: (name: string) => void;
  setProvider: (name: CloudProvider) => void;
  setRegion: (name: Region) => void;
  onCreate: () => void;
  setSize: (size: Size) => void;
};

export function useStandardPlanMachine(): SelectorReturn {
  const {
    standardPlanMachine: service,
    isLoading,
    isSaving,
  } = useCreateKafkaInstance();

  if (!service) {
    throw new Error(
      `useStandardPlanMachine should be called only when the parent CreateKafkaInstanceMachine is in the right state, got service ${service}`
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
    (region: Region) => service.send({ type: "regionChange", region }),
    [service]
  );
  const onCreate = useCallback(() => service.send("create"), [service]);
  const setSize = useCallback(
    (size: Size) => service.send({ type: "sizeChange", size }),
    [service]
  );

  return useSelector<typeof service, SelectorReturn>(
    service,
    useCallback(
      (state) => {
        const isFormInvalid =
          state.hasTag("formInvalid") && state.hasTag("submitted");
        const isNameTaken = state.context.creationError === "name-taken";
        const isConfigurable = state.hasTag("configurable");
        const isCreatable = state.hasTag("creatable");
        const isLoadingSizes = state.hasTag("sizeLoading");

        const selectedSize = state.context.sizes?.find(
          (s) => state.context.form.size?.id === s.id
        );

        const error: SelectorReturn["error"] = state.context.creationError
          ? state.context.creationError
          : isFormInvalid
          ? "form-invalid"
          : undefined;

        return {
          form: state.context.form,
          capabilities: state.context.capabilities,
          selectedProvider: state.context.selectedProvider,
          selectedSize,
          sizes: state.context.sizes,

          isFormEnabled: !isLoading && !isSaving,

          isNameInvalid: state.hasTag("nameInvalid"),
          isNameEmpty: state.hasTag("nameEmpty"),
          isNameError:
            state.hasTag("nameInvalid") ||
            isNameTaken ||
            (!state.hasTag("nameValid") && isFormInvalid),
          isNameTaken,
          isSizeDisabled: state.hasTag("sizeDisabled"),
          isSizeOverQuota: state.hasTag("sizeOverQuota"),
          isSizeLoadingError: state.hasTag("sizeError"),
          isSizeAvailable: !state.hasTag("sizeIdle"),
          isSizeError: !state.hasTag("sizeValid") && isFormInvalid,

          isProviderError: !state.hasTag("providerValid") && isFormInvalid,
          isRegionError: !state.hasTag("regionValid") && isFormInvalid,

          isLoading,
          isLoadingSizes,
          isConfigurable,
          isCreatable,
          isSaving,

          error,

          setName,
          setProvider,
          setRegion,
          onCreate,
          setSize,
        };
      },
      [onCreate, setName, setProvider, setRegion, setSize]
    )
  );
}
