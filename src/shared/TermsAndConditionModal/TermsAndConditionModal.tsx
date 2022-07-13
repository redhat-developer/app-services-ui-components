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
  onClick: () => void;
  onCancel: () => void;
  isModalOpen: boolean;
};

export const TermsAndConditionModal: VoidFunctionComponent<
  TermsAndConditionModalProps
> = ({ onClick, onCancel, isModalOpen }) => {
  const { t } = useTranslation("kafka");

  return (
    <Modal
      id="modalTerms"
      variant={ModalVariant.small}
      title="Terms and Conditions"
      isOpen={isModalOpen}
      onClose={onCancel}
      actions={[
        <Button
          key="confirm"
          variant="primary"
          data-testid="actionViewTerms"
          onClick={onClick}
        >
          {t("terms_conditions_modal.view_terms_and_conditions")}
        </Button>,
        <Button
          key="cancel"
          variant="link"
          data-testid="actionCancelViewTerms"
          onClick={onCancel}
        >
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Flex direction={{ default: "column" }}>
        <FlexItem>
          <p>{t("terms_conditions_modal.content1")}</p>
        </FlexItem>
        <FlexItem>
          <p>
            <strong>{t("terms_conditions_modal.content2")}</strong>
          </p>
        </FlexItem>
      </Flex>
    </Modal>
  );
};
