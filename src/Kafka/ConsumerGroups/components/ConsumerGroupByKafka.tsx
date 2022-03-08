import {
  Flex,
  FlexItem,
  Stack,
  TextContent,
  TextVariants,
  Text,
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
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { Consumer, ConsumerGroupStateEnum } from "../types";
import { displayConsumerGroupState } from "../utils";
import { ConsumerGroupPopover } from "./ConsumerGroupPopover";
import { activeMembers, partionsWithLag } from "../utils";

export type ConsumerGroupByKafkaProps = {
  state: ConsumerGroupStateEnum;
  consumers: Consumer[];
};

export const ConsumerGroupByKafka: FunctionComponent<
  ConsumerGroupByKafkaProps
> = ({ state, consumers }) => {
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
      <TextContent>
        <Flex>
          <FlexItem>
            <Text component={TextVariants.h4} size={50}>
              {t("consumerGroup.active_members")}
            </Text>
            <Text component={TextVariants.h2}>{activeMembers(consumers)}</Text>
          </FlexItem>
          <FlexItem>
            <Text component={TextVariants.h4}>
              {t("consumerGroup.partitions_with_lag")}{" "}
              <ConsumerGroupPopover
                title={t("consumerGroup.partitions_with_lag_name")}
                description={t("consumerGroup.partitions_with_lag_description")}
              />
            </Text>
            <Text component={TextVariants.h2}>
              {partionsWithLag(consumers)}
            </Text>
          </FlexItem>
          <FlexItem>
            <Text component={TextVariants.h4}>{t("consumerGroup.state")}</Text>
            <Text component={TextVariants.h2}>
              {displayConsumerGroupState[state]}
            </Text>
          </FlexItem>
        </Flex>
      </TextContent>
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
                <Td key={columnNames.topic}>{topic}</Td>
                <Td key={columnNames.partition}>{partition}</Td>
                <Td key={columnNames.consumer_id}>
                  {memberId ? (
                    groupId + "\n" + memberId
                  ) : (
                    <i>{t("consumerGroup.unassigned")}</i>
                  )}
                </Td>
                <Td key={columnNames.current_offset}>{offset}</Td>
                <Td key={columnNames.log_end_offset}>{logEndOffset}</Td>
                <Td key={columnNames.offset_lag}>{lag}</Td>
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
    </Stack>
  );
};
