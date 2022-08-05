import type { VoidFunctionComponent } from "react";
import {
  Modal,
  ModalVariant,
  Flex,
  FlexItem,
  Button,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export type TermsAndConditionModalProps = {
  onClickViewTermsConditions: () => void;
  onCancel: () => void;
  isModalOpen: boolean;
  serviceName: string;
};

export const TermsAndConditionModal: VoidFunctionComponent<
  TermsAndConditionModalProps
> = ({ onClickViewTermsConditions, onCancel, isModalOpen, serviceName }) => {
  const { t } = useTranslation("common");

  return (
    <Modal
      id="modalTerms"
      ouiaId="modal-KafkaTerms"
      variant={ModalVariant.small}
      title={t("terms_conditions_modal.terms_and_conditions")}
      isOpen={isModalOpen}
      onClose={onCancel}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          data-testid="actionViewTerms"
          ouiaId="button-view-terms"
          onClick={onClickViewTermsConditions}
        >
          {t("terms_conditions_modal.view_terms_and_conditions")}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          data-testid="actionCancelViewTerms"
          ouiaId="button-cancel"
          onClick={onCancel}
        >
          {t("cancel")}
        </Button>,
      ]}
    >
      <Flex direction={{ default: "column" }}>
        <FlexItem>
          <p>{t("terms_conditions_modal.content1")}</p>
        </FlexItem>
        <FlexItem>
          <p>
            <strong>
              {t("terms_conditions_modal.content2", { serviceName })}
            </strong>
          </p>
        </FlexItem>
      </Flex>
    </Modal>
  );
};
