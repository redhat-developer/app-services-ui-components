import {
  Button,
  Form,
  FormGroup,
  Modal,
  SelectOptionObject,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { FormGroupWithPopover } from "../..";
import { SubmitButton } from "./components/PermissionsModalSubmitButton";
import { SelectAccount } from "./components/SelectAccount";
import { Account } from "./types";

type ManageKafkaPermissionsProps = {
  accounts: Account[];
  hideModal: () => void;
  kafkaName: string;
};

export const ManageKafkaPermissions: React.FC<ManageKafkaPermissionsProps> = ({
  hideModal,
  kafkaName,
  accounts,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const escapeClosesModal = useRef<boolean>(true);
  const [selectedAccount, setSelectedAccount] = useState<
    string | undefined | SelectOptionObject
  >(undefined);
  const [step, setStep] = useState<number>(1);
  const [validated, setValidated] = useState<ValidatedOptions>(
    ValidatedOptions.default
  );

  const onEscapePress = () => {
    if (escapeClosesModal.current) {
      hideModal();
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
            selectedAccount === undefined || selectedAccount === ""
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
      <Form>
        <FormGroup
          fieldId="kafka-instance-name"
          label={t("manage_permissions_dialog.kafka_instance_title")}
          id="modal-message"
        >
          {kafkaName}
        </FormGroup>
        <FormGroupWithPopover
          labelHead={t("manage_permissions_dialog.account_id_title")}
          fieldId="kafka-instance-name"
          fieldLabel={t("manage_permissions_dialog.account_id_title")}
          labelBody={t("manage_permissions_dialog.account_id_help")}
          buttonAriaLabel={t("manage_permissions_dialog.account_id_aria")}
          isRequired={true}
          helperTextInvalid={t("common:required")}
          validated={validated}
        >
          <SelectAccount
            id={selectedAccount}
            onChangeAccount={setSelectedAccount}
            accounts={accounts}
            onEscapeModal={setEscapeClosesModal}
            validated={validated}
            onChangeValidation={setValidated}
          />
        </FormGroupWithPopover>
      </Form>
    </Modal>
  );
};
