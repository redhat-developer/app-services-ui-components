import { Popover, Title } from "@patternfly/react-core";
import { Tbody, Td, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { HelpIcon } from "@patternfly/react-icons";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import { DisplayResourceName, PermissionOperationCell } from "./Cells";
import { RemoveButton } from "../../../shared";
import { ShortcutsTableHead } from "./ShortcutsTableHead";

export type ManageAccessShortcutProps = {
  onDelete: (row: number) => void;
  multipleShorctutPermissions?: boolean;
  instanceName: string;
  row: number;
};
export const ManageAccessShortcut: React.FC<ManageAccessShortcutProps> = ({
  onDelete,
  multipleShorctutPermissions = true,
  instanceName,
  row,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  return (
    <>
      {!multipleShorctutPermissions ? <ShortcutsTableHead /> : null}

      <Tbody>
        <Tr style={{ borderBottom: "none" }}>
          <Td colSpan={5}>
            <Title headingLevel="h6">
              {t("permissions_dropdown.shortcut_manage_access")}{" "}
              <Popover
                headerContent={t("permissions_dropdown.shortcut_manage_access")}
                bodyContent={t(
                  "permissions_dropdown.shortcut_manage_access_description"
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
              ariaLabel={t("delete_access")}
            />
          </Td>
        </Tr>

        <Tr>
          <Td colSpan={2}>
            <ResourceTypeLabel variant={"CLUSTER"} />{" "}
            <DisplayResourceName resourceType={"CLUSTER"} />{" "}
            {t("is_kafka_instance", { value: instanceName })}
          </Td>

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
