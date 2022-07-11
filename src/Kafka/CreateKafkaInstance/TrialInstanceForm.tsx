import { Flex, FlexItem, Form } from "@patternfly/react-core";
import type { FormEvent, VoidFunctionComponent } from "react";
import { useCallback } from "react";
import type { FieldSizeProps } from "./components";
import {
  ModalAlertsTrialPlan,
  FormAlerts,
  InstanceInfoSkeleton,
  InstanceInfo,
  FieldInstanceName,
  FieldCloudProvider,
  FieldCloudRegion,
  FieldAZ,
  FieldSize,
} from "./components";
import { useTrialPlanMachine } from "./machines";

export type TrialInstanceFormProps = {
  formId: string;
  onClickContactUs: () => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
  onClickQuickStart: () => void;
  onClickKafkaOverview: () => void;
};

export const TrialInstanceForm: VoidFunctionComponent<
  TrialInstanceFormProps
> = ({
  formId,
  onClickContactUs,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
  onClickQuickStart,
  onClickKafkaOverview,
}) => {
  const { capabilities, error, isLoadingSizes, sizes, onCreate } =
    useTrialPlanMachine();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onCreate();
    },
    [onCreate]
  );

  return (
    <>
      <ModalAlertsTrialPlan
        instanceAvailability={capabilities.instanceAvailability}
        trialDurationInHours={sizes?.trial.trialDurationHours}
        onClickKafkaOverview={onClickKafkaOverview}
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
          </Form>
        </FlexItem>
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mas--CreateKafkaInstance__sidebar"
        >
          {isLoadingSizes || !sizes ? (
            <InstanceInfoSkeleton
              isTrial={false}
              onClickQuickStart={onClickQuickStart}
            />
          ) : (
            <InstanceInfo
              isTrial={false}
              trialDurationInHours={undefined}
              ingress={sizes.trial.ingress}
              egress={sizes.trial.egress}
              storage={sizes.trial.storage}
              maxPartitions={sizes.trial.maxPartitions}
              connections={sizes.trial.connections}
              connectionRate={sizes.trial.connectionRate}
              messageSize={sizes.trial.messageSize}
              onClickQuickStart={onClickQuickStart}
              streamingUnits={sizes.trial.displayName}
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
  } = useTrialPlanMachine();

  return (
    <FieldInstanceName
      value={form.name || ""}
      validity={
        isNameTaken
          ? "taken"
          : isNameInvalid
          ? "invalid"
          : isNameEmpty && isNameError
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
    useTrialPlanMachine();

  return (
    <FieldCloudProvider
      isValid={!isProviderError}
      providers={capabilities.availableProviders || []}
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
    isRegionError,
    isFormEnabled,
    error,
    setRegion,
  } = useTrialPlanMachine();

  return (
    <FieldCloudRegion
      validity={
        isRegionError
          ? "required"
          : error === "region-unavailable"
          ? "region-unavailable"
          : "valid"
      }
      regions={selectedProvider?.regions}
      value={form.region}
      isDisabled={!isFormEnabled}
      isSizeUnavailable={false}
      onChange={setRegion}
    />
  );
};

export const ConnectedFieldAZ: VoidFunctionComponent = () => {
  const { isFormEnabled } = useTrialPlanMachine();

  return (
    <FieldAZ
      validity={"valid"}
      options={"single"}
      value={"single"}
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
  const { sizes, isSizeError, isSizeLoadingError, isLoadingSizes, isLoading } =
    useTrialPlanMachine();

  return (
    <FieldSize
      value={1}
      sizes={sizes?.standard}
      //TODO remainingQuota={capabilities.remainingQuota || 0}
      remainingQuota={0}
      isDisabled={true}
      isLoading={isLoading || isLoadingSizes}
      isError={isSizeError}
      isLoadingError={isSizeLoadingError}
      validity={"trial"}
      onChange={() => false}
      onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
      onLearnMoreAboutSizes={onLearnMoreAboutSizes}
    />
  );
};
