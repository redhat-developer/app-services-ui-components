import { Tbody, Tr, Td } from "@patternfly/react-table";
import { ResourceName } from "./ResourceName";
import { ResourceOperation } from "./ResourceOperation";
import type { ResourceOperationValue } from "./ResourceOperation";
import { ResourcePermission } from "./ResourcePermission";
import type { ResourcePermissionValue } from "./ResourcePermission";
import { ResourcePrefixRule } from "./ResourcePrefixRule";
import type { ResourcePrefixRuleValue } from "./ResourcePrefixRule";
import { ResourceType } from "./ResourceType";
import type { ResourceTypeValue } from "./ResourceType";
import { ShortcutsTableHead } from "./ShortcutsTableHead";
import { useTranslation } from "react-i18next";
import { KafkaInstanceManualPermissions } from "./KafkaInstanceManualPermissions";
import { RemoveButton } from "../../../shared";

export type AssignPermissionsManualProps = {
  resourceType: ResourceTypeValue | undefined;
  onChangeResourceType: (value: ResourceTypeValue | undefined) => void;
  submitted: boolean;
  resourcePrefix: ResourcePrefixRuleValue;
  onChangeResourcePrefix: (value: ResourcePrefixRuleValue) => void;
  resourceName: string | undefined;
  onChangeResource: (value: string | undefined) => void;
  onFetchResourceNameOptions: (filter: string) => string[];
  resourcePermission: ResourcePermissionValue;
  onChangeResourcePermission: (value: ResourcePermissionValue) => void;
  resourceOperation: ResourceOperationValue | undefined;
  onChangeResourceOperation: (
    value: ResourceOperationValue | undefined
  ) => void;
  multipleShorctutPermissions?: boolean;
  row: number;
  onDelete: (row: number) => void;
  setIsNameValid: (value: boolean) => void;
};

export const AssignPermissionsManual: React.FC<
  AssignPermissionsManualProps
> = ({
  resourceType,
  onChangeResourceType,
  submitted,
  resourcePrefix,
  onChangeResourcePrefix,
  resourceName,
  onChangeResource,
  onFetchResourceNameOptions,
  resourcePermission,
  resourceOperation,
  onChangeResourceOperation,
  onChangeResourcePermission,
  multipleShorctutPermissions = true,
  row,
  onDelete,
  setIsNameValid,
}) => {
  const { t } = useTranslation("manage-kafka-permissions");
  const resourceTypeOptions = () => {
    switch (resourceType) {
      case "consumer-group":
        return [
          t("operations.all"),
          t("operations.read"),
          t("operations.delete"),
          t("operations.describe"),
        ];
      case "kafka-instance":
        return [t("operations.alter"), t("operations.describe")];
      case "transactional-id":
        return [
          t("operations.all"),
          t("operations.write"),
          t("operations.describe"),
        ];
      default:
        return [
          t("operations.all"),
          t("operations.read"),
          t("operations.write"),
          t("operations.create"),
          t("operations.delete"),
          t("operations.alter"),
          t("operations.describe"),
          t("operations.describe_configs"),
          t("operations.alter_configs"),
        ];
    }
  };

  return (
    <>
      {!multipleShorctutPermissions ? <ShortcutsTableHead /> : null}
      {resourceType === "kafka-instance" ? (
        <KafkaInstanceManualPermissions
          resourceOperation={resourceOperation}
          resourcePermission={resourcePermission}
          resourceType={resourceType}
          submitted={submitted}
          onChangeResourceOperation={onChangeResourceOperation}
          onChangeResourcePermission={onChangeResourcePermission}
          onChangeResourceType={onChangeResourceType}
          onDelete={onDelete}
          row={row}
        />
      ) : (
        <Tbody>
          <Tr>
            <Td>
              <ResourceType
                value={resourceType}
                onChangeValue={onChangeResourceType}
                invalid={submitted && resourceType === undefined}
              />
            </Td>
            <Td>
              <ResourcePrefixRule
                value={resourcePrefix}
                onChangeValue={onChangeResourcePrefix}
              />
            </Td>
            <Td>
              <ResourceName
                value={resourceName}
                onChangeValue={onChangeResource}
                onFetchOptions={onFetchResourceNameOptions}
                submitted={submitted}
                resourceType={resourceType}
                resourcePrefixRule={resourcePrefix}
                setIsNameValid={setIsNameValid}
              />
            </Td>
            <Td>
              <ResourcePermission
                value={resourcePermission}
                onChangeValue={onChangeResourcePermission}
              />
            </Td>
            <Td>
              <ResourceOperation
                resourceTypeOptions={resourceTypeOptions()}
                value={resourceOperation}
                onChangeValue={onChangeResourceOperation}
                invalid={
                  submitted && resourceOperation === undefined ? true : false
                }
              />
            </Td>
            <Td>
              <RemoveButton
                variant="link"
                onClick={() => onDelete(row)}
                tooltip={t("remove_permission_tooltip")}
                ariaLabel={t("manual_delete")}
              />
            </Td>
          </Tr>
        </Tbody>
      )}
    </>
  );
};
