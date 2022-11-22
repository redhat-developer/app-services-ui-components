import {
  Button,
  DropdownGroup,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import { parseISO } from "date-fns";
import { Trans, useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import type { TableViewProps } from "../../../shared";
import { FormatDate, TableView } from "../../../shared";
import { KafkaInstanceStatus } from "../../KafkaInstanceStatus";
import type { KafkaInstance, SimplifiedStatus } from "../../types";
import { DeletingStatuses } from "../../types";
import { useKafkaLabels } from "../../useKafkaLabels";
import type { EmptyStateNoInstancesProps } from "./EmptyStateNoInstances";
import { EmptyStateNoInstances } from "./EmptyStateNoInstances";
import type { EmptyStateNoResultsProps } from "./EmptyStateNoResults";
import { EmptyStateNoResults } from "./EmptyStateNoResults";

export const Columns = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
  "status",
] as const;

export type InstancesTableProps<T extends KafkaInstance> = {
  instances: Array<T> | undefined | null;
  getUrlForInstance: (row: T) => string;
  names: string[];
  owners: string[];
  statuses: string[];
  onCreate: () => void;
  onSearchName: (value: string) => void;
  onRemoveNameChip: (value: string) => void;
  onRemoveNameChips: () => void;
  onSearchOwner: (value: string) => void;
  onRemoveOwnerChip: (value: string) => void;
  onRemoveOwnerChips: () => void;
  onSearchStatus: (value: SimplifiedStatus) => void;
  onRemoveStatusChip: (value: SimplifiedStatus) => void;
  onRemoveStatusChips: () => void;
  onDetails: (row: T) => void;
  onConnection: (row: T) => void;
  canChangeOwner: (row: T) => boolean;
  onChangeOwner: (row: T) => void;
  canDelete: (row: T) => boolean;
  onDelete: (row: T) => void;
  onClickConnectionTabLink: (row: T) => void;
  onClickSupportLink: () => void;
  onInstanceLinkClick: (row: T) => void;
  canHaveInstanceLink: (row: T) => boolean;
  canOpenConnection: (row: T) => boolean;
} & Pick<
  TableViewProps<T, typeof Columns[number]>,
  | "itemCount"
  | "page"
  | "perPage"
  | "onPageChange"
  | "isRowSelected"
  | "isColumnSortable"
  | "onClearAllFilters"
> &
  EmptyStateNoInstancesProps &
  EmptyStateNoResultsProps;

export const InstancesTable = <T extends KafkaInstance>({
  instances,
  itemCount,
  page,
  perPage,
  names,
  owners,
  statuses,
  getUrlForInstance,
  isRowSelected,
  isColumnSortable,
  onPageChange,
  onDetails,
  onConnection,
  canChangeOwner,
  onChangeOwner,
  canDelete,
  onDelete,
  onCreate,
  onQuickstartGuide,
  onClickConnectionTabLink,
  onClickSupportLink,
  onInstanceLinkClick,
  onSearchName,
  onRemoveNameChip,
  onRemoveNameChips,
  onSearchOwner,
  onRemoveOwnerChip,
  onRemoveOwnerChips,
  onSearchStatus,
  onRemoveStatusChip,
  onRemoveStatusChips,
  onClearAllFilters,
  canHaveInstanceLink,
  canOpenConnection,
}: InstancesTableProps<T>) => {
  const { t } = useTranslation("kafka");
  const labels = useKafkaLabels();
  const breakpoint = "lg";

  const isFiltered =
    names.length > 0 || owners.length > 0 || statuses.length > 0;

  return (
    <TableView
      data={instances}
      columns={Columns}
      renderHeader={({ column, Th, key }) => (
        <Th key={key}>{labels.fields[column]}</Th>
      )}
      renderCell={({ column, row, Td, key }) => {
        const timeCreatedDate = parseISO(row.createdAt);
        const instanceLinkDisable = canHaveInstanceLink(row);
        return (
          <Td key={key} dataLabel={labels.fields[column]}>
            {(() => {
              switch (column) {
                case "name":
                  return (
                    <Button
                      variant="link"
                      component={(props) => (
                        <Link to={getUrlForInstance(row)} {...props}>
                          {row.name}
                        </Link>
                      )}
                      isInline
                      isDisabled={instanceLinkDisable}
                      onClick={() => onInstanceLinkClick(row)}
                    />
                  );
                case "provider":
                  return labels.providers[row.provider];
                case "createdAt":
                  return (
                    <Stack>
                      <StackItem>
                        <FormatDate
                          date={timeCreatedDate}
                          format={"distanceToNowWithAgo"}
                        />
                      </StackItem>
                      {row.expiryDate && (
                        <StackItem>
                          <Trans
                            i18nKey="will_expire_short"
                            ns={["kafka"]}
                            components={{
                              time: (
                                <FormatDate
                                  date={parseISO(row.expiryDate)}
                                  format="expiration"
                                />
                              ),
                            }}
                          />
                        </StackItem>
                      )}
                    </Stack>
                  );
                case "status":
                  return (
                    <KafkaInstanceStatus
                      status={row["status"]}
                      createdAt={timeCreatedDate}
                      onClickConnectionTabLink={() =>
                        onClickConnectionTabLink(row)
                      }
                      onClickSupportLink={onClickSupportLink}
                    />
                  );
                default:
                  return row[column];
              }
            })()}
          </Td>
        );
      }}
      renderActions={({ row, ActionsColumn }) => {
        const changeOwnerEnabled = canChangeOwner(row);
        const deleteEnabled = canDelete(row);
        const changeConnectionEnabled = canOpenConnection(row);
        return (
          <ActionsColumn
            items={[
              {
                customChild: (
                  <DropdownGroup
                    label={t("table.actions.view-instance-information")}
                  />
                ),
              },
              {
                title: t("table.actions.details"),
                onClick: () => onDetails(row),
              },
              {
                title: t("table.actions.connection"),
                ...(!changeConnectionEnabled
                  ? {
                      isDisabled: true,
                    }
                  : {
                      onClick: () => onConnection(row),
                    }),
              },
              {
                isSeparator: true,
              },
              {
                title: t("table.actions.change-owner"),
                ...(changeOwnerEnabled
                  ? {
                      isDisabled: true,
                      tooltipProps: {
                        position: "left",
                        content: t("kafka:no_permission_to_change_owner"),
                      },
                      tooltip: changeConnectionEnabled,
                      style: {
                        pointerEvents: "auto",
                        cursor: "default",
                      },
                    }
                  : {
                      onClick: () => onChangeOwner(row),
                    }),
              },
              {
                title: t("table.actions.delete"),
                ...(!deleteEnabled
                  ? {
                      isDisabled: true,
                      tooltipProps: {
                        position: "left",
                        content: t("kafka:no_permission_to_delete_kafka"),
                      },
                      tooltip: true,
                      style: {
                        pointerEvents: "auto",
                        cursor: "default",
                      },
                    }
                  : {
                      onClick: () => onDelete(row),
                    }),
                onClick: () => onDelete(row),
              },
            ]}
          />
        );
      }}
      onRowClick={({ row }) => onDetails(row)}
      isColumnSortable={isColumnSortable}
      isRowSelected={isRowSelected}
      isRowDeleted={({ row }) => DeletingStatuses.includes(row["status"])}
      toolbarBreakpoint={breakpoint}
      filters={{
        [labels.fields.name]: {
          type: "search",
          chips: names,
          onSearch: onSearchName,
          onRemoveChip: onRemoveNameChip,
          onRemoveGroup: onRemoveNameChips,
          validate: (value) => /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(value),
          errorMessage: t("kafka:input_field_invalid_message"),
        },
        [labels.fields.owner]: {
          type: "search",
          chips: owners,
          onSearch: onSearchOwner,
          onRemoveChip: onRemoveOwnerChip,
          onRemoveGroup: onRemoveOwnerChips,
          validate: (value: string) => !/["$^<>|+%/;:,\s*=~#()]/.test(value),
          errorMessage: t("kafka:input_field_invalid_message"),
        },
        [labels.fields.status]: {
          type: "checkbox",
          chips: statuses,
          options: labels.statusesSimplified,
          onToggle: onSearchStatus,
          onRemoveChip: onRemoveStatusChip,
          onRemoveGroup: onRemoveStatusChips,
        },
      }}
      actions={[
        {
          label: t("create_instance"),
          onClick: onCreate,
          isPrimary: true,
        },
      ]}
      itemCount={itemCount}
      page={page}
      perPage={perPage}
      onPageChange={onPageChange}
      onClearAllFilters={onClearAllFilters}
      ariaLabel={t("table.title")}
      isFiltered={isFiltered}
      emptyStateNoData={
        <EmptyStateNoInstances
          onCreate={onCreate}
          onQuickstartGuide={onQuickstartGuide}
        />
      }
      emptyStateNoResults={
        <EmptyStateNoResults onClearAllFilters={onClearAllFilters} />
      }
    />
  );
};
