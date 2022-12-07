import type React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ModalVariant,
  Button,
  ButtonVariant,
} from "@patternfly/react-core";

export type PreCancelModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  resumeEditing: () => void;
};

const PreCancelModal: React.FC<PreCancelModalProps> = ({
  isOpen,
  closeModal,
  resumeEditing,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  return (
    <Modal
      id="manage-permissions-precancel-modal"
      variant={ModalVariant.small}
      isOpen={isOpen}
      aria-label={t("pre_cancel_label")}
      title={t("pre_cancel_title")}
      titleIconVariant="warning"
      showClose={true}
      aria-describedby="modal-message"
      onClose={resumeEditing}
      onEscapePress={closeModal}
      actions={[
        <Button onClick={closeModal} key={1} variant={ButtonVariant.primary}>
          {t("discard_changes")}
        </Button>,
        <Button
          onClick={resumeEditing}
          key={2}
          variant={ButtonVariant.secondary}
        >
          {t("resume_editing")}
        </Button>,
      ]}
    >
      {t("cancel_description")}
    </Modal>
  );
};

export { PreCancelModal };
