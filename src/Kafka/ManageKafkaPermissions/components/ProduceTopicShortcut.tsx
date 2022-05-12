import { Flex, FlexItem, Popover, Title } from "@patternfly/react-core";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import {
  ResourcePrefixRule,
  ResourcePrefixRuleValue,
} from "./ResourcePrefixRule";
import { ResourceName } from "./ResourceName";
import { DisplayResourceName, PermissionOperationCell } from "./Cells";
import { RemoveButton } from "../../../shared";

export type ProduceTopicShortcutProps = {
  onChange: (value: string) => void;
  prefixRuleValue: ResourcePrefixRuleValue;
  resourceNameValue: string | undefined;
  onChangeResourceName: (value: string | undefined) => void;
  onFetchResourceNameOptions: (filter: string) => Promise<string[]>;
  submitted: boolean;
  onDelete: () => void;
  multipleShorctutPermissions?: boolean;
};
export const ProduceTopicShortcut: React.FC<ProduceTopicShortcutProps> = ({
  onChange,
  onDelete,
  prefixRuleValue,
  onChangeResourceName,
  resourceNameValue,
  submitted,
  onFetchResourceNameOptions,
  multipleShorctutPermissions = false,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  return (
    <TableComposable variant="compact">
      {!multipleShorctutPermissions ? (
        <Thead noWrap>
          <Tr>
            <Th>Resource</Th>
            <Th />
            <Th />
            <Th>Permission</Th>
          </Tr>
        </Thead>
      ) : null}

      <Tbody>
        <Tr style={{ borderBottom: "none" }}>
          <Td>
            <Flex>
              <FlexItem>
                <Title headingLevel="h6">
                  {t("permissions_dropdown.shortcut_produce_topic")}
                </Title>
              </FlexItem>
              <FlexItem>
                <Popover
                  headerContent={t(
                    "permissions_dropdown.shortcut_produce_topic"
                  )}
                  bodyContent={t(
                    "permissions_dropdown.shortcut_produce_topic_description"
                  )}
                >
                  <OutlinedQuestionCircleIcon />
                </Popover>
              </FlexItem>
            </Flex>
          </Td>
          <Td />
          <Td />
          <Td />
          <Td>
            <Flex>
              <FlexItem>
                <RemoveButton
                  variant="link"
                  onClick={onDelete}
                  tooltip={"Delete"}
                />
              </FlexItem>
            </Flex>
          </Td>
        </Tr>

        <Tr>
          <Td width={20}>
            {" "}
            <ResourceTypeLabel variant={"TOPIC"} />{" "}
            <DisplayResourceName resourceType={"TOPIC"} />{" "}
          </Td>
          <Td width={15}>
            {
              <ResourcePrefixRule
                value={prefixRuleValue}
                onChangeValue={onChange}
              />
            }
          </Td>
          <Td width={15}>
            <ResourceName
              value={resourceNameValue}
              onChangeValue={onChangeResourceName}
              onFetchOptions={onFetchResourceNameOptions}
              submitted={submitted}
              resourceType={"topic"}
              resourcePrefixRule={prefixRuleValue}
            />
          </Td>
          <Td width={50}>
            <PermissionOperationCell
              permission={"ALLOW"}
              operation={["WRITE", "CREATE", "DESCRIBE"]}
            />
          </Td>
        </Tr>
      </Tbody>
    </TableComposable>
  );
};
