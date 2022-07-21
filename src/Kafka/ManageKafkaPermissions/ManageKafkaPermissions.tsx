import {
  Button,
  Form,
  FormGroup,
  HelperText,
  Modal,
  Popover,
  TextContent,
  Text,
  TextVariants,
} from "@patternfly/react-core";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import { useMachine } from "@xstate/react";
import { useRef } from "react";
import { useTranslation } from "react-i18next";
import { assign } from "xstate";
import { AssignPermissions } from "./components/AssignPermissions";
import { ManageAccessShortcut } from "./components/ManageAccessShortcut";
import { SelectAccount } from "./components/SelectAccount";
import { ViewAccountDetails } from "./components/ViewAccountDetails";
import { ManageKafkaPermissionsMachine } from "./ManageKafkaPermissionsMachine";
import type { Account, AddAclType } from "./types";

type ManageKafkaPermissionsProps = {
  getUsersAndServiceAccounts: () => Promise<Account[]>;
  onCancel: () => void;
  kafkaName: string;
  resourceNameOptions: () => Promise<string[]>;
  fetchConsumeTopicShortcutResourceName: () => Promise<string[]>;
  onFetchConsumeTopicShortcutTopicResourceNameOptions: () => Promise<string[]>;
  onFetchProduceTopicShortcutResourceNameOptions: () => Promise<string[]>;
  fetchConsumeTopicShortcutTopicResourceNameOptions: () => Promise<string[]>;
};

export const ManageKafkaPermissions: React.FC<ManageKafkaPermissionsProps> = ({
  getUsersAndServiceAccounts,
  onCancel,
  kafkaName,
  resourceNameOptions,
  fetchConsumeTopicShortcutResourceName,
  onFetchConsumeTopicShortcutTopicResourceNameOptions,
  onFetchProduceTopicShortcutResourceNameOptions,
  fetchConsumeTopicShortcutTopicResourceNameOptions,
}) => {
  const [state, send] = useMachine(ManageKafkaPermissionsMachine, {
    actions: {
      addConsumeTopicTemplateAcl: () => {
        //send("Add a consume from a topic ACL");
        addedAcls.push({
          type: "consume-topic",
          topicResourcePrefixRule: "Is",
          topicResourceName: undefined,
          consumerResourceName: undefined,
          consumerResourcePrefixRule: "Is",
        });
      },

      addManageAccessTemplateAcl: () => {
        addedAcls.push({ type: "manage-access", instanceName: kafkaName });
        //createRows('Manage Access')

        //<ManageAccessShortcut onDelete={onDeleteNewAcl} instanceName={kafkaName} rowIndex={1}/>
      },

      addProduceTopicTemplateAcl: () => {
        addedAcls.push({
          type: "produce-topic",
          prefixRuleValue: "Is",
          resourceNameValue: undefined,
        });
      },

      addRawAcl: () => {
        addedAcls.push({
          type: "manual",
          resourceName: undefined,
          resourceType: undefined,
          resourceOperation: undefined,
          resourcePrefix: "Is",
          resourcePermission: "allow",
        });
      },

      clearSelectedAccount: assign({
        account: (context) => {
          return (context.account = undefined);
        },
      }),
      //setSelectedAccount: assign((context, event) => {}),
      setSelectedAccount: assign({
        account: (context, event) => {
          return (context.account = event.account);
        },
      }),
      setSelectedUsername: assign((_, event) => ({ account: event.username })),
      setWildcardAccount: assign((_context) => ({ account: "*" })),
      setAvailableUsersAndAccounts: assign((_, event) => ({
        availableUsersAndAccounts: event.data,
      })),
    },
    guards: {
      'acl user matches the selected one in step 1 OR selected user is "all accounts"':
        (context, event) => {
          const acl = context.existingAcls[event.aclIndex];
          return acl.principal == context.account || acl.principal == "*";
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
  const onSave = () => send("Save");
  const onAddManualPermissions = () => send("Add ACL manually");
  const onAddProduceTopicShortcut = () => send("Add a produce to a topic ACL");
  const onConsumeTopicShortcut = () => send("Add a consume from a topic ACL");
  const onManageAccessShortcut = () => send("Add manage access ACL");
  const onRemoveAcl = (index: number) =>
    send({ type: "Delete existing ACL", aclIndex: index });
  const onDeleteNewAcl = (index: number) =>
    send({ type: "Delete ACL", aclIndex: index });
  const addedAcls: AddAclType[] = [];

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
          onClick={isStep1 ? onNext : onSave}
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
      {!isStep1 && (
        <Form>
          <ViewAccountDetails
            accountId={state.context.account}
            onRemoveAcl={onRemoveAcl}
            existingAcls={state.context.existingAcls}
          />
          <AssignPermissions
            onAddManualPermissions={onAddManualPermissions}
            onAddProduceTopicShortcut={onAddProduceTopicShortcut}
            onConsumeTopicShortcut={onConsumeTopicShortcut}
            onManageAccessShortcut={onManageAccessShortcut}
            onDelete={onDeleteNewAcl}
            submitted={false}
            resourceNameOptions={resourceNameOptions}
            fetchConsumeTopicShortcutResourceName={
              fetchConsumeTopicShortcutResourceName
            }
            onFetchConsumeTopicShortcutTopicResourceNameOptions={
              onFetchConsumeTopicShortcutTopicResourceNameOptions
            }
            onFetchProduceTopicShortcutResourceNameOptions={
              onFetchProduceTopicShortcutResourceNameOptions
            }
            fetchConsumeTopicShortcutTopicResourceNameOptions={
              onFetchConsumeTopicShortcutTopicResourceNameOptions
            }
            addedAcls={addedAcls}
            kafkaName={kafkaName}
          />
        </Form>
      )}
    </Modal>
  );
};
