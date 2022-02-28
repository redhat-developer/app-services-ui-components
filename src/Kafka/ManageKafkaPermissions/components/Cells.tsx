import { VFC } from "react";
import { useTranslation } from "react-i18next";
import { sentenceCase } from "sentence-case";

import { Label, LabelGroup } from "@patternfly/react-core";

import {
  AclPatternType,
  AclResourceType,
  AclPermissionType,
  AclOperation,
} from "../types";
import { SolidLabel } from "./SolidLabel";
import { RemoveButton } from "../../../shared/RemoveButton";

export const DisplayResourceName: VFC<{ resourceType: AclResourceType }> = ({
  resourceType,
}) => {
  const { t } = useTranslation(["common"]);

  switch (resourceType) {
    case AclResourceType.Group:
      return t("consumer_group");
    case AclResourceType.Topic:
      return t("topic");
    case AclResourceType.Cluster:
      return t("kafka_instance");
    case AclResourceType.TransactionalId:
      return t("transactional_id");
    default:
      return <>{sentenceCase(resourceType)}</>;
  }
};

const PatternType: VFC<{ patternType: AclPatternType }> = ({ patternType }) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  if (patternType === AclPatternType.Prefixed) {
    return t("cells.pattern_type_prefixed");
  } else {
    return t("cells.pattern_type_literal");
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
  if (resourceType === AclResourceType.Cluster) {
    return (
      <>
        <SolidLabel variant={resourceType} />{" "}
        <DisplayResourceName resourceType={resourceType} />
      </>
    );
  }

  return (
    <>
      <SolidLabel variant={resourceType} />{" "}
      <DisplayResourceName resourceType={resourceType} />{" "}
      <PatternType patternType={patternType} /> "{resourceName}"
    </>
  );
};

export type PermissionOperationCellProps = {
  permission: AclPermissionType;
  operation: AclOperation;
};

export const PermissionOperationCell: VFC<PermissionOperationCellProps> = ({
  permission,
  operation,
}) => {
  return (
    <LabelGroup>
      {permission && (
        <Label
          variant="outline"
          color={permission === AclPermissionType.Deny ? "red" : undefined}
        >
          {sentenceCase(permission)}
        </Label>
      )}
      {operation && <Label variant="outline">{sentenceCase(operation)}</Label>}
    </LabelGroup>
  );
};

export type PrincipalCellProps = {
  selectedAccountId: string;
  principal: string;
  rowId: string | number;
  onRemoveAcl: (rowId: string | number) => void;
};

export const PrincipalCell: VFC<PrincipalCellProps> = ({
  selectedAccountId,
  principal,
  rowId,
  onRemoveAcl,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  if (selectedAccountId === "*" && principal === "*") {
    return (
      <div className="pf-u-display-flex pf-u-justify-content-space-between pf-u-justify-content-flex-end-on-lg">
        <Label variant="outline">{t("table.all_accounts")}</Label>
        <RemoveButton
          variant="link"
          row={rowId}
          ToolTipText={t(
            "manage_permissions_dialog.assign_permissions.remove_row_help"
          )}
          onButtonClick={() => onRemoveAcl(rowId)}
        />
      </div>
    );
  } else if (principal === "*") {
    return (
      <div className="pf-u-display-flex pf-u-justify-content-flex-end-on-lg">
        <Label variant="outline">{t("table.all_accounts")}</Label>
      </div>
    );
  }

  return (
    <div className="pf-u-display-flex pf-u-justify-content-flex-end">
      <RemoveButton
        variant="link"
        row={rowId}
        ToolTipText={t(
          "manage_permissions_dialog.assign_permissions.remove_row_help"
        )}
        onButtonClick={() => onRemoveAcl(rowId)}
      />
    </div>
  );
};
