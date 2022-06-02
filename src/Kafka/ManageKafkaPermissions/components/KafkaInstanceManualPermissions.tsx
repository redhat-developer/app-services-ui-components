import { Tbody, Td, Tr } from "@patternfly/react-table";
import { useTranslation } from "react-i18next";
import { ResourceType } from "./ResourceType";
import type { ResourceTypeValue } from "./ResourceType";
import { ResourcePermission } from "./ResourcePermission";
import type { ResourcePermissionValue } from "./ResourcePermission";
import { ResourceOperation } from "./ResourceOperation";
import type { ResourceOperationValue } from "./ResourceOperation";
export type KafkaInstanceManualPermissions = {
  resourceType: ResourceTypeValue | undefined;
  onChangeResourceType: (value: ResourceTypeValue | undefined) => void;
  submitted: boolean;
  resourcePermission: ResourcePermissionValue;
  onChangeResourcePermission: (value: ResourcePermissionValue) => void;
  resourceOperation: ResourceOperationValue | undefined;
  onChangeResourceOperation: (
    value: ResourceOperationValue | undefined
  ) => void;
};

export const KafkaInstanceManualPermissions: React.FC<
  KafkaInstanceManualPermissions
> = ({
  resourceType,
  resourceOperation,
  resourcePermission,
  submitted,
  onChangeResourceOperation,
  onChangeResourcePermission,
  onChangeResourceType,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  return (
    <>
      <Tbody>
        <Tr>
          <Td width={70}>
            <ResourceType
              value={resourceType}
              onChangeValue={onChangeResourceType}
              invalid={submitted && resourceType === undefined ? true : false}
            />
          </Td>

          <Td />
          <Td />

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
              resourceTypeOptions={[
                t("operations.alter"),
                t("operations.describe"),
              ]}
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
