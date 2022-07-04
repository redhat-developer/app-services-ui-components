import { Button, Form, FormGroup, Modal } from "@patternfly/react-core";
import { useMachine } from "@xstate/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { assign } from "xstate";
import { SelectAccount } from "./components/SelectAccount";
import { ManageKafkaPermissionsMachine } from "./ManageKafkaPermissionsMachine";
import type { Account } from "./types";

type ManageKafkaPermissionsProps = {
  getUsersAndServiceAccounts: () => Promise<Account[]>;
  onCancel: () => void;
  kafkaName: string;
};

export const ManageKafkaPermissions: React.FC<ManageKafkaPermissionsProps> = ({
  getUsersAndServiceAccounts,
  onCancel,
  kafkaName,
}) => {
  const [state, send] = useMachine(ManageKafkaPermissionsMachine, {
    actions: {
      addConsumeTopicTemplateAcl: () => false,
      addManageAccessTemplateAcl: () => false,
      addProduceTopicTemplateAcl: () => false,
      addRawAcl: () => false,
      clearSelectedAccount: assign((_context) => ({ account: undefined })),
      setSelectedAccount: assign((_, event) => ({ account: event.account })),
      setSelectedUsername: assign((_, event) => ({ account: event.username })),
      setWildcardAccount: assign((_context) => ({ account: '*' })),
      setAvailableUsersAndAccounts: assign((_, event) => ({ availableUsersAndAccounts: event.data }))
    },
    guards: {
      'acl user matches the selected one in step 1 OR selected user is "all accounts"':
        () => {
          return true;
        },
      "acls count == 0": (context) => {
        return context.addedAcls.length === 0;
      },
      dirty: () => true,
      pristine: () => true,
    },
    services: {
      loadACLs: () => {
        return new Promise(() => {});
      },
      loadUsersAndServiceAccounts: getUsersAndServiceAccounts,
      saveAcls: () => {
        return new Promise(() => {});
      },
    },
  });

  const { t } = useTranslation(["manage-kafka-permissions"]);
  const escapeClosesModal = useRef<boolean>(true);

  const isStep1 = state.hasTag("step-1");
  const isLoadingUsersAndAccounts = state.hasTag("loading-users");
  const canNext = state.can("Next");
  const onNext = () => send("Next");

  const onEscapePress = () => {
    if (escapeClosesModal.current) {
      onCancel();
    }
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
          isDisabled={!canNext}
          onClick={onNext}
        >
          {isStep1 ? t("step_1_submit_button") : t("step_2_submit_button")}
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

        {isStep1 && (
          <SelectAccount
            isLoading={isLoadingUsersAndAccounts}
            accounts={state.context.availableUsersAndAccounts}
            value={state.context.account}
            onSelectServiceAccount={(account) =>
              send({ type: "Select service account from list", account })
            }
            onSelectWildcard={() => send({ type: "All accounts wildcard" })}
            onSelectUser={(username) =>
              send({ type: "Select user from list", username })
            }
            onTypeUsername={(username) =>
              send({ type: "Type username", username })
            }
            onClearSelection={() => send({ type: "Clear selection" })}
          />
        )}
      </Form>
    </Modal>
  );
};
