import {
  Alert,
  Button,
  Flex,
  FlexItem,
  Form,
  Modal,
  ModalVariant,
} from "@patternfly/react-core";
import { OutlinedClockIcon } from "@patternfly/react-icons";
import {
  FormEvent,
  FunctionComponent,
  useCallback,
  VoidFunctionComponent,
} from "react";
import { useTranslation } from "react-i18next";
import {
  FieldAZ,
  FieldCloudProvider,
  FieldCloudRegion,
  FieldInstanceName,
  FieldSize,
  FieldSizeProps,
  FormAlerts,
  InstanceInfo,
  InstanceInfoSkeleton,
  ModalAlerts,
} from "./components";

import {
  CreateKafkaInstanceProvider,
  useCreateKafkaInstanceMachine,
} from "./CreateKafkaInstanceProvider";

import "./CreateKafkaInstanceWithSizes.css";
import { MakeCreateKafkaInstanceMachine } from "./types";

export type CreateKafkaInstancePropsWithSizes =
  ConnectedCreateKafkaInstanceWithSizesProps & MakeCreateKafkaInstanceMachine;
export const CreateKafkaInstanceWithSizes: FunctionComponent<
  CreateKafkaInstancePropsWithSizes
> = ({ getAvailableProvidersAndDefaults, getSizes, onCreate, ...props }) =>
  props.isModalOpen ? (
    <CreateKafkaInstanceProvider
      getAvailableProvidersAndDefaults={getAvailableProvidersAndDefaults}
      getSizes={getSizes}
      onCreate={onCreate}
    >
      <ConnectedCreateKafkaInstanceWithSizes {...props} />
    </CreateKafkaInstanceProvider>
  ) : null;

export type ConnectedCreateKafkaInstanceWithSizesProps = {
  /**
   *
   * Flag to show the modal
   */
  isModalOpen: boolean;

  /**
   * Set this to `true` on Storybook when there are multiple modals open at a time.
   */
  disableFocusTrap?: boolean;
  /**
   * The parent container to append the modal to. Defaults to document.body
   */
  appendTo?: () => HTMLElement;

  /**
   * A callback for when the cancel or close button are clicked.
   */
  onCancel: () => void;
  onClickQuickStart: () => void;
  onClickKafkaOverview: () => void;
  onClickContactUs: () => void;
  onClickLearnMoreAboutRegions: () => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
};
export const ConnectedCreateKafkaInstanceWithSizes: VoidFunctionComponent<
  ConnectedCreateKafkaInstanceWithSizesProps
> = ({
  isModalOpen,
  appendTo,
  onClickQuickStart,
  onCancel,
  disableFocusTrap,
  onClickKafkaOverview,
  onClickContactUs,
  //onClickLearnMoreAboutRegions,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
}) => {
  const FORM_ID = "create_instance_-form";
  const { t } = useTranslation("create-kafka-instance-with-sizes");

  const {
    isTrial,
    isLoading,
    isLoadingSizes,
    isSaving,
    canSave,
    isSystemUnavailable,
    error,
    create,

    capabilities,
    selectedSize,
  } = useCreateKafkaInstanceMachine();

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      create();
    },
    [create]
  );

  return (
    <Modal
      id="modalCreateKafka"
      variant={ModalVariant.medium}
      title={t("create_instance_title")}
      disableFocusTrap={disableFocusTrap}
      isOpen={isModalOpen}
      ouiaId="modal-create-kafka"
      onClose={onCancel}
      appendTo={appendTo}
      position="top"
      actions={[
        <Button
          key="submit"
          variant="primary"
          type="submit"
          form={FORM_ID}
          isDisabled={!canSave}
          spinnerAriaValueText={t("common:submitting_request")}
          isLoading={isSaving}
          data-testid="modalCreateKafka-buttonSubmit"
          ouiaId="button-create"
        >
          {t("create_instance")}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          onClick={onCancel}
          data-testid="modalCreateKafka-buttonCancel"
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <ModalAlerts
        plan={capabilities?.plan}
        instanceAvailability={capabilities?.instanceAvailability}
        isSystemUnavailable={isSystemUnavailable}
        isLoading={isLoading}
        onClickKafkaOverview={onClickKafkaOverview}
        maxStreamingUnits={capabilities?.maxStreamingUnits}
        onClickContactUs={onClickContactUs}
        trialDurationInHours={selectedSize?.trialDurationHours}
      />

      <Flex
        direction={{ default: "column", lg: "row" }}
        alignItems={{ lg: "alignItemsFlexStart" }}
      >
        <FlexItem flex={{ default: "flex_2" }}>
          <FormAlerts
            error={error}
            onClickContactUS={onClickContactUs}
            maxStreamingUnits={capabilities?.maxStreamingUnits}
            streamingUnits={capabilities?.remainingQuota}
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
          className="mas--CreateKafkaInstanceWithSizes__sidebar"
        >
          {isLoadingSizes || selectedSize === undefined ? (
            <InstanceInfoSkeleton
              isTrial={isTrial}
              onClickQuickStart={onClickQuickStart}
            />
          ) : (
            <InstanceInfo
              isTrial={isTrial}
              trialDurationInHours={selectedSize.trialDurationHours}
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
      <Alert
        className="mas--CreateKafkaInstanceWithSizes__creationTimeAlert"
        customIcon={<OutlinedClockIcon />}
        variant="info"
        isInline
        isPlain
        title={t("instance_creation_time_alert")}
      />
    </Modal>
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
      providers={capabilities?.availableProviders || []}
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
            capabilities?.instanceAvailability === "regions-unavailable"
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
  const { isTrial, isFormEnabled } = useCreateKafkaInstanceMachine();

  return (
    <FieldAZ
      validity={"valid"}
      options={isTrial ? "single" : "multi"}
      value={isTrial ? "single" : "multi"}
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
      remainingQuota={capabilities?.remainingQuota || 0}
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
