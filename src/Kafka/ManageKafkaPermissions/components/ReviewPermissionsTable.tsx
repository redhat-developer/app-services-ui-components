import { VFC } from "react";
import { useTranslation } from "react-i18next";

import {
  TableHeader,
  Table,
  TableBody,
  TableVariant,
  ICell,
  cellWidth,
} from "@patternfly/react-table";
import { Label, Button, Tooltip } from "@patternfly/react-core";

import TrashIcon from "@patternfly/react-icons/dist/js/icons/trash-icon";
import { EnhancedAclBinding } from "../types";
import { resourceCell, permissionOperationCell, CellBuilder } from "./Cells";

export type ReviewPermissionsTableProps = {
  acls: RemovableEnhancedAclBinding[];
  onChangeAcls: (acls: RemovableEnhancedAclBinding[] | []) => void;
  selectedAccountId?: string;
  onRemoveAcl: (acl: RemovableEnhancedAclBinding) => void;
};

export type RemovableEnhancedAclBinding = EnhancedAclBinding & {
  removed: boolean;
  index: number;
};

export const ReviewPermissionsTable: VFC<ReviewPermissionsTableProps> = ({
  selectedAccountId,
  acls = [],
  onRemoveAcl,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  if (selectedAccountId === undefined || acls.length === 0) {
    return <></>;
  }

  const principalCell: CellBuilder<RemovableEnhancedAclBinding> = (acl) => {
    const renderRemoveButton = () => (
      <Tooltip
        content={t(
          "manage_permissions_dialog.assign_permissions.remove_row_help"
        )}
      >
        <Button
          variant="link"
          icon={<TrashIcon />}
          onClick={() => onRemoveAcl(acl)}
        />
      </Tooltip>
    );

    const renderAllAccountsLabel = () => (
      <Label variant="outline">{t("table.all_accounts")}</Label>
    );

    if (selectedAccountId === "*" && acl.principal === "*") {
      return {
        title: (
          <div className="pf-u-display-flex pf-u-justify-content-space-between pf-u-justify-content-flex-end-on-lg">
            {renderAllAccountsLabel()} {renderRemoveButton()}
          </div>
        ),
        props: {},
      };
    } else if (acl.principal === "*") {
      return {
        title: (
          <div className="pf-u-display-flex pf-u-justify-content-flex-end-on-lg">
            {renderAllAccountsLabel()}
          </div>
        ),
        props: {},
      };
    } else {
      return {
        title: (
          <div className="pf-u-display-flex pf-u-justify-content-flex-end">
            {renderRemoveButton()}
          </div>
        ),
        props: {},
      };
    }
  };

  const cells = [resourceCell, permissionOperationCell, principalCell];

  const tableColumns = [
    {
      title: t("table.resource_column_title"),
      columnTransforms: [cellWidth(60)],
    },
    {
      title: t("table.permissions_column_title"),
      columnTransforms: [cellWidth(20)],
    },
    {
      title: "",
      columnTransforms: [cellWidth(20)],
    },
  ] as ICell[];

  const rows = [
    ...acls
      .filter((acl: RemovableEnhancedAclBinding) => !acl.removed)
      .map((item, row) => {
        return {
          cells: cells.map((f) => f(item, row)),
          originalData: item,
        };
      }),
  ];

  return (
    <Table
      cells={tableColumns}
      rows={rows}
      variant={TableVariant.compact}
      canSelectAll={false}
    >
      <TableHeader />
      <TableBody />
    </Table>
  );
};
