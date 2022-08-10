import { DropdownGroup, PageSection, Title } from "@patternfly/react-core";
import { parseISO } from "date-fns";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { TableViewProps } from "../../shared";
import { FormatDate, TableView } from "../../shared";
import type { KafkaInstance, KafkaInstanceField } from "../types";
import { DeletingStatuses } from "../types";
import { useKafkaLabels } from "../useKafkaLabels";
import type { EmptyStateNoInstancesProps } from "./components";
import {
  EmptyStateNoInstances,
  InstanceDrawer,
  InstanceStatus,
  InstancesToolbar,
} from "./components";

const KafkaInstancesColumns: KafkaInstanceField[] = [
  "name",
  "owner",
  "createdAt",
  "provider",
  "region",
  "status",
];

export type KafkaInstancesPageProps<T extends KafkaInstance> = {
  instances: T[] | undefined;
  onDetails: (row: T) => void;
  onConnection: (row: T) => void;
  onChangeOwner: (row: T) => void;
  onDelete: (row: T) => void;
  onClickConnectionTabLink: () => void;
  onClickSupportLink: () => void;
} & Pick<
  TableViewProps<unknown, unknown>,
  "itemCount" | "page" | "onPageChange"
> &
  EmptyStateNoInstancesProps;

export const KafkaInstancesPage = <T extends KafkaInstance>({
  instances,
  itemCount,
  page,
  onPageChange,
  onDetails,
  onConnection,
  onChangeOwner,
  onDelete,
  onCreate,
  onQuickstartGuide,
  onClickConnectionTabLink,
  onClickSupportLink,
}: KafkaInstancesPageProps<T>) => {
  const { t } = useTranslation("kafka");
  const [selectedRow, setSelectedRow] = useState<KafkaInstance>();

  const labels = useKafkaLabels();

  return (
    <InstanceDrawer
      instance={selectedRow}
      onClose={() => setSelectedRow(undefined)}
    >
      <PageSection variant={"light"}>
        <Title headingLevel={"h1"}>{t("table.title")}</Title>
      </PageSection>
      <PageSection isFilled={true}>
        <TableView
          data={instances}
          columns={KafkaInstancesColumns}
          renderHeader={({ column, Th, key }) => (
            <Th key={key}>{labels.fields[column]}</Th>
          )}
          renderCell={({ column, row, Td, key }) => {
            const timeCreatedDate = parseISO(row.createdAt);
            return (
              <Td key={key} dataLabel={labels.fields[column]}>
                {(() => {
                  switch (column) {
                    case "provider":
                      return labels.providers[row.provider];
                    case "createdAt":
                      return (
                        <FormatDate
                          date={timeCreatedDate}
                          format={"distanceToNow"}
                        />
                      );
                    case "status":
                      return (
                        <InstanceStatus
                          status={row["status"]}
                          createdAt={timeCreatedDate}
                          onClickConnectionTabLink={onClickConnectionTabLink}
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
          renderActions={({ row, ActionsColumn }) => (
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
                  onClick: () => onConnection(row),
                },
                {
                  isSeparator: true,
                },
                {
                  title: t("table.actions.change-owner"),
                  onClick: () => onChangeOwner(row),
                },
                {
                  title: t("table.actions.delete"),
                  onClick: () => onDelete(row),
                },
              ]}
            />
          )}
          setActionCellOuiaId={() => "kebab-menu"}
          onRowClick={({ row }) => setSelectedRow(row)}
          isRowSelected={({ row }) => row === selectedRow}
          isRowDeleted={({ row }) => DeletingStatuses.includes(row["status"])}
          toolbarBreakpoint={"xl"}
          toolbarContent={
            <InstancesToolbar
              names={["foo", "bar"]}
              owners={["baz"]}
              statuses={["pending", "failed"]}
              cloudProviders={[]}
              regions={[]}
              availableCloudProviders={["aws"]}
              availableRegions={["US East, N. Virginia", "EU, Ireland"]}
              onCreate={onCreate}
            />
          }
          itemCount={itemCount}
          page={page}
          onPageChange={onPageChange}
          ariaLabel={t("table.title")}
        >
          <EmptyStateNoInstances
            onCreate={onCreate}
            onQuickstartGuide={onQuickstartGuide}
          />
        </TableView>
      </PageSection>
    </InstanceDrawer>
  );
};
