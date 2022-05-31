import { Tbody, Tr, Td } from "@patternfly/react-table";
import { ResourceName } from "./ResourceName";
import { ResourceOperation, ResourceOperationValue } from "./ResourceOperation";
import {
  ResourcePermission,
  ResourcePermissionValue,
} from "./ResourcePermission";
import {
  ResourcePrefixRule,
  ResourcePrefixRuleValue,
} from "./ResourcePrefixRule";
import { ResourceType, ResourceTypeValue } from "./ResourceType";
import { ShortcutsTableHead } from "./ShortcutsTableHead";
import { useTranslation } from "react-i18next";
import { KafkaInstanceManualPermissions } from "./KafkaInstanceManualPermissions";

export type AssignPermissionsManualProps = {
  resourceType: ResourceTypeValue | undefined;
  onChangeResourceType: (value: ResourceTypeValue | undefined) => void;
  submitted: boolean;
  resourcePrefix: ResourcePrefixRuleValue;
  onChangeResourcePrefix: (value: ResourcePrefixRuleValue) => void;
  resourceName: string | undefined;
  onChangeResource: (value: string | undefined) => void;
  onFetchResourceNameOptions: (filter: string) => Promise<string[]>;
  resourcePermission: ResourcePermissionValue;
  onChangeResourcePermission: (value: ResourcePermissionValue) => void;
  resourceOperation: ResourceOperationValue | undefined;
  onChangeResourceOperation: (
    value: ResourceOperationValue | undefined
  ) => void;
  multipleShorctutPermissions?: boolean;
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
  multipleShorctutPermissions = false,
}) => {
  const { t } = useTranslation("manage-kafka-permissions");
  const resourceTypeOptions = () => {
    if (resourceType === undefined)
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
        />
      ) : (
        <Tbody>
          <Tr>
            <Td>
              <ResourceType
                value={resourceType}
                onChangeValue={onChangeResourceType}
                invalid={submitted && resourceType === undefined ? true : false}
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
          </Tr>
        </Tbody>
      )}
    </>
  );
};
