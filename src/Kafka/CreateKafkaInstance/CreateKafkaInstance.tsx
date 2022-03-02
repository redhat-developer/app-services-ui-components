import {
  Alert,
  Button,
  Divider,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  TextInput,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
} from "@patternfly/react-core";
import { FormEvent, FunctionComponent, useCallback } from "react";
import { useTranslation } from "react-i18next";
import {
  CloudProvidersTiles,
  CloudRegionSelect,
  FormAlerts,
  InstanceInfo,
  InstanceInfoLimitsProps,
  ModalAlerts,
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
  const { t } = useTranslation("create-kafka-instance");

  const {
    name,
    provider,
    region,
    az,
    regions,
    azOptions,
    availableProviders,
    instanceAvailability,

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

  return (
    <Modal
      id="modalCreateKafka"
      variant={ModalVariant.medium}
      title={t("create_instance")}
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
      <Flex direction={{ default: "column", lg: "row" }}>
        <FlexItem flex={{ default: "flex_2" }}>
          <FormAlerts error={error} />
          <Form onSubmit={onSubmit} id={FORM_ID}>
            {/* <FormValidAlert /> */}
            <FormGroup
              label={t("instance_name")}
              helperText={t("create_instance_name_helper_text")}
              helperTextInvalid={
                isNameTaken
                  ? t("create_instance_name_helper_text_name_taken", { name })
                  : isNameInvalid
                  ? t("create_instance_name_helper_text")
                  : t("common:required")
              }
              isRequired
              validated={nameValidation}
              fieldId="form-instance-name"
            >
              <TextInput
                id="form-instance-name"
                isRequired
                validated={nameValidation}
                type="text"
                value={name || ""}
                onChange={setName}
                autoFocus={true}
                isDisabled={disableControls}
              />
            </FormGroup>
            <FormGroup
              label={t("cloud_provider")}
              fieldId="form-cloud-provider-name"
              validated={providerValidation}
              helperTextInvalid={t("common:required")}
              isRequired
            >
              <CloudProvidersTiles
                providers={availableProviders}
                value={provider}
                onChange={setProvider}
                isDisabled={disableControls}
              />
            </FormGroup>
            <FormGroup
              label={t("cloud_region")}
              fieldId="form-cloud-region-option"
              isRequired
              validated={regionValidation}
              helperTextInvalid={t("common:required")}
            >
              <CloudRegionSelect
                value={region}
                regions={regions || []}
                onChange={setRegion}
                isDisabled={disableControls || !(regions && regions.length > 0)}
                validated={regionValidation}
              />
            </FormGroup>
            <FormGroup
              label={t("availability_zones")}
              fieldId="availability-zones"
              validated={azValidation}
              helperTextInvalid={t("common:required")}
            >
              <ToggleGroup aria-label={t("availability_zone_selection")}>
                <Tooltip
                  content={t("availability_zones_tooltip_message", {
                    enabledZone: azOptions?.multi ? "multi" : "single",
                  })}
                  trigger={disableAZTooltip ? "manual" : undefined}
                >
                  <ToggleGroupItem
                    text={t("single")}
                    value={"single"}
                    isDisabled={
                      disableControls || !(azOptions?.single === true)
                    }
                    buttonId="single"
                    isSelected={az === "single"}
                    onChange={() => setAZ("single")}
                  />
                </Tooltip>

                <Tooltip
                  trigger={disableAZTooltip ? "manual" : undefined}
                  content={t("availability_zones_tooltip_message", {
                    enabledZone: azOptions?.multi ? "multi" : "single",
                  })}
                >
                  <ToggleGroupItem
                    text={t("multi")}
                    value="multi"
                    buttonId="multi"
                    isDisabled={disableControls || !(azOptions?.multi === true)}
                    isSelected={az === "multi"}
                    onChange={() => setAZ("multi")}
                  />
                </Tooltip>
              </ToggleGroup>
            </FormGroup>
          </Form>
        </FlexItem>
        <Divider isVertical />
        <FlexItem
          flex={{ default: "flex_1" }}
          className="mk--create-instance-modal__sidebar--content"
        >
          <InstanceInfo
            isLoading={isLoading}
            isTrial={isTrial}
            trialDurationInHours={trialDurationInHours}
            ingresEgress={ingresEgress}
            storage={storage}
            maxPartitions={maxPartitions}
            connections={connections}
            connectionRate={connectionRate}
            messageSize={messageSize}
            onClickQuickStart={onClickQuickStart}
          />
        </FlexItem>
      </Flex>
      <Flex>
        <FlexItem>
          <Alert
            className="mas-m-modalTop"
            customIcon={<OutlinedClockIcon />}
            variant="info"
            isInline
            isPlain
            title="Your Kafka instance will be ready for use shortly after creation."
          />
        </FlexItem>
      </Flex>
    </Modal>
  );
};