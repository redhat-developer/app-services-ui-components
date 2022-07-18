import {
  Stack,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
} from "@patternfly/react-core";
import { TableVariant } from "@patternfly/react-table";
import { useMemo } from "react";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ResponsiveTable } from "../../../shared";
import type { Consumer, ConsumerGroupState } from "../types";
import { ConsumerGroupPopover } from "./ConsumerGroupPopover";
import { ConsumerGroupStateLabel } from "./ConsumerGroupState";

const columns = [
  "topic",
  "partition",
  "consumer_id",
  "current_offset",
  "log_end_offset",
  "offset_lag",
];

export type ConsumerGroupByKafkaProps = {
  state: ConsumerGroupState;
  consumers: Consumer[];
  activeMembers: number;
  partitionsWithLag: number;
};

export const ConsumerGroupByKafka: FunctionComponent<
  ConsumerGroupByKafkaProps
> = ({ state, consumers, activeMembers, partitionsWithLag }) => {
  const { t } = useTranslation(["kafka"]);

  const columnLabels: { [key in typeof columns[number]]: string } = useMemo(
    () =>
      ({
        topic: t("topic.topic"),
        partition: t("consumerGroup.partition"),
        consumer_id: t("consumerGroup.consumer_id"),
        current_offset: t("consumerGroup.current_offset"),
        log_end_offset: t("consumerGroup.log_end_offset"),
        offset_lag: t("consumerGroup.offset_lag"),
      } as const),
    [t]
  );
  return (
    <Stack hasGutter>
      <DescriptionList
        columnModifier={{ lg: "3Col" }}
        className={"pf-m-display-2xl"}
      >
        <DescriptionListGroup>
          <DescriptionListTerm>
            {t("consumerGroup.active_members")}
          </DescriptionListTerm>
          <DescriptionListDescription>
            {activeMembers}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            {t("consumerGroup.partitions_with_lag")}{" "}
            <ConsumerGroupPopover
              title={t("consumerGroup.partitions_with_lag_name")}
              description={t("consumerGroup.partitions_with_lag_description")}
            />
          </DescriptionListTerm>
          <DescriptionListDescription>
            {partitionsWithLag}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            {t("consumerGroup.state_header")}
          </DescriptionListTerm>
          <DescriptionListDescription>
            <ConsumerGroupStateLabel state={state} />
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
      <ResponsiveTable
        ariaLabel={t("consumerGroup.consumer_group_info_table_aria")}
        columns={columns}
        variant={TableVariant.compact}
        data={consumers}
        renderHeader={({ column, Th, key }) => (
          <Th key={key}>{columnLabels[column]}</Th>
        )}
        renderCell={({ column, row, Td, key }) => (
          <Td key={key} dataLabel={columnLabels[column]}>
            {(() => {
              switch (column) {
                case "topic":
                  return row.topic;
                case "partition":
                  return row.partition;
                case "consumer_id":
                  return row.memberId ? (
                    row.groupId + "\n" + row.memberId
                  ) : (
                    <i>{t("consumerGroup.unassigned")}</i>
                  );
                case "current_offset":
                  return row.offset;
                case "log_end_offset":
                  return row.logEndOffset;
                case "offset_lag":
                  return row.lag;
              }
            })()}
          </Td>
        )}
      ></ResponsiveTable>
    </Stack>
  );
};
