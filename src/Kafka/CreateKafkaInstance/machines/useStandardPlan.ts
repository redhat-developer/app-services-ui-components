import { useSelector } from "@xstate/react";
import { useCallback } from "react";
import type {
  CloudProvider,
  CloudProviderInfo,
  CreateKafkaInstanceError,
  MarketPlace,
  Region,
  Size,
} from "../types";
import type { StandardPlanMachineContext } from "./StandardPlanMachine";
import { useCreateKafkaInstance } from "./useCreateKafkaInstance";

type SelectorReturn = {
  form: StandardPlanMachineContext["form"];
  capabilities: StandardPlanMachineContext["capabilities"];
  selectedProvider: CloudProviderInfo | undefined;
  selectedSize: Size | undefined;
  sizes: StandardPlanMachineContext["sizes"];
  selectedBilling: "prepaid" | string | undefined;
  remainingQuota: number | undefined;

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
  isBillingError: boolean;
  isBillingSelectionRequired: boolean;
  isBillingPrepaidAvailable: boolean;
  isBillingPrepaidOverQuota: boolean;
  isBillingMarketplaceOverQuota: boolean;
  isBillingSingleMarketplace: MarketPlace | false;

  isProviderError: boolean;
  isRegionError: boolean;

  isLoading: boolean;
  isLoadingSizes: boolean;
  isSaving: boolean;

  error: CreateKafkaInstanceError | "form-invalid" | undefined;

  setName: (name: string) => void;
  setProvider: (name: CloudProvider) => void;
  setRegion: (name: Region) => void;
  onCreate: () => void;
  setSize: (size: Size) => void;
  setBillingSubscription: (
    marketplace: MarketPlace,
    subscription: string
  ) => void;
  setBillingPrepaid: () => void;
};

export function useStandardPlanMachine(): SelectorReturn {
  const {
    standardPlanMachine: service,
    isLoading,
    isSaving,
  } = useCreateKafkaInstance();

  if (!service) {
    throw new Error(
      "useStandardPlanMachine should be called only when the parent CreateKafkaInstanceMachine is in the right state"
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

  const setBillingSubscription = useCallback(
    (marketplace: MarketPlace, subscription: string) =>
      service.send({
        type: "selectSubscription",
        subscription: { marketplace, subscription },
      }),
    [service]
  );

  const setBillingPrepaid = useCallback(
    () =>
      service.send({
        type: "selectPrepaid",
      }),
    [service]
  );

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
        const isBillingSelectionRequired =
          !state.hasTag("noBilling") && !isBlocked;

        const marketplaces = Array.from(
          new Set(
            state.context.capabilities.marketplacesQuota.map(
              (m) => m.marketplace
            )
          )
        );
        const isBillingSingleMarketplace = state.hasTag("singleSubscription")
          ? state.context.capabilities.marketplacesQuota[0].marketplace
          : marketplaces.length === 1
          ? marketplaces[0]
          : false;

        const isBillingPrepaidAvailable =
          state.context.capabilities.remainingPrepaidQuota !== undefined;

        const selectedProvider = isBlocked
          ? undefined
          : state.context.capabilities.availableProviders.find(
              (p) => p.id === state.context.form.provider
            );

        const selectedSize = isBlocked
          ? undefined
          : state.context.sizes?.find(
              (s) => state.context.form.size?.id === s.id
            );

        const selectedBilling =
          state.context.form.billing === "prepaid"
            ? "prepaid"
            : state.context.form.billing?.subscription;

        const error: SelectorReturn["error"] = state.context.creationError
          ? state.context.creationError
          : isFormInvalid
          ? "form-invalid"
          : undefined;

        const remainingQuota =
          state.context.form.billing === "prepaid"
            ? state.context.capabilities.remainingPrepaidQuota
            : state.context.capabilities.remainingMarketplaceQuota;

        const isBillingPrepaidOverQuota =
          selectedSize?.quota &&
          state.context.capabilities.remainingPrepaidQuota
            ? selectedSize.quota >
              state.context.capabilities.remainingPrepaidQuota
            : false;

        const isBillingMarketplaceOverQuota =
          selectedSize?.quota &&
          state.context.capabilities.remainingMarketplaceQuota
            ? selectedSize.quota >
              state.context.capabilities.remainingMarketplaceQuota
            : false;

        return {
          form: state.context.form,
          capabilities: state.context.capabilities,
          selectedProvider,
          selectedSize,
          sizes: state.context.sizes,
          selectedBilling,
          remainingQuota,

          isFormEnabled: !isLoading && !isSaving && !isBlocked,
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
          isBillingError: !state.hasTag("billingValid") && isFormInvalid,
          isBillingSelectionRequired,
          isBillingPrepaidAvailable,
          isBillingPrepaidOverQuota,
          isBillingMarketplaceOverQuota,
          isBillingSingleMarketplace,
          isLoading,
          isLoadingSizes,
          isConfigurable,
          isSaving,

          error,

          setName,
          setProvider,
          setRegion,
          onCreate,
          setSize,
          setBillingSubscription,
          setBillingPrepaid,
        };
      },
      [
        isLoading,
        isSaving,
        onCreate,
        setBillingPrepaid,
        setBillingSubscription,
        setName,
        setProvider,
        setRegion,
        setSize,
      ]
    )
  );
}
