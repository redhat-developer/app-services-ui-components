import {
  Stack,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListTerm,
  DescriptionListDescription,
} from "@patternfly/react-core";
import {
  TableComposable,
  TableVariant,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { Consumer, ConsumerGroupState } from "../types";
import { ConsumerGroupPopover } from "./ConsumerGroupPopover";
import { ConsumerGroupStateLabel } from "./ConsumerGroupState";

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

  const columnNames = {
    topic: t("topic.topic"),
    partition: t("consumerGroup.partition"),
    consumer_id: t("consumerGroup.consumer_id"),
    current_offset: t("consumerGroup.current_offset"),
    log_end_offset: t("consumerGroup.log_end_offset"),
    offset_lag: t("consumerGroup.offset_lag"),
  };

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
      <TableComposable
        aria-label={t("consumerGroup.consumer_group_info_table_aria")}
        variant={TableVariant.compact}
      >
        <Thead noWrap>
          <Tr>
            <Th width={20}>{columnNames.topic}</Th>
            <Th width={20}>{columnNames.partition}</Th>
            <Th width={20}>{columnNames.consumer_id}</Th>
            <Th width={20}>{columnNames.current_offset}</Th>
            <Th width={20}>{columnNames.log_end_offset}</Th>
            <Th width={20}>{columnNames.offset_lag}</Th>
          </Tr>
        </Thead>
        <Tbody>
          {consumers.map((consumer) => {
            const {
              groupId,
              partition,
              topic,
              memberId,
              offset,
              logEndOffset,
              lag,
            } = consumer;
            return (
              <Tr key={consumer.groupId}>
                <Td dataLabel={columnNames.topic}>{topic}</Td>
                <Td dataLabel={columnNames.partition}>{partition}</Td>
                <Td dataLabel={columnNames.consumer_id}>
                  {memberId ? (
                    groupId + "\n" + memberId
                  ) : (
                    <i>{t("consumerGroup.unassigned")}</i>
                  )}
                </Td>
                <Td dataLabel={columnNames.current_offset}>{offset}</Td>
                <Td dataLabel={columnNames.log_end_offset}>{logEndOffset}</Td>
                <Td dataLabel={columnNames.offset_lag}>{lag}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
    </Stack>
  );
};
