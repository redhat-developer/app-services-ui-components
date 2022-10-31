import { ActionList, ActionListItem } from "@patternfly/react-core";
import { TableComposable } from "@patternfly/react-table";
import { PermissionsDropdown } from "./PermissionsDropdown";
import type { AddAclType } from "../types";
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
  addedAcls?: AddAclType[];
  onAddManualPermissions: () => void;
  onAddProduceTopicShortcut: () => void;
  onConsumeTopicShortcut: () => void;
  onManageAccessShortcut: () => void;
  kafkaName: string;
  setAddedAcls: (value: AddAclType[]) => void;
  setIsNameValid: (value: boolean) => void;
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
  kafkaName,
  setAddedAcls,
  setIsNameValid,
}) => {
  return (
    <>
      <TableComposable variant="compact">
        {addedAcls && addedAcls.length > 0 && <ShortcutsTableHead />}
        {addedAcls &&
          addedAcls.map((aclTemplate, idx) => {
            switch (aclTemplate.type) {
              case "manual":
                return (
                  <AssignPermissionsManual
                    setIsNameValid={setIsNameValid}
                    resourceType={aclTemplate.resourceType}
                    onChangeResourceType={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return { ...resourceValues, resourceType: value };
                        })
                      )
                    }
                    submitted={submitted}
                    resourcePrefix={aclTemplate.resourcePrefix}
                    onChangeResourcePrefix={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return { ...resourceValues, resourcePrefix: value };
                        })
                      )
                    }
                    resourceName={aclTemplate.resourceName}
                    onChangeResource={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return { ...resourceValues, resourceName: value };
                        })
                      )
                    }
                    onFetchResourceNameOptions={resourceNameOptions}
                    resourcePermission={aclTemplate.resourcePermission}
                    onChangeResourcePermission={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return {
                            ...resourceValues,
                            resourcePermission: value,
                          };
                        })
                      )
                    }
                    resourceOperation={aclTemplate.resourceOperation}
                    onChangeResourceOperation={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return {
                            ...resourceValues,
                            resourceOperation: value,
                          };
                        })
                      )
                    }
                    row={idx}
                    onDelete={onDelete}
                  />
                );

              case "consume-topic":
                return (
                  <ConsumeTopicShortcut
                    setIsNameValid={setIsNameValid}
                    onChangeConsumerResourcePrefixRule={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return {
                            ...resourceValues,
                            consumerResourcePrefixRule: value,
                          };
                        })
                      )
                    }
                    onChangeTopicResourcePrefixRule={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return {
                            ...resourceValues,
                            topicResourcePrefixRule: value,
                          };
                        })
                      )
                    }
                    consumerPrefixRuleValue={
                      aclTemplate.consumerResourcePrefixRule
                    }
                    topicPrefixRuleValue={aclTemplate.topicResourcePrefixRule}
                    consumerResourceNameValue={aclTemplate.consumerResourceName}
                    topicResourceNameValue={aclTemplate.topicResourceName}
                    onChangeConsumerResourceName={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return {
                            ...resourceValues,
                            consumerResourceName: value,
                          };
                        })
                      )
                    }
                    onChangeTopicResourceName={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return {
                            ...resourceValues,
                            topicResourceName: value,
                          };
                        })
                      )
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
                    setIsNameValid={setIsNameValid}
                    onChange={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return { ...resourceValues, prefixRuleValue: value };
                        })
                      )
                    }
                    prefixRuleValue={aclTemplate.prefixRuleValue}
                    resourceNameValue={aclTemplate.resourceNameValue}
                    onChangeResourceName={(value) =>
                      setAddedAcls(
                        [...addedAcls].map((resourceValues) => {
                          return {
                            ...resourceValues,
                            resourceNameValue: value,
                          };
                        })
                      )
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
                    row={idx}
                    instanceName={kafkaName}
                    onDelete={onDelete}
                  />
                );
            }
          })}
      </TableComposable>
      <ActionList>
        <ActionListItem style={{ paddingTop: "20px" }}>
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
