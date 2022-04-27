import {
  Alert,
  Button,
  Flex,
  FlexItem,
  Modal,
  ModalVariant,
} from "@patternfly/react-core";
import { FormEvent, FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  FormAlerts,
  InstanceInfo,
  InstanceInfoLimitsProps,
  ModalAlerts,
  TrialKafkaForm,
  StandardKafkaForm,
} from "./components";
import "./CreateKafkaInstance.css";
import {
  MakeCreateKafkaInstanceMachine,
  useCreateKafkaInstanceMachine,
} from "./machines";
import OutlinedClockIcon from "@patternfly/react-icons/dist/esm/icons/outlined-clock-icon";

export type CreateKafkaInstanceProps = {
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
} & MakeCreateKafkaInstanceMachine &
  Partial<InstanceInfoLimitsProps>;

export const CreateKafkaInstance: FunctionComponent<
  CreateKafkaInstanceProps
> = ({
  getAvailableProvidersAndDefaults,
  isModalOpen,
  appendTo,
  onClickQuickStart,
  onCancel,
  onCreate,
  disableFocusTrap,
  trialDurationInHours = 48,
  ingresEgress = 30,
  storage = 1000,
  maxPartitions = 1000,
  connections = 2000,
  connectionRate = 100,
  messageSize = 1,
}) => {
  const FORM_ID = "create_instance_-form";
  const { t } = useTranslation("create-kafka-instance-exp");

  const {
    name,
    provider,
    region,
    az,
    regions,
    azOptions,
    availableProviders,
    instanceAvailability,
    size,

    isNameTaken,
    isNameInvalid,
    isNameError,
    isProviderError,
    isRegionError,
    isAzError,

    isTrial,
    isLoading,
    isSaving,
    canCreate,
    canSave,
    isSystemUnavailable,

    error,

    setName,
    setProvider,
    setRegion,
    setAZ,
    create,
    setSize,
  } = useCreateKafkaInstanceMachine({
    getAvailableProvidersAndDefaults,
    onCreate,
  });

  const onSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      create();
    },
    [create]
  );

  const disableControls = isLoading || isSaving || !canCreate;

  const nameValidation = isNameError ? "error" : "default";
  const providerValidation = isProviderError ? "error" : "default";
  const regionValidation = isRegionError ? "error" : "default";
  const azValidation = isAzError ? "error" : "default";
  const disableAZTooltip =
    azOptions === undefined || (azOptions?.multi === true && azOptions.single);
  const isDisabledSize = instanceAvailability === "trial" || disableControls;

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
      />
      <Flex
        direction={{ default: "column", lg: "row" }}
        alignItems={{ lg: "alignItemsFlexStart" }}
      >
        <FlexItem flex={{ default: "flex_2" }}>
          <FormAlerts error={error} />
          {isTrial && instanceAvailability ? (
            <>
              <TrialKafkaForm
                FORM_ID={FORM_ID}
                isNameTaken={isNameTaken}
                isNameInvalid={isNameInvalid}
                nameValidation={nameValidation}
                name={name}
                disableControls={disableControls}
                providerValidation={providerValidation}
                availableProviders={availableProviders}
                provider={provider}
                regionValidation={regionValidation}
                regions={regions}
                region={region}
                azValidation={azValidation}
                azOptions={azOptions}
                az={az}
                disableAZTooltip={disableAZTooltip}
                isDisabledSize={isDisabledSize}
                size={size}
                setSize={setSize}
                setRegion={setRegion}
                setAZ={setAZ}
                setProvider={setProvider}
                setName={setName}
                onSubmit={onSubmit}
                instanceAvailability={instanceAvailability}
              />
            </>
          ) : (
            <StandardKafkaForm
              FORM_ID={FORM_ID}
              isNameTaken={isNameTaken}
              isNameInvalid={isNameInvalid}
              nameValidation={nameValidation}
              name={name}
              disableControls={disableControls}
              providerValidation={providerValidation}
              availableProviders={availableProviders}
              provider={provider}
              regionValidation={regionValidation}
              regions={regions}
              region={region}
              azValidation={azValidation}
              azOptions={azOptions}
              az={az}
              disableAZTooltip={disableAZTooltip}
              isDisabledSize={isDisabledSize}
              size={size}
              setSize={setSize}
              setRegion={setRegion}
              setAZ={setAZ}
              setProvider={setProvider}
              setName={setName}
              onSubmit={onSubmit}
              streamingUnits={3}
            />
          )}
        </FlexItem>
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mas--CreateKafkaInstance__sidebar"
        >
          <InstanceInfo
            isLoading={isLoading || !canCreate}
            isTrial={isTrial}
            trialDurationInHours={trialDurationInHours}
            ingresEgress={ingresEgress}
            storage={storage}
            maxPartitions={maxPartitions}
            connections={connections}
            connectionRate={connectionRate}
            messageSize={messageSize}
            onClickQuickStart={onClickQuickStart}
            streamingUnits={2}
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
