import { Flex, FlexItem, Form } from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import {
  ModalAlertsStandardPlan,
  FormAlerts,
  InstanceInfoSkeleton,
  InstanceInfo,
  FieldInstanceName,
  FieldCloudProvider,
  FieldCloudRegion,
  FieldAZ,
  FieldSizeProps,
  FieldSize,
} from "./components";
import { useCreateKafkaInstanceMachine } from "./CreateKafkaInstanceProvider";
import { StandardPlanInitializationData } from "./types";

export type StandardInstanceFormProps = {} & StandardPlanInitializationData;

export const StandardInstanceForm: VoidFunctionComponent<
  StandardInstanceFormProps
> = ({
  availableProviders,
  defaultProvider,
  instanceAvailability,
  marketplacesQuota,
  remainingPrepaidQuota,
}) => {
  return (
    <>
      <ModalAlertsStandardPlan
        instanceAvailability={instanceAvailability}
        isSystemUnavailable={isSystemUnavailable}
        isLoading={isLoading}
        onClickKafkaOverview={onClickKafkaOverview}
        onClickContactUs={onClickContactUs}
      />

      <Flex
        direction={{ default: "column", lg: "row" }}
        alignItems={{ lg: "alignItemsFlexStart" }}
      >
        <FlexItem flex={{ default: "flex_2" }}>
          <FormAlerts
            error={error}
            onClickContactUS={onClickContactUs}
            maxStreamingUnits={maxStreamingUnits}
            streamingUnits={remainingQuota}
          />
          <Form onSubmit={onSubmit} id={FORM_ID}>
            <ConnectedFieldInstanceName />
            <ConnectedFieldCloudProvider />
            <ConnectedFieldCloudRegion />
            <ConnectedFieldAZ />
            <ConnectedFieldSize
              onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
              onLearnMoreAboutSizes={onLearnMoreAboutSizes}
            />
          </Form>
        </FlexItem>
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mas--CreateKafkaInstance__sidebar"
        >
          {isLoadingSizes || selectedSize === undefined ? (
            <InstanceInfoSkeleton
              isTrial={false}
              onClickQuickStart={onClickQuickStart}
            />
          ) : (
            <InstanceInfo
              isTrial={false}
              ingress={selectedSize.ingress}
              egress={selectedSize.egress}
              storage={selectedSize.storage}
              maxPartitions={selectedSize.maxPartitions}
              connections={selectedSize.connections}
              connectionRate={selectedSize.connectionRate}
              messageSize={selectedSize.messageSize}
              onClickQuickStart={onClickQuickStart}
              streamingUnits={selectedSize.displayName}
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
    isFormEnabled,
    setName,
  } = useCreateKafkaInstanceMachine();

  return (
    <FieldInstanceName
      value={form.name || ""}
      validity={
        isNameTaken
          ? "taken"
          : isNameInvalid
          ? "invalid"
          : isNameEmpty
          ? "required"
          : "valid"
      }
      isDisabled={!isFormEnabled}
      onChange={setName}
    />
  );
};

export const ConnectedFieldCloudProvider: VoidFunctionComponent = () => {
  const { form, capabilities, isProviderError, isFormEnabled, setProvider } =
    useCreateKafkaInstanceMachine();

  return (
    <FieldCloudProvider
      isValid={!isProviderError}
      providers={availableProviders || []}
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
  } = useCreateKafkaInstanceMachine();

  return (
    <FieldCloudRegion
      validity={
        isRegionError
          ? "required"
          : error === "region-unavailable" ||
            instanceAvailability === "regions-unavailable"
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
  const { isFormEnabled } = useCreateKafkaInstanceMachine();

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
    capabilities,
    sizes,
    isSizeAvailable,
    isSizeOverQuota,
    isSizeDisabled,
    isSizeError,
    isSizeLoadingError,
    isFormEnabled,
    isLoadingSizes,
    isLoading,
    isTrial,
    setSize,
  } = useCreateKafkaInstanceMachine();

  return (
    <FieldSize
      value={form.size?.quota || 1}
      sizes={isSizeAvailable ? sizes?.standard : undefined}
      remainingQuota={remainingQuota || 0}
      isDisabled={!isFormEnabled || sizes === undefined}
      isLoading={isLoading || isLoadingSizes}
      isError={isSizeError}
      isLoadingError={isSizeLoadingError}
      validity={
        isTrial
          ? "trial"
          : isSizeOverQuota
          ? "over-quota"
          : isSizeDisabled
          ? "required"
          : "valid"
      }
      onChange={setSize}
      onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
      onLearnMoreAboutSizes={onLearnMoreAboutSizes}
    />
  );
};
