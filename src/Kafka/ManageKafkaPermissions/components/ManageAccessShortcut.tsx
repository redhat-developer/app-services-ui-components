import { Flex, FlexItem, Popover, Title } from "@patternfly/react-core";
import { Tbody, Td, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import { DisplayResourceName, PermissionOperationCell } from "./Cells";
import { RemoveButton } from "../../../shared";
import { ShortcutsTableHead } from "./ShortcutsTableHead";

export type ManageAccessShortcutProps = {
  onDelete: () => void;
  multipleShorctutPermissions?: boolean;
  instanceName: string;
};
export const ManageAccessShortcut: React.FC<ManageAccessShortcutProps> = ({
  onDelete,
  multipleShorctutPermissions = true,
  instanceName,
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
                  {t("permissions_dropdown.shortcut_manage_access")}
                </Title>
              </FlexItem>
              <FlexItem>
                <Popover
                  headerContent={t(
                    "permissions_dropdown.shortcut_manage_access"
                  )}
                  bodyContent={t(
                    "permissions_dropdown.shortcut_manage_access_description"
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
          <Td>
            <ResourceTypeLabel variant={"CLUSTER"} />{" "}
            <DisplayResourceName resourceType={"CLUSTER"} />{" "}
            {t("is_kafka_instane", instanceName)}
          </Td>

          <Td />
          <Td />

          <Td>
            <PermissionOperationCell
              permission={"ALLOW"}
              operation={["ALTER"]}
            />
          </Td>
        </Tr>
      </Tbody>
    </>
  );
};
