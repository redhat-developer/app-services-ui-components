import {
  Alert,
  Button,
  Flex,
  FlexItem,
  Form,
  Modal,
  ModalVariant,
} from "@patternfly/react-core";
import OutlinedClockIcon from "@patternfly/react-icons/dist/esm/icons/outlined-clock-icon";
import {
  FormEvent,
  FunctionComponent,
  useCallback,
  VoidFunctionComponent,
} from "react";
import { useTranslation } from "react-i18next";
import { FormAlerts, InstanceInfo, ModalAlerts } from "./components";
import { FieldAZ } from "./components/FieldAZ";
import { FieldCloudProvider } from "./components/FieldCloudProvider";
import { FieldCloudRegion } from "./components/FieldCloudRegion";
import { FieldInstanceName } from "./components/FieldInstanceName";
import { FieldSize, FieldSizeProps } from "./components/FieldSize";
import "./CreateKafkaInstance.css";
import {
  CreateKafkaInstanceProvider,
  MakeCreateKafkaInstanceMachine,
  useCreateKafkaInstanceMachine,
} from "./machines";

export type CreateKafkaInstanceProps = ConnectedCreateKafkaInstanceProps &
  MakeCreateKafkaInstanceMachine;
export const CreateKafkaInstance: FunctionComponent<
  CreateKafkaInstanceProps
> = ({ getAvailableProvidersAndDefaults, onCreate, ...props }) => (
  <CreateKafkaInstanceProvider
    getAvailableProvidersAndDefaults={getAvailableProvidersAndDefaults}
    onCreate={onCreate}
  >
    <ConnectedCreateKafkaInstance {...props} />
  </CreateKafkaInstanceProvider>
);

export type ConnectedCreateKafkaInstanceProps = {
  /**
   *
   * Flag to show the modal
   */
  isModalOpen: boolean;

  onClickQuickStart: () => void;
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
  onClickKafkaOverview: () => void;
  onClickContactUs: () => void;
  onClickLearnMoreAboutRegions: () => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
};
export const ConnectedCreateKafkaInstance: VoidFunctionComponent<
  ConnectedCreateKafkaInstanceProps
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
  const { t } = useTranslation("create-kafka-instance-exp");

  const {
    instanceAvailability,
    size,

    isTrial,
    isLoading,
    isSaving,
    canSave,
    isSystemUnavailable,
    error,
    create,

    maxStreamingUnits,
    remainingStreamingUnits,
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
        instanceAvailability={instanceAvailability}
        isSystemUnavailable={isSystemUnavailable}
        isLoading={isLoading}
        onClickKafkaOverview={onClickKafkaOverview}
        maxStreamingUnits={maxStreamingUnits}
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
            streamingUnits={remainingStreamingUnits}
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
          <InstanceInfo
            isLoading={isLoading}
            isTrial={isTrial}
            trialDurationInHours={0}
            ingresEgress={0}
            storage={0}
            maxPartitions={0}
            connections={0}
            connectionRate={0}
            messageSize={0}
            onClickQuickStart={onClickQuickStart}
            streamingUnits={size?.streamingUnits}
          />
        </FlexItem>
      </Flex>
      <Alert
        className="mas--CreateKafkaInstance__creationTimeAlert"
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
    name,
    isNameTaken,
    isNameInvalid,
    isNameEmpty,
    isFormEnabled,
    setName,
  } = useCreateKafkaInstanceMachine();

  return (
    <FieldInstanceName
      value={name || ""}
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
  const {
    provider,
    availableProviders,
    isProviderError,
    isFormEnabled,
    setProvider,
  } = useCreateKafkaInstanceMachine();

  return (
    <FieldCloudProvider
      isValid={!isProviderError}
      providers={availableProviders}
      value={provider}
      isDisabled={!isFormEnabled}
      onChange={setProvider}
    />
  );
};

export const ConnectedFieldCloudRegion: VoidFunctionComponent = () => {
  const { region, regions, isRegionError, isFormEnabled, setRegion } =
    useCreateKafkaInstanceMachine();

  return (
    <FieldCloudRegion
      validity={isRegionError ? "required" : "valid"}
      regions={regions || []}
      value={region}
      isDisabled={!isFormEnabled}
      onChange={setRegion}
    />
  );
};

export const ConnectedFieldAZ: VoidFunctionComponent = () => {
  const { az, isAzError, setAZ, isTrial, isFormEnabled } =
    useCreateKafkaInstanceMachine();

  return (
    <FieldAZ
      validity={isAzError ? "required" : "valid"}
      options={isTrial ? "single" : "multi"}
      value={az}
      isDisabled={!isFormEnabled}
      onChange={setAZ}
    />
  );
};

export const ConnectedFieldSize: VoidFunctionComponent<
  Pick<
    FieldSizeProps,
    "onLearnHowToAddStreamingUnits" | "onLearnMoreAboutSizes"
  >
> = () => {
  const {
    size,
    remainingStreamingUnits,
    isSizeInvalid,
    isFormEnabled,
    isTrial,
    setSize,
  } = useCreateKafkaInstanceMachine();

  return (
    <FieldSize
      value={size?.streamingUnits || 1}
      sizes={[
        { id: "x1", streamingUnits: 1 },
        { id: "x2", streamingUnits: 2 },
      ]}
      remainingStreamingUnits={remainingStreamingUnits}
      isDisabled={!isFormEnabled}
      validity={isTrial ? "trial" : isSizeInvalid ? "over-quota" : "valid"}
      onChange={setSize}
      onLearnHowToAddStreamingUnits={function (): void {
        throw new Error("Function not implemented.");
      }}
      onLearnMoreAboutSizes={function (): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
