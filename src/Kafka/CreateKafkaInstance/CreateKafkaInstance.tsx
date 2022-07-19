import {
  Alert,
  Button,
  Modal,
  ModalVariant,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { OutlinedClockIcon } from "@patternfly/react-icons";
import type { FunctionComponent, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { CreateKafkaInstanceProvider } from "./machines/CreateKafkaInstanceProvider";

import "./CreateKafkaInstance.css";
import { LoadingForm } from "./LoadingForm";
import { useCreateKafkaInstance } from "./machines";
import { StandardInstanceForm } from "./StandardInstanceForm";
import { TrialInstanceForm } from "./TrialInstanceForm";
import type { CreateKafkaInstanceServices } from "./types";
import { ModalAlertsLoading, ModalAlertsSystemUnavailable } from "./components";

export type CreateKafkaInstanceProps = ConnectedCreateKafkaInstanceProps &
  CreateKafkaInstanceServices;
export const CreateKafkaInstance: FunctionComponent<
  CreateKafkaInstanceProps
> = ({
  getAvailableProvidersAndDefaults,
  getStandardSizes,
  getTrialSizes,
  onCreate,
  ...props
}) =>
  props.isModalOpen ? (
    <CreateKafkaInstanceProvider
      getAvailableProvidersAndDefaults={getAvailableProvidersAndDefaults}
      getStandardSizes={getStandardSizes}
      getTrialSizes={getTrialSizes}
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
  onClickContactUs: () => void;
  onClickLearnMoreAboutRegions: () => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
  onClickKafkaOverview: () => void;
};
export const ConnectedCreateKafkaInstance: VoidFunctionComponent<
  ConnectedCreateKafkaInstanceProps
> = ({
  isModalOpen,
  appendTo,
  onClickQuickStart,
  onCancel,
  disableFocusTrap,
  onClickContactUs,
  //onClickLearnMoreAboutRegions,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
  onClickKafkaOverview,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  const { isLoading, isStandardPlan, isTrialPlan, isSaving } =
    useCreateKafkaInstance();

  const FORM_ID = "create_kafka_instance_form";

  return (
    <Modal
      id="modalCreateKafka"
      variant={ModalVariant.large}
      title={t("create_instance_title")}
      disableFocusTrap={disableFocusTrap}
      isOpen={isModalOpen}
      ouiaId="modal-create-kafka"
      onClose={onCancel}
      appendTo={appendTo}
      position="top"
      footer={
        <Stack hasGutter={true}>
          <StackItem>
            <Alert
              className="mas--CreateKafkaInstance__creationTimeAlert"
              customIcon={<OutlinedClockIcon />}
              variant="info"
              isInline
              isPlain
              title={t("instance_creation_time_alert")}
            />
          </StackItem>
          <StackItem>
            <Button
              key="submit"
              variant="primary"
              type="submit"
              form={FORM_ID}
              spinnerAriaValueText={t("common:submitting_request")}
              isDisabled={isLoading || isSaving}
              isLoading={isSaving}
              data-testid="modalCreateKafka-buttonSubmit"
              ouiaId="button-create"
            >
              {t("create_instance")}
            </Button>
            <Button
              key="cancel"
              variant="link"
              onClick={onCancel}
              data-testid="modalCreateKafka-buttonCancel"
            >
              {t("common:cancel")}
            </Button>
          </StackItem>
        </Stack>
      }
    >
      {(() => {
        switch (true) {
          case isLoading:
            return (
              <>
                <ModalAlertsLoading />
                <LoadingForm
                  onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                  onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                  onClickQuickStart={onClickQuickStart}
                />
              </>
            );
          case isStandardPlan:
            return (
              <StandardInstanceForm
                formId={FORM_ID}
                onClickContactUs={onClickContactUs}
                onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                onClickQuickStart={onClickQuickStart}
              />
            );
          case isTrialPlan:
            return (
              <TrialInstanceForm
                formId={FORM_ID}
                onClickContactUs={onClickContactUs}
                onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                onClickQuickStart={onClickQuickStart}
                onClickKafkaOverview={onClickKafkaOverview}
              />
            );
          default:
            return (
              <>
                <ModalAlertsSystemUnavailable />
                <LoadingForm
                  onLearnHowToAddStreamingUnits={onLearnHowToAddStreamingUnits}
                  onLearnMoreAboutSizes={onLearnMoreAboutSizes}
                  onClickQuickStart={onClickQuickStart}
                />
              </>
            );
        }
      })()}
    </Modal>
  );
};
