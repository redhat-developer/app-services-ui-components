import { Button, Form, FormGroup, Modal } from "@patternfly/react-core";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SelectAccount } from "./components/SelectAccount";
import type { Account } from "./types";

type ManageKafkaPermissionsProps = {
  accounts: Account[];
  onCancel: () => void;
  kafkaName: string;
};

export const ManageKafkaPermissions: React.FC<ManageKafkaPermissionsProps> = ({
  onCancel,
  kafkaName,
  accounts,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const escapeClosesModal = useRef<boolean>(true);
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    undefined
  );

  const step = 1;

  const onEscapePress = () => {
    if (escapeClosesModal.current) {
      onCancel();
    }
  };

  const setEscapeClosesModal = (closes: boolean) => {
    escapeClosesModal.current = closes;
  };

  return (
    <Modal
      id="manage-permissions-modal"
      variant={"large"}
      isOpen={true}
      aria-label={t("dialog_aria_label")}
      position="top"
      title={t("dialog_title")}
      showClose={true}
      aria-describedby="modal-message"
      onClose={onCancel}
      onEscapePress={onEscapePress}
      actions={[
        <Button
          key={1}
          variant="primary"
          isDisabled={selectedAccount === undefined || selectedAccount === ""}
        >
          {step === 1 ? t("step_1_submit_button") : t("step_2_submit_button")}
        </Button>,
        <Button onClick={onCancel} key={2} variant="secondary">
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Form>
        <FormGroup
          fieldId="kafka-instance-name"
          label={t("kafka_instance")}
          id="modal-message"
        >
          {kafkaName}
        </FormGroup>

        <SelectAccount
          value={selectedAccount}
          onChangeAccount={setSelectedAccount}
          accounts={accounts}
          onEscapeModal={setEscapeClosesModal}
        />
      </Form>
    </Modal>
  );
};
