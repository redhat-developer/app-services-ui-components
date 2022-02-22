import {
  Button,
  Form,
  FormGroup,
  Modal,
  SelectOptionObject,
} from "@patternfly/react-core";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { SubmitButton } from "./PermissionsModalSubmitButton";
import { Validated, SelectAccount } from "./SelectAccount";

export enum PrincipalType {
  UserAccount = "USER_ACCOUNT",
  ServiceAccount = "SERVICE_ACCOUNT",
}

export type Principal = {
  id: string;
  principalType?: PrincipalType;
  displayName?: string;
};

type ManagePermissionsModalProps = {
  principal: Principal[];
  hideModal: () => void;
  kafkaName?: string;
  selectedAccount: Validated<string | undefined | SelectOptionObject>;
  onChangeAccount: React.Dispatch<
    React.SetStateAction<Validated<string | undefined | SelectOptionObject>>
  >;
};

export const ManagePermissionsModal: React.FC<ManagePermissionsModalProps> = ({
  hideModal,
  kafkaName,
  principal,
  selectedAccount,
  onChangeAccount,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const escapeClosesModal = useRef<boolean>(true);
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
      >
        {kafkaName}
      </FormGroup>
      <SelectAccount
        id={selectedAccount}
        onChangeAccount={onChangeAccount}
        initialOptions={principal}
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
        <SubmitButton key={1} selectedAccountId={selectedAccount.value} />,
        <Button onClick={hideModal} key={2} variant="secondary">
          {t("manage_permissions_dialog.cancel_button")}
        </Button>,
      ]}
    >
      <ModalForm />
    </Modal>
  );
};
