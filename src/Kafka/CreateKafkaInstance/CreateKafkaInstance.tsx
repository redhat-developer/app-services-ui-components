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
import type {
  FormEvent,
  FunctionComponent,
  VoidFunctionComponent,
} from "react";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { FieldSizeProps } from "./components";
import {
  FieldAZ,
  FieldCloudProvider,
  FieldCloudRegion,
  FieldInstanceName,
  FieldSize,
  FormAlerts,
  InstanceInfo,
  InstanceInfoSkeleton,
  ModalAlerts,
} from "./components";

import {
  CreateKafkaInstanceProvider,
  useCreateKafkaInstanceMachine,
} from "./CreateKafkaInstanceProvider";

import "./CreateKafkaInstance.css";
import type { MakeCreateKafkaInstanceMachine } from "./types";

export type CreateKafkaInstancePropsWithSizes =
  ConnectedCreateKafkaInstanceProps & MakeCreateKafkaInstanceMachine;
export const CreateKafkaInstance: FunctionComponent<
  CreateKafkaInstancePropsWithSizes
> = ({ getAvailableProvidersAndDefaults, getSizes, onCreate, ...props }) =>
  props.isModalOpen ? (
    <CreateKafkaInstanceProvider
      getAvailableProvidersAndDefaults={getAvailableProvidersAndDefaults}
      getSizes={getSizes}
      onCreate={onCreate}
    >
      <ConnectedCreateKafkaInstance {...props} />
    </CreateKafkaInstanceProvider>
  ) : null;

export type ConnectedCreateKafkaInstanceProps = {
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
  const FORM_ID = "create_instan ce_-form";
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
