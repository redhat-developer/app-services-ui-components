import {
  Button,
  Form,
  FormGroup,
  Modal,
  SelectOptionObject,
} from "@patternfly/react-core";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "./components/PermissionsModalSubmitButton";
import { Validated, SelectAccount } from "./components/SelectAccount";
import { Account } from "./types";

type ManageKafkaPermissionsProps = {
  accounts: Account[];
  hideModal: () => void;
  kafkaName?: string;
};

export const ManageKafkaPermissions: React.FC<ManageKafkaPermissionsProps> = ({
  hideModal,
  kafkaName,
  accounts,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const escapeClosesModal = useRef<boolean>(true);
  const [selectedAccount, setSelectedAccount] = useState<
    Validated<string | undefined | SelectOptionObject>
  >({ value: undefined, validated: undefined });
  const [step, setStep] = useState<number>(1);
  /*value of step will be used when working on step 2
  const [step, setStep] = useState<number>(1);
  */
  const onEscapePress = () => {
    if (escapeClosesModal.current) {
      hideModal();
    }
  };

  const setEscapeClosesModal = (closes: boolean) => {
    escapeClosesModal.current = closes;
  };
  const ModalForm: React.FunctionComponent = () => (
    <Form>
      <FormGroup
        fieldId="kafka-instance-name"
        label={t("manage_permissions_dialog.kafka_instance_title")}
        id="modal-message"
      >
        {kafkaName}
      </FormGroup>
      <SelectAccount
        id={selectedAccount}
        onChangeAccount={setSelectedAccount}
        accounts={accounts}
        onEscapeModal={setEscapeClosesModal}
      />
    </Form>
  );

  return (
    <Modal
      id="manage-permissions-modal"
      variant={"large"}
      isOpen={true}
      aria-label={t("manage_permissions_dialog.aria_label")}
      position="top"
      title={t("manage_permissions_dialog.title")}
      showClose={true}
      aria-describedby="modal-message"
      onClose={hideModal}
      onEscapePress={onEscapePress}
      actions={[
        <SubmitButton
          key={1}
          isButtonDisabled={
            selectedAccount.value === undefined || selectedAccount.value === ""
              ? true
              : false
          }
          onChangeStep={setStep}
          step={step}
        />,
        <Button onClick={hideModal} key={2} variant="secondary">
          {t("manage_permissions_dialog.cancel_button")}
        </Button>,
      ]}
    >
      <ModalForm />
    </Modal>
  );
};
