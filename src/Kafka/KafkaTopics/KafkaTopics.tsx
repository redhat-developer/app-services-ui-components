import { useTranslation } from "react-i18next";
import type { TableViewProps } from "../../shared";
import { TableView } from "../../shared";
import type { KafkaTopic, KafkaTopicField } from "./types";
import type { EmptyStateNoTopicProps } from "./components";
import { EmptyStateNoTopic } from "./components";
import { EmptyStateNoResults } from "../../shared";
import { TableVariant } from "@patternfly/react-table";
import { Link } from "react-router-dom";
import { formattedRetentionSize, formattedRetentionTime } from "./types";

const Columns: KafkaTopicField[] = [
  "topic_name",
  "partitions",
  "retention_time",
  "retention_size",
];

export type KafkaTopicsProps<T extends KafkaTopic> = {
  topics: Array<T> | undefined;
  getUrlFortopic: (row: T) => string;
  onDelete: (row: T) => void;
  onEdit: (row: T) => void;
  topicName: string[];
  onSearchTopic: (value: string) => void;
  onRemoveTopicChip: (value: string) => void;
  onRemoveTopicChips: () => void;
  onTopicLinkClick: (row: T) => void;
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
  EmptyStateNoTopicProps;

export const KafkaTopics = <T extends KafkaTopic>({
  topics,
  onDelete,
  onEdit,
  isColumnSortable,
  itemCount,
  onSearchTopic,
  topicName,
  onClearAllFilters,
  onCreateTopic,
  page,
  perPage,
  onPageChange,
  onRemoveTopicChip,
  onRemoveTopicChips,
  getUrlFortopic,
}: KafkaTopicsProps<T>) => {
  const { t } = useTranslation("topic");

  const labels: { [field in KafkaTopicField]: string } = {
    topic_name: t("topic_name"),
    partitions: t("partitions"),
    retention_time: t("retention_time"),
    retention_size: t("retention_size"),
  };

  const isFiltered = topicName.length > 0;
  return (
    <TableView
      variant={TableVariant.compact}
      tableOuiaId={"card-table"}
      ariaLabel={t("topic_list_table")}
      data={topics}
      columns={Columns}
      renderHeader={({ column, Th, key }) => (
        <Th key={key}>{labels[column]}</Th>
      )}
      renderCell={({ column, row, Td, key }) => {
        return (
          <Td key={key} dataLabel={labels[column]}>
            {(() => {
              switch (column) {
                case "topic_name":
                  return (
                    <Link
                      to={getUrlFortopic(row)}
                      data-testid="tableTopics-linkTopic"
                      data-ouia-component-id="table-link"
                    >
                      {row.topic_name}
                    </Link>
                  );
                case "partitions":
                  return row.partitions;
                case "retention_time":
                  return formattedRetentionTime(
                    row.retention_time ? parseInt(row.retention_time, 10) : 0
                  );
                case "retention_size":
                  return formattedRetentionSize(
                    row.retention_size ? parseInt(row.retention_size, 10) : 0
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
              title: t("table.actions.edit"),
              onClick: () => onEdit(row),
            },
            {
              title: t("table.actions.delete"),
              onClick: () => onDelete(row),
            },
          ]}
        />
      )}
      isColumnSortable={isColumnSortable}
      filters={{
        [labels.topic_name]: {
          type: "search",
          chips: topicName,
          onSearch: onSearchTopic,
          onRemoveChip: onRemoveTopicChip,
          onRemoveGroup: onRemoveTopicChips,
          validate: (value: string) => !/["$^<>|+%/;:,\s*=~#()]/.test(value),
          errorMessage: t("input_field_invalid_message"),
        },
      }}
      actions={[
        {
          label: t("create_topic"),
          onClick: onCreateTopic,
          isPrimary: true,
        },
      ]}
      itemCount={itemCount}
      page={page}
      onPageChange={onPageChange}
      perPage={perPage}
      isFiltered={isFiltered}
      onClearAllFilters={onClearAllFilters}
      emptyStateNoData={<EmptyStateNoTopic onCreateTopic={onCreateTopic} />}
      emptyStateNoResults={<EmptyStateNoResults />}
    ></TableView>
  );
};
