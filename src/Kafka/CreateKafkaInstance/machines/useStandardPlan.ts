import { useSelector } from "@xstate/react";
import { useCallback } from "react";
import type {
  CloudProvider,
  CloudProviderInfo,
  CreateKafkaInstanceError,
  MarketPlace,
  Region,
  SelectedSubscription,
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
  selectedBilling: "prepaid" | SelectedSubscription | undefined;
  billingType: "rh-only" | "external-marketplaces";
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
  isBillingSingleSubscription: boolean;
  isBillingSelectionRequired: boolean;
  isBillingPrepaidAvailable: boolean;
  isBillingPrepaidOverQuota: boolean;
  isBillingMarketplaceOverQuota: boolean;
  isBillingSingleMarketplace: SelectedSubscription | false;

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
        const { creationError, capabilities, form, sizes } = state.context;
        const isBlocked = state.hasTag("blocked");
        const isFormInvalid =
          state.hasTag("formInvalid") && state.hasTag("submitted");
        const isNameTaken = creationError === "name-taken";
        const isConfigurable = state.hasTag("configurable");
        const isLoadingSizes = state.hasTag("sizeLoading");
        const isBillingSelectionRequired =
          !state.hasTag("noBilling") && !isBlocked;

        const marketplaces = Array.from(
          new Set(
            capabilities.marketplaceSubscriptions.flatMap<SelectedSubscription>(
              (m) =>
                m.subscriptions.map((s) => ({
                  marketplace: m.marketplace,
                  subscription: s,
                }))
            )
          )
        );
        const isBillingSingleSubscription = state.hasTag("singleSubscription");
        const isBillingSingleMarketplace =
          isBillingSingleSubscription ||
          (marketplaces.length === 1 &&
            capabilities.remainingPrepaidQuota === undefined)
            ? marketplaces[0]
            : false;

        const isBillingPrepaidAvailable =
          capabilities.remainingPrepaidQuota !== undefined;

        const selectedProvider = isBlocked
          ? undefined
          : capabilities.availableProviders.find((p) => p.id === form.provider);

        const selectedSize = isBlocked
          ? undefined
          : sizes?.find((s) => form.size?.id === s.id);

        const billingType = capabilities.marketplaceSubscriptions.some(
          (m) => m.marketplace !== "rhm"
        )
          ? "external-marketplaces"
          : "rh-only";

        const selectedBilling =
          form.billing === "prepaid" ? "prepaid" : form.billing;

        const error: SelectorReturn["error"] = creationError
          ? creationError
          : isFormInvalid
          ? "form-invalid"
          : undefined;

        const remainingQuota =
          form.billing === "prepaid" || form.billing === undefined
            ? capabilities.remainingPrepaidQuota
            : capabilities.remainingMarketplaceQuota;

        const isBillingPrepaidOverQuota: boolean = (() => {
          if (
            capabilities.remainingPrepaidQuota !== undefined &&
            capabilities.remainingPrepaidQuota === 0
          ) {
            return true;
          } else if (
            selectedSize?.quota &&
            capabilities.remainingPrepaidQuota
          ) {
            return selectedSize.quota > capabilities.remainingPrepaidQuota;
          }
          return false;
        })();

        const isBillingMarketplaceOverQuota: boolean = (() => {
          if (
            capabilities.remainingMarketplaceQuota !== undefined &&
            capabilities.remainingMarketplaceQuota === 0
          ) {
            return true;
          } else if (
            selectedSize?.quota &&
            capabilities.remainingMarketplaceQuota
          ) {
            return selectedSize.quota > capabilities.remainingMarketplaceQuota;
          }
          return false;
        })();

        return {
          form: form,
          capabilities,
          selectedProvider,
          selectedSize,
          sizes: sizes,
          billingType,
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
          isBillingSingleSubscription,
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
