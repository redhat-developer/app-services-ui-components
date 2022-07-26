import { Flex, FlexItem, Form } from "@patternfly/react-core";
import type { FormEvent, VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type {
  FieldInstanceNameProps,
  FieldSizeProps,
  InstanceInfoProps,
} from "./components";
import {
  FieldAZ,
  FieldBillingTiles,
  FieldCloudProvider,
  FieldCloudRegion,
  FieldInstanceName,
  FieldSize,
  FormAlerts,
  InstanceInfo,
  InstanceInfoSkeleton,
  ModalAlertsStandardPlan,
} from "./components";
import { useStandardPlanMachine } from "./machines";
import type { CloudProvider, MarketPlace } from "./types";

export type StandardInstanceFormProps = {
  formId: string;
  onClickContactUs: () => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
  onClickQuickStart: () => void;
  subscriptionOptionsHref: string;
};

export const StandardInstanceForm: VoidFunctionComponent<
  StandardInstanceFormProps
> = ({
  formId,
  onClickContactUs,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
  onClickQuickStart,
  subscriptionOptionsHref,
}) => {
  const {
    isBillingSingleSubscription,
    isBillingSelectionRequired,
    isBillingPrepaidAvailable,
    isBillingSingleMarketplace,
    capabilities,
    selectedSize,
    billingType,
    error,
    onCreate,
  } = useStandardPlanMachine();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onCreate();
    },
    [onCreate]
  );

  const instanceInfoBilling: InstanceInfoProps["billing"] = (() => {
    if (isBillingSingleSubscription) {
      if (isBillingPrepaidAvailable) {
        return {
          value: "prepaid",
          subscriptionOptionsHref,
          type: billingType,
        };
      } else if (isBillingSingleMarketplace) {
        return {
          value: isBillingSingleMarketplace,
          subscriptionOptionsHref,
          type: billingType,
        };
      }
    }
    return undefined;
  })();

  return (
    <>
      <ModalAlertsStandardPlan
        instanceAvailability={capabilities.instanceAvailability}
        onClickContactUs={onClickContactUs}
      />

      <Flex
        direction={{ default: "column", lg: "row" }}
        alignItems={{ lg: "alignItemsFlexStart" }}
      >
        <FlexItem flex={{ default: "flex_2" }}>
          <FormAlerts error={error} onClickContactUS={onClickContactUs} />
          <Form onSubmit={onSubmit} id={formId}>
            <ConnectedFieldInstanceName />
            <ConnectedFieldCloudProvider />
            <ConnectedFieldCloudRegion />
            <ConnectedFieldAZ />
            <ConnectedFieldSize
              onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
              onLearnMoreAboutSizes={onLearnMoreAboutSizes}
            />
            {isBillingSelectionRequired && (
              <ConnectedBillingTiles
                subscriptionOptionsHref={subscriptionOptionsHref}
              />
            )}
          </Form>
        </FlexItem>
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mas--CreateKafkaInstance__sidebar"
        >
          {selectedSize === undefined ? (
            <InstanceInfoSkeleton
              isTrial={false}
              onClickQuickStart={onClickQuickStart}
            />
          ) : (
            <InstanceInfo
              isTrial={false}
              trialDurationInHours={undefined}
              ingress={selectedSize.ingress}
              egress={selectedSize.egress}
              storage={selectedSize.storage}
              maxPartitions={selectedSize.maxPartitions}
              connections={selectedSize.connections}
              connectionRate={selectedSize.connectionRate}
              messageSize={selectedSize.messageSize}
              onClickQuickStart={onClickQuickStart}
              streamingUnits={selectedSize.displayName}
              billing={instanceInfoBilling}
            />
          )}
        </FlexItem>
      </Flex>
    </>
  );
};

export const ConnectedFieldInstanceName: VoidFunctionComponent = () => {
  const {
    form,
    isNameTaken,
    isNameInvalid,
    isNameEmpty,
    isNameError,
    isFormEnabled,
    setName,
  } = useStandardPlanMachine();

  const validity: FieldInstanceNameProps["validity"] = (() => {
    if (isNameTaken) {
      return "taken";
    } else if (isNameInvalid) {
      return "invalid";
    } else if (isNameEmpty && isNameError) {
      return "required";
    }
    return "valid";
  })();

  return (
    <FieldInstanceName
      value={form.name || ""}
      validity={validity}
      isDisabled={!isFormEnabled}
      onChange={setName}
    />
  );
};

