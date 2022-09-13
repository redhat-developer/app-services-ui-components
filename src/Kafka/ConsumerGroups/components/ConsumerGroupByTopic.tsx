import {
  Stack,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
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

export type ConsumerGroupByTopicProps = {
  state: ConsumerGroupState;
  consumers: Consumer[];
  activeMembers: number;
  partitionsWithLag: number;
};

export const ConsumerGroupByTopic: FunctionComponent<
  ConsumerGroupByTopicProps
> = ({ state, consumers, activeMembers, partitionsWithLag }) => {
  const { t } = useTranslation(["kafka"]);

  const columnNames = {
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
            {t("consumerGroup.active_members_for_topic")}
          </DescriptionListTerm>
          <DescriptionListDescription>
            {activeMembers}
          </DescriptionListDescription>
        </DescriptionListGroup>
        <DescriptionListGroup>
          <DescriptionListTerm>
            {t("consumerGroup.partitions_with_lag_for_topic")}{" "}
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
            {<ConsumerGroupStateLabel state={state} />}
          </DescriptionListDescription>
        </DescriptionListGroup>
      </DescriptionList>
      <TableComposable
        aria-label={t("consumerGroup.consumer_group_info_table_aria")}
        variant={TableVariant.compact}
      >
        <Thead noWrap>
          <Tr>
            <Th key={columnNames.partition} width={20}>
              {columnNames.partition}
            </Th>
            <Th key={columnNames.consumer_id} width={20}>
              {columnNames.consumer_id}
            </Th>
            <Th key={columnNames.current_offset} width={20}>
              {columnNames.current_offset}
            </Th>
            <Th key={columnNames.log_end_offset} width={20}>
              {columnNames.log_end_offset}
            </Th>
            <Th key={columnNames.offset_lag} width={20}>
              {columnNames.offset_lag}
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {consumers.map((consumer) => {
            const { groupId, partition, memberId, offset, logEndOffset, lag } =
              consumer;
            return (
              <Tr key={groupId}>
                <Td dataLabel={columnNames.partition}>{partition}</Td>
                <Td dataLabel={columnNames.consumer_id}>
                  {memberId ? (
                    groupId + "\n" + memberId
                  ) : (
                    <i>{t("consumerGroup.unassigned")}</i>
                  )}{" "}
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
