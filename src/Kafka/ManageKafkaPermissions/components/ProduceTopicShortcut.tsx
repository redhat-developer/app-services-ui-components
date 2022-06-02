import { Flex, FlexItem, Popover, Title } from "@patternfly/react-core";
import { Tbody, Td, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import type { ResourcePrefixRuleValue } from "./ResourcePrefixRule";
import { RemoveButton } from "../../../shared";
import { ShortcutsTableHead } from "./ShortcutsTableHead";

import { ProduceTopicRow } from "./ProduceTopicRow";

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
    <>
      {!multipleShorctutPermissions ? <ShortcutsTableHead /> : null}

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

        <ProduceTopicRow
          onChange={onChange}
          prefixRuleValue={prefixRuleValue}
          resourceNameValue={resourceNameValue}
          onChangeResourceName={onChangeResourceName}
          onFetchResourceNameOptions={onFetchResourceNameOptions}
          submitted={submitted}
        />
      </Tbody>
    </>
  );
};
