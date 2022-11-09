import type { VFC } from "react";
import { useTranslation } from "react-i18next";

import {
  TableComposable,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

import type { AclBinding } from "../types";
import { PermissionOperationCell, PrincipalCell, ResourceCell } from "./Cells";

export type ReviewPermissionsTableProps = {
  acls: AclBinding[];
  selectedAccountId: string;
  onRemoveAcl: (idx: number) => void;
};

export const ReviewPermissionsTable: VFC<ReviewPermissionsTableProps> = ({
  selectedAccountId,
  acls = [],
  onRemoveAcl,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  return (
    <TableComposable variant={TableVariant.compact}>
      <Thead noWrap>
        <Tr>
          <Th width={60}>{t("table.resource_column_title")}</Th>
          <Th width={20}>{t("table.permissions_column_title")}</Th>
          <Th width={20} />
        </Tr>
      </Thead>
      <Tbody>
        {acls.map((acl, idx) => {
          const {
            patternType,
            resourceType,
            resourceName,
            operation,
            permission,
            principal,
          } = acl;
          const isDeleteEnabled =
            selectedAccountId === "*" ||
            principal === `User:${selectedAccountId}` ||
            principal === `User:*`;
          const isAllAccounts = principal === "User:*";

          return (
            <Tr key={idx}>
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
                  isDeleteEnabled={isDeleteEnabled}
                  isAllAccounts={isAllAccounts}
                  onRemoveAcl={() => onRemoveAcl(idx)}
                />
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </TableComposable>
  );
};
