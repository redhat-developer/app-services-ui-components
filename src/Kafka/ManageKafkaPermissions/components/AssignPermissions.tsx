import { ActionList, ActionListItem } from "@patternfly/react-core";
import { TableComposable } from "@patternfly/react-table";
import { PermissionsDropdown } from ".";
import { AddAclType} from "../types";
import { AssignPermissionsManual } from "./AssignPermissionsManual";
import { ConsumeTopicShortcut } from "./ConsumeTopicShortcut";
import { ManageAccessShortcut } from "./ManageAccessShortcut";
import { ProduceTopicShortcut } from "./ProduceTopicShortcut";
import { ShortcutsTableHead } from "./ShortcutsTableHead";

export type AssignPermissionsProps = {
  submitted: boolean;
  resourceNameOptions: (filter: string) => Promise<string[]>;
  onDelete: (index: number) => void;
  fetchConsumeTopicShortcutResourceName: (filter: string) => Promise<string[]>;
  onFetchConsumeTopicShortcutTopicResourceNameOptions: (
    filter: string
  ) => Promise<string[]>;
  onFetchProduceTopicShortcutResourceNameOptions: (
    filter: string
  ) => Promise<string[]>;
  fetchConsumeTopicShortcutTopicResourceNameOptions: (
    filter: string
  ) => Promise<string[]>;
  addedAcls: AddAclType[];
  onAddManualPermissions: () => void;
  onAddProduceTopicShortcut: () => void;
  onConsumeTopicShortcut: () => void;
  onManageAccessShortcut: () => void;
  kafkaName:string
};

export const AssignPermissions: React.VFC<AssignPermissionsProps> = ({
  resourceNameOptions,
  submitted,
  onDelete,
  fetchConsumeTopicShortcutResourceName,
  onFetchConsumeTopicShortcutTopicResourceNameOptions,
  onFetchProduceTopicShortcutResourceNameOptions,
  onAddManualPermissions,
  onAddProduceTopicShortcut,
  onConsumeTopicShortcut,
  onManageAccessShortcut,
  addedAcls,
  kafkaName

  //addedAcls
}) => {
  //const addedAcls: AddAclType[] = [];

  const onAddPermission = () => {
    addedAcls.map((aclTemplate, idx) => {
      switch (aclTemplate.type) {
        case "manual":
          return (
            <AssignPermissionsManual
              resourceType={aclTemplate.resourceType}
              onChangeResourceType={(value) =>
                (aclTemplate.resourceType = value)
              }
              submitted={submitted}
              resourcePrefix={aclTemplate.resourcePrefix}
              onChangeResourcePrefix={(value) =>
                (aclTemplate.resourcePrefix = value)
              }
              resourceName={aclTemplate.resourceName}
              onChangeResource={(value) => (aclTemplate.resourceName = value)}
              onFetchResourceNameOptions={resourceNameOptions}
              resourcePermission={aclTemplate.resourcePermission}
              onChangeResourcePermission={(value) =>
                (aclTemplate.resourcePermission = value)
              }
              resourceOperation={aclTemplate.resourceOperation}
              onChangeResourceOperation={(value) =>
                (aclTemplate.resourceOperation = value)
              }
              row={idx}
              onDelete={onDelete}
            />
          );

        case "consume-topic":
          return (
            <ConsumeTopicShortcut
              onChangeConsumerResourcePrefixRule={(value) =>
                (aclTemplate.consumerResourcePrefixRule = value)
              }
              onChangeTopicResourcePrefixRule={(value) =>
                (aclTemplate.topicResourcePrefixRule = value)
              }
              consumerPrefixRuleValue={aclTemplate.consumerResourcePrefixRule}
              topicPrefixRuleValue={aclTemplate.topicResourcePrefixRule}
              consumerResourceNameValue={aclTemplate.consumerResourceName}
              topicResourceNameValue={aclTemplate.topicResourceName}
              onChangeConsumerResourceName={(value) =>
                (aclTemplate.consumerResourceName = value)
              }
              onChangeTopicResourceName={(value) =>
                (aclTemplate.topicResourceName = value)
              }
              onFetchConsumerResourceNameOptions={
                fetchConsumeTopicShortcutResourceName
              }
              onFetchTopicResourceNameOptions={
                onFetchConsumeTopicShortcutTopicResourceNameOptions
              }
              submitted={submitted}
              onDelete={onDelete}
              row={idx}
            />
          );

        case "produce-topic":
          return (
            <ProduceTopicShortcut
              onChange={(value) => (aclTemplate.prefixRuleValue = value)}
              prefixRuleValue={aclTemplate.prefixRuleValue}
              resourceNameValue={aclTemplate.resourceNameValue}
              onChangeResourceName={(value) =>
                (aclTemplate.resourceNameValue = value)
              }
              onFetchResourceNameOptions={
                onFetchProduceTopicShortcutResourceNameOptions
              }
              submitted={submitted}
              onDelete={onDelete}
              row={idx}
            />
          );

        case "manage-access":
          return (
            <ManageAccessShortcut
              rowIndex={idx}
              instanceName={kafkaName}
              onDelete={onDelete}
            />
          );
      }
    });
  };

  return (
    <>
      <TableComposable variant="compact">
        <ShortcutsTableHead />
        {onAddPermission}
      </TableComposable>
      <ActionList>
        <ActionListItem>
          <PermissionsDropdown
            onAddPermission={onAddManualPermissions}
            onShortcutConsumeTopic={onConsumeTopicShortcut}
            onShortcutProduceTopic={onAddProduceTopicShortcut}
            onShortcutManageAccess={onManageAccessShortcut}
          />
        </ActionListItem>
      </ActionList>
    </>
  );
};
