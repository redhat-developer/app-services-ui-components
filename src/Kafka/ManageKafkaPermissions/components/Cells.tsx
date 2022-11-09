import type { VFC } from "react";
import { useTranslation } from "react-i18next";

import { Label, LabelGroup } from "@patternfly/react-core";

import type {
  AclOperation,
  AclPatternType,
  AclPermissionType,
  AclResourceType,
} from "../types";
import { ResourceTypeLabel } from "./ResourceTypeLabel";
import { RemoveButton } from "../../../shared";

export const DisplayResourceName: VFC<{ resourceType: AclResourceType }> = ({
  resourceType,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  switch (resourceType) {
    case "GROUP":
      return t("resourceTypes.consumer_group");
    case "TOPIC":
      return t("resourceTypes.topic");
    case "CLUSTER":
      return t("resourceTypes.kafka_instance");
    case "TRANSACTIONAL_ID":
      return t("resourceTypes.transactional_id");
  }
};

const PatternType: VFC<{ patternType: AclPatternType }> = ({ patternType }) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  if (patternType === "PREFIXED") {
    return t("pattern_type_prefixed");
  } else {
    return t("pattern_type_literal");
  }
};

export type ResourceCellProps = {
  resourceType: AclResourceType;
  patternType: AclPatternType;
  resourceName: string;
};

export const ResourceCell: VFC<ResourceCellProps> = ({
  resourceType,
  patternType,
  resourceName,
}) => {
  if (resourceType === "CLUSTER") {
    return (
      <>
        <ResourceTypeLabel variant={resourceType} />{" "}
        <DisplayResourceName resourceType={resourceType} />
      </>
    );
  }

  return (
    <>
      <ResourceTypeLabel variant={resourceType} />{" "}
      <DisplayResourceName resourceType={resourceType} />{" "}
      <PatternType patternType={patternType} /> "{resourceName}"
    </>
  );
};

export type PermissionOperationCellProps = {
  permission: AclPermissionType;
  operation: AclOperation | AclOperation[];
};

export const PermissionOperationCell: VFC<PermissionOperationCellProps> = ({
  permission,
  operation,
}) => {
  const { t } = useTranslation("manage-kafka-permissions");
  const permissions: { [key in AclPermissionType]: string } = {
    ALLOW: t("permissions.allow"),
    DENY: t("permissions.deny"),
  };
  const operations: { [key in AclOperation]: string } = {
    ALL: t("operations.all"),
    READ: t("operations.read"),
    WRITE: t("operations.write"),
    CREATE: t("operations.create"),
    DELETE: t("operations.delete"),
    ALTER: t("operations.alter"),
    DESCRIBE: t("operations.describe"),
    DESCRIBE_CONFIGS: t("operations.describe_configs"),
    ALTER_CONFIGS: t("operations.alter_configs"),
  };
  return (
    <LabelGroup>
      {permission && (
        <Label
          variant="outline"
          color={permission === "DENY" ? "red" : undefined}
        >
          {permissions[permission]}
        </Label>
      )}
      {Array.isArray(operation) ? (
        operation.map((value, key) => (
          <Label key={key} variant="outline">
            {operations[value]}
          </Label>
        ))
      ) : (
        <Label variant="outline">{operations[operation]}</Label>
      )}
    </LabelGroup>
  );
};

export type PrincipalCellProps = {
  isDeleteEnabled: boolean;
  isAllAccounts: boolean;
  onRemoveAcl: () => void;
};

export const PrincipalCell: VFC<PrincipalCellProps> = ({
  isDeleteEnabled,
  isAllAccounts,
  onRemoveAcl,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  return (
    <div className="pf-u-display-flex pf-u-justify-content-space-between pf-u-justify-content-flex-end-on-lg">
      {isAllAccounts && (
        <Label variant="outline">{t("table.all_accounts")}</Label>
      )}
      {isDeleteEnabled && (
        <RemoveButton
          variant="link"
          tooltip={t("remove_permission_tooltip")}
          onClick={onRemoveAcl}
          ariaLabel={t("operations.delete")}
        />
      )}
    </div>
  );
};
