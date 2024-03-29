import { Popover, Title } from "@patternfly/react-core";
import { Tbody, Td, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { HelpIcon } from "@patternfly/react-icons";
import type { ResourcePrefixRuleValue } from "./ResourcePrefixRule";
import { RemoveButton } from "../../../shared";
import { ShortcutsTableHead } from "./ShortcutsTableHead";

import { ProduceTopicRow } from "./ProduceTopicRow";

export type ProduceTopicShortcutProps = {
  onChange: (value: ResourcePrefixRuleValue) => void;
  prefixRuleValue: ResourcePrefixRuleValue;
  resourceNameValue: string | undefined;
  onChangeResourceName: (value: string | undefined) => void;
  onFetchResourceNameOptions: (filter: string) => string[];
  submitted: boolean;
  onDelete: (row: number) => void;
  multipleShorctutPermissions?: boolean;
  row: number;
  setIsNameValid: (value: boolean) => void;
};
export const ProduceTopicShortcut: React.FC<ProduceTopicShortcutProps> = ({
  onChange,
  onDelete,
  prefixRuleValue,
  onChangeResourceName,
  resourceNameValue,
  submitted,
  onFetchResourceNameOptions,
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
              {t("permissions_dropdown.shortcut_produce_topic")}{" "}
              <Popover
                headerContent={t("permissions_dropdown.shortcut_produce_topic")}
                bodyContent={t(
                  "permissions_dropdown.shortcut_produce_topic_description"
                )}
              >
                <button
                  type="button"
                  onClick={(e) => e.preventDefault()}
                  className="pf-c-form__group-label-help"
                >
                  <HelpIcon noVerticalAlign />
                </button>
              </Popover>
            </Title>
          </Td>
          <Td>
            <RemoveButton
              variant="link"
              onClick={() => onDelete(row)}
              tooltip={t("remove_permission_tooltip")}
              ariaLabel={t("delete_producer")}
            />
          </Td>
        </Tr>

        <ProduceTopicRow
          onChange={onChange}
          prefixRuleValue={prefixRuleValue}
          resourceNameValue={resourceNameValue}
          onChangeResourceName={onChangeResourceName}
          onFetchResourceNameOptions={onFetchResourceNameOptions}
          submitted={submitted}
          setIsNameValid={setIsNameValid}
        />
      </Tbody>
    </>
  );
};
