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
  return (
    <>
      {!multipleShorctutPermissions ? <ShortcutsTableHead /> : null}
      <Tbody>
        <Tr style={{ borderBottom: "none" }}>
          <Td>
            <ResourceType
              value={resourceType}
              onChangeValue={onChangeResourceType}
              invalid={submitted && resourceType === undefined ? true : false}
            />
          </Td>
          {resourceType === "kafka-instance" ? (
            <>
              <Td />
              <Td />
            </>
          ) : (
            <>
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
            </>
          )}
          <Td>
            <ResourcePermission
              value={resourcePermission}
              onChangeValue={onChangeResourcePermission}
            />
          </Td>
          <Td>
            <ResourceOperation
              value={resourceOperation}
              onChangeValue={onChangeResourceOperation}
              invalid={
                submitted && resourceOperation === undefined ? true : false
              }
            />
          </Td>
        </Tr>
      </Tbody>
    </>
  );
};
