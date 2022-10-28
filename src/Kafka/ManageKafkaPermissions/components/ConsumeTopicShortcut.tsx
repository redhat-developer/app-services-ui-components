import { Popover, Title } from "@patternfly/react-core";
import { Tbody, Td, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import { ResourcePrefixRule } from "./ResourcePrefixRule";
import type { ResourcePrefixRuleValue } from "./ResourcePrefixRule";

import { ResourceName } from "./ResourceName";
import { DisplayResourceName, PermissionOperationCell } from "./Cells";
import { ProduceTopicRow } from "./ProduceTopicRow";
import { ShortcutsTableHead } from "./ShortcutsTableHead";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import { RemoveButton } from "../../../shared/RemoveButton";

export type ConsumeTopicShortcutProps = {
  onChangeConsumerResourcePrefixRule: (value: ResourcePrefixRuleValue) => void;
  onChangeTopicResourcePrefixRule: (value: ResourcePrefixRuleValue) => void;
  consumerPrefixRuleValue: ResourcePrefixRuleValue;
  topicPrefixRuleValue: ResourcePrefixRuleValue;
  consumerResourceNameValue: string | undefined;
  topicResourceNameValue: string | undefined;
  onChangeConsumerResourceName: (value: string | undefined) => void;
  onChangeTopicResourceName: (value: string | undefined) => void;
  onFetchConsumerResourceNameOptions: (filter: string) => Promise<string[]>;
  onFetchTopicResourceNameOptions: (filter: string) => Promise<string[]>;
  submitted: boolean;
  multipleShorctutPermissions?: boolean;
  onDelete: (row: number) => void;
  row: number;
  setIsNameValid: (value: boolean) => void;
};
export const ConsumeTopicShortcut: React.FC<ConsumeTopicShortcutProps> = ({
  onChangeConsumerResourceName,
  topicPrefixRuleValue,
  topicResourceNameValue,
  consumerPrefixRuleValue,
  consumerResourceNameValue,
  submitted,
  onChangeConsumerResourcePrefixRule,
  onChangeTopicResourceName,
  onChangeTopicResourcePrefixRule,
  onFetchConsumerResourceNameOptions,
  onFetchTopicResourceNameOptions,
  onDelete,
  multipleShorctutPermissions = true,
  row,
  setIsNameValid,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  return (
    <>
      {!multipleShorctutPermissions ? <ShortcutsTableHead /> : null}

      <Tbody>
        <Tr style={{ borderBottom: "none" }}>
          <Td colSpan={5}>
            <Title headingLevel="h6">
              {t("permissions_dropdown.shortcut_consume_topic")}{" "}
              <Popover
                headerContent={t("permissions_dropdown.shortcut_consume_topic")}
                bodyContent={t(
                  "permissions_dropdown.shortcut_consume_topic_description"
                )}
              >
                <OutlinedQuestionCircleIcon />
              </Popover>
            </Title>
          </Td>

          <Td>
            <RemoveButton
              variant="link"
              onClick={() => onDelete(row)}
              tooltip={t("operations.delete")}
            />
          </Td>
        </Tr>
        <ProduceTopicRow
          setIsNameValid={setIsNameValid}
          isConsumeTopicShortcut={true}
          onChange={onChangeTopicResourcePrefixRule}
          prefixRuleValue={topicPrefixRuleValue}
          resourceNameValue={topicResourceNameValue}
          onChangeResourceName={onChangeTopicResourceName}
          onFetchResourceNameOptions={onFetchTopicResourceNameOptions}
          submitted={submitted}
        />
        <Tr>
          <Td>
            {" "}
            <ResourceTypeLabel variant={"GROUP"} />{" "}
            <DisplayResourceName resourceType={"GROUP"} />{" "}
          </Td>
          <Td>
            <ResourcePrefixRule
              value={consumerPrefixRuleValue}
              onChangeValue={onChangeConsumerResourcePrefixRule}
            />
          </Td>
          <Td>
            {
              <ResourceName
                value={consumerResourceNameValue}
                onChangeValue={onChangeConsumerResourceName}
                onFetchOptions={onFetchConsumerResourceNameOptions}
                submitted={submitted}
                resourceType={"topic"}
                resourcePrefixRule={consumerPrefixRuleValue}
                setIsNameValid={setIsNameValid}
              />
            }
          </Td>
          <Td>
            <PermissionOperationCell
              permission={"ALLOW"}
              operation={["READ"]}
            />
          </Td>
        </Tr>
      </Tbody>
    </>
  );
};
