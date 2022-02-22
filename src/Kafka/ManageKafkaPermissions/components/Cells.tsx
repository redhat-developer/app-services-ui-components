import { useTranslation } from "react-i18next";
import { sentenceCase } from "sentence-case";

import { Label, LabelGroup } from "@patternfly/react-core";
import { ICell } from "@patternfly/react-table";

import {
  EnhancedAclBinding,
  AclPatternType,
  AclResourceType,
  AclPermissionType,
} from "../types";
import { SolidLabel } from "./SolidLabel";
import { displayName } from "../utils";

export type CellBuilder<T extends EnhancedAclBinding> = (
  item: T,
  row: number
) => ICell | string;

export const resourceCell: CellBuilder<EnhancedAclBinding> = (item) => {
  const PatternType: React.FunctionComponent = () => {
    const { t } = useTranslation(["manage-kafka-permissions"]);
    if (item.patternType === AclPatternType.Prefixed) {
      return t("cells.pattern_type_prefixed");
    } else {
      return t("cells.pattern_type_literal");
    }
  };
  if (item.resourceType === AclResourceType.Cluster) {
    return {
      title: (
        <div>
          <SolidLabel variant={item.resourceType} />{" "}
          {displayName(item.resourceType)}
        </div>
      ),
    };
  } else {
    return {
      title: (
        <div>
          <SolidLabel variant={item.resourceType} />{" "}
          {displayName(item.resourceType)} <PatternType /> "{item.resourceName}"
        </div>
      ),
    };
  }
};

export const permissionOperationCell: CellBuilder<EnhancedAclBinding> = (
  item
) => {
  return {
    title: (
      <LabelGroup>
        {item.permission && (
          <Label
            variant="outline"
            color={
              item.permission === AclPermissionType.Deny ? "red" : undefined
            }
          >
            {sentenceCase(item.permission)}
          </Label>
        )}
        {item.operation && (
          <Label variant="outline">{sentenceCase(item.operation)}</Label>
        )}
      </LabelGroup>
    ),
    props: {},
  } as ICell;
};
