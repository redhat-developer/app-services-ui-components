import { VFC } from "react";
import { useTranslation } from "react-i18next";

import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableVariant,
} from "@patternfly/react-table";

import { RemovableEnhancedAclBinding } from "../types";
import { ResourceCell, PermissionOperationCell, PrincipalCell } from "./Cells";

export type ReviewPermissionsTableProps = {
  acls: RemovableEnhancedAclBinding[];
  onChangeAcls: (acls: RemovableEnhancedAclBinding[]) => void;
  selectedAccountId: string;
  onRemoveAcl: (rowId: string | number) => void;
};

export const ReviewPermissionsTable: VFC<ReviewPermissionsTableProps> = ({
  selectedAccountId,
  acls = [],
  onRemoveAcl,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  const filteredAcls = [
    ...acls.filter((acl: RemovableEnhancedAclBinding) => !acl.removed),
  ];

  if (filteredAcls?.length <= 0) {
    return t("table.no_existing_permissions");
  }

  return (
    <TableComposable variant={TableVariant.compact}>
      <Thead noWrap>
        <Tr>
          <Th width={60}>{t("table.resource_column_title")}</Th>
          <Th width={20}>{t("table.permissions_column_title")}</Th>
          <Th width={20}></Th>
        </Tr>
      </Thead>
      <Tbody>
        {filteredAcls?.map((acl: RemovableEnhancedAclBinding) => {
          const {
            patternType,
            resourceType,
            resourceName,
            operation,
            permission,
            principal,
            hash,
          } = acl;

          return (
            <Tr>
              <Td>
                <ResourceCell
                  patternType={patternType}
                  resourceType={resourceType}
                  resourceName={resourceName}
                />
              </Td>
              <Td>
                <PermissionOperationCell
                  permission={permission}
                  operation={operation}
                />
              </Td>
              <Td>
                <PrincipalCell
                  selectedAccountId={selectedAccountId}
                  principal={principal}
                  rowId={hash()}
                  onRemoveAcl={onRemoveAcl}
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </TableComposable>
  );
};