export const ConnectedFieldCloudProvider: VoidFunctionComponent = () => {
  const {
    form,
    capabilities,
    isProviderError,
    isFormEnabled,
    isBillingSingleMarketplace,
    setProvider,
  } = useStandardPlanMachine();

  const providers =
    isBillingSingleMarketplace &&
    isBillingSingleMarketplace.marketplace !== "rh"
      ? capabilities.availableProviders.map((p) => ({
          ...p,
          isDisabled: p.id !== isBillingSingleMarketplace.marketplace,
        }))
      : capabilities.availableProviders;

  return (
    <FieldCloudProvider
      isValid={!isProviderError}
      providers={providers}
      value={form.provider}
      isDisabled={!isFormEnabled}
      onChange={setProvider}
    />
  );
};

export const ConnectedFieldCloudRegion: VoidFunctionComponent = () => {
  const {
    form,
    selectedProvider,
    selectedSize,
    isRegionError,
    isFormEnabled,
    capabilities,
    error,
    setRegion,
  } = useStandardPlanMachine();

  return (
    <FieldCloudRegion
      validity={
        isRegionError
          ? "required"
          : error === "region-unavailable" ||
            capabilities.instanceAvailability === "regions-unavailable"
          ? "region-unavailable"
          : "valid"
      }
      regions={selectedProvider?.regions}
      value={form.region}
      isDisabled={!isFormEnabled}
      isSizeUnavailable={selectedSize?.isDisabled || false}
      onChange={setRegion}
    />
  );
};

export const ConnectedFieldAZ: VoidFunctionComponent = () => {
  const { isFormEnabled } = useStandardPlanMachine();

  return (
    <FieldAZ
      validity={"valid"}
      options={"multi"}
      value={"multi"}
      isDisabled={!isFormEnabled}
      onChange={() => false} // AZ is defined by the backend, we just visualize the value here
    />
  );
};

export const ConnectedFieldSize: VoidFunctionComponent<
  Pick<
    FieldSizeProps,
    "onLearnHowToAddStreamingUnits" | "onLearnMoreAboutSizes"
  >
> = ({ onLearnHowToAddStreamingUnits, onLearnMoreAboutSizes }) => {
  const {
    form,
    sizes,
    isSizeOverQuota,
    isSizeDisabled,
    isSizeError,
    isSizeLoadingError,
    isBillingSelectionRequired,
    isFormEnabled,
    isLoadingSizes,
    isLoading,
    setSize,
    remainingQuota,
  } = useStandardPlanMachine();

  return (
    <FieldSize
      value={form.size?.quota}
      sizes={sizes}
      remainingQuota={isBillingSelectionRequired ? undefined : remainingQuota}
      isDisabled={!isFormEnabled || sizes === undefined}
      isLoading={isLoading || isLoadingSizes}
      isError={isSizeError}
      isLoadingError={isSizeLoadingError}
      validity={
        isSizeOverQuota ? "over-quota" : isSizeDisabled ? "required" : "valid"
      }
      onChange={setSize}
      onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
      onLearnMoreAboutSizes={onLearnMoreAboutSizes}
    />
  );
};

function isMarketplaceDisabled(
  marketplace: MarketPlace,
  selectedProvider: CloudProvider | undefined
) {
  if (marketplace === "rh") {
    return false;
  } else if (selectedProvider) {
    return marketplace !== selectedProvider;
  }
  return false;
}

export const ConnectedBillingTiles: VoidFunctionComponent<{
  subscriptionOptionsHref: string;
}> = ({ subscriptionOptionsHref }) => {
  const {
    form,
    capabilities,
    selectedBilling,
    billingType,
    isBillingPrepaidAvailable,
    isSizeOverQuota,
    isBillingError,
    isBillingPrepaidOverQuota,
    isBillingMarketplaceOverQuota,
    setBillingPrepaid,
    setBillingSubscription,
  } = useStandardPlanMachine();

  return (
    <FieldBillingTiles
      value={selectedBilling}
      hasPrepaid={isBillingPrepaidAvailable}
      subscriptions={capabilities.marketplacesQuota.flatMap((mq) =>
        mq.subscriptions.map((subscription) => ({
          marketplace: mq.marketplace,
          subscription,
          isDisabled: isMarketplaceDisabled(mq.marketplace, form.provider),
        }))
      )}
      isPrepaidOverQuota={isBillingPrepaidOverQuota}
      prepaidQuota={capabilities.remainingPrepaidQuota || 0} // we can default to 0 here just to make TS happy, we will have the info here
      isMarketplaceOverQuota={isBillingMarketplaceOverQuota}
      marketplaceQuota={capabilities.remainingMarketplaceQuota || 0} // we can default to 0 here just to make TS happy, we will have the info here
      onPrepaid={setBillingPrepaid}
      onSubscription={setBillingSubscription}
      isValid={!isSizeOverQuota && !isBillingError}
      billingType={billingType}
      subscriptionOptionsHref={subscriptionOptionsHref}
    />
  );
};
