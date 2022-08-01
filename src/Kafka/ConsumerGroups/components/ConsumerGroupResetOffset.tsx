import {
  Alert,
  Button,
  Checkbox,
  Form,
  FormGroup,
  Modal,
  ModalVariant,
  Stack,
  StackItem,
  TextInput,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import "../ConsumerGroup.css";
import type { Consumer, OffsetValue } from "../types";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { TopicSelect } from "./TopicSelect";
import { OffsetSelect } from "./OffsetSelect";

export type ConsumerRow = Consumer & {
  selected?: boolean;
};

export type ConsumerGroupResetOffsetProps = {
  isModalOpen: boolean;
  isDisconnected: boolean;
  groupId: string;
  topics: string[];
  selectedTopic: string;
  customOffsetValue: string;
  setcustomOffsetValue: (customOffsetValue: string) => void;
  consumers: ConsumerRow[];
  isSelected: boolean;
  onClickClose: () => void;
  onClickResetOffset: () => void;
  onChangeTopic: (value: string) => void;
  selectedOffset: OffsetValue;
  onChangeOffsetValue: (value: OffsetValue) => void;
  confirmCheckboxChecked: boolean;
  onConfirmationChange: (value: boolean) => void;
  SelectAllConsumer: (consumer: ConsumerRow[]) => void;
  onSelectAll: (isSelected: boolean) => void;
  onSelectRow: (index: number, isSelected: boolean) => void;
  disableFocusTrap?: boolean;
  appendTo?: () => HTMLElement;
};

export const ConsumerGroupResetOffset: FunctionComponent<
  ConsumerGroupResetOffsetProps
> = ({
  isDisconnected,
  groupId,
  topics,
  customOffsetValue,
  setcustomOffsetValue,
  consumers,
  onClickClose,
  isModalOpen,
  onClickResetOffset,
  selectedTopic,
  onChangeTopic,
  selectedOffset,
  onChangeOffsetValue,
  confirmCheckboxChecked,
  onConfirmationChange,
  isSelected,
  onSelectAll,
  onSelectRow,
  disableFocusTrap,
  appendTo,
}) => {
  const { t } = useTranslation(["kafka"]);

  const isResetOffsetDisabled = (): boolean => {
    return (
      !selectedTopic ||
      !selectedOffset ||
      !confirmCheckboxChecked ||
      !isDisconnected ||
      consumers.filter(({ selected }) => selected === true).length === 0
    );
  };

  const tableColumns = {
    partition: t("consumerGroup.partition"),
    clientId: `${t("consumerGroup.client_id")} + ${t(
      "consumerGroup.member_id"
    )}`,
    current_offset: t("consumerGroup.current_offset"),
    log_end_offset: t("consumerGroup.log_end_offset"),
    offset_lag: t("consumerGroup.offset_lag"),
    new_offset: t("consumerGroup.new_offset"),
  };

  return (
    <Modal
      variant={ModalVariant.large}
      isOpen={isModalOpen}
      aria-label={t("consumerGroup.reset_offset_modal_label")}
      title={t("consumerGroup.reset_offset")}
      showClose={true}
      aria-describedby="modal-message"
      disableFocusTrap={disableFocusTrap}
      appendTo={appendTo}
      position="top"
      actions={[
        <Button
          variant="danger"
          key={1}
          isDisabled={isResetOffsetDisabled()}
          onClick={onClickResetOffset}
        >
          {t("consumerGroup.reset_offset")}
        </Button>,
        <Button variant="link" key={2} onClick={onClickClose}>
          {t("common:cancel")}
        </Button>,
      ]}
    >
      <Stack hasGutter>
        <StackItem>
          <Form isHorizontal>
            <FormGroup
              className="mas--ConsumerGroupResetOffset-form-group--readonly"
              label={t("consumerGroup.reset_offset_consumer_group_label")}
              fieldId="consumer-group-input"
            >
              <TextInput
                isReadOnly
                type="text"
                name={t("consumerGroup.reset_offset_consumer_group_label")}
                id={"consumer-group-input"}
                value={groupId}
              />
            </FormGroup>
            {isDisconnected && (
              <FormGroup
                label={t("consumerGroup.reset_offset_topic_label")}
                fieldId="topic-select"
              >
                <TopicSelect
                  value={selectedTopic}
                  topics={topics}
                  onChange={onChangeTopic}
                />
              </FormGroup>
            )}
            {isDisconnected && selectedTopic && (
              <FormGroup
                label={t("consumerGroup.reset_offset_new_offset_label")}
                fieldId="offset-select"
              >
                <OffsetSelect
                  value={selectedOffset}
                  onChange={onChangeOffsetValue}
                />
              </FormGroup>
            )}
            {isDisconnected && selectedTopic && selectedOffset === "absolute" && (
              <FormGroup
                label={t("consumerGroup.reset_offset_custom_offset_label")}
                fieldId="custom-offset-input"
              >
                <TextInput
                  id="custom-offset-input"
                  name={t("consumerGroup.reset_offset_custom_offset_label")}
                  value={customOffsetValue}
                  onChange={setcustomOffsetValue}
                  type="number"
                />
              </FormGroup>
            )}
          </Form>
        </StackItem>
        <StackItem>
          {!isDisconnected && (
            <Alert
              className="modal-alert"
              variant="danger"
              isInline
              title={t("consumerGroup.reset_offset_connected_alert_title")}
            >
              <p>{t("consumerGroup.reset_offset_connected_alert_body")}</p>
            </Alert>
          )}
        </StackItem>
        <StackItem>
          {isDisconnected && consumers.length > 0 && selectedTopic && (
            <Stack hasGutter>
              <StackItem>
                <TableComposable
                  aria-label={t("consumerGroup.reset_offset_selectable table")}
                  className="consumer-table"
                >
                  <Thead>
                    <Tr>
                      <Th
                        select={{
                          isSelected: isSelected,
                          onSelect: (_event, isSelected) =>
                            onSelectAll(isSelected),
                        }}
                      />
                      <Th>{tableColumns.partition}</Th>
                      <Th>{tableColumns.clientId}</Th>
                      <Th>{tableColumns.current_offset}</Th>
                      <Th>{tableColumns.log_end_offset}</Th>
                      <Th>{tableColumns.offset_lag}</Th>
                      <Th>{tableColumns.new_offset}</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {consumers.map((consumer, index) => {
                      return (
                        <Tr key={index}>
                          <Td
                            select={{
                              rowIndex: index,
                              isSelected: isSelected,
                              onSelect: (_event) =>
                                onSelectRow(index, isSelected),
                            }}
                          />
                          <Td dataLabel={tableColumns.partition}>
                            {consumer.partition}
                          </Td>
                          <Td dataLabel={tableColumns.clientId}>
                            {String(consumer.groupId)}
                            {String(consumer.memberId)}
                          </Td>
                          <Td dataLabel={tableColumns.current_offset}>
                            {consumer.offset}
                          </Td>
                          <Td dataLabel={tableColumns.log_end_offset}>
                            {consumer.logEndOffset}
                          </Td>
                          <Td dataLabel={tableColumns.offset_lag}>
                            {consumer.lag}
                          </Td>
                          <Td dataLabel={tableColumns.offset_lag}>
                            {consumer.selected && selectedOffset
                              ? selectedOffset === "absolute"
                                ? customOffsetValue
                                : selectedOffset
                              : "-"}
                          </Td>
                        </Tr>
                      );
                    })}
                  </Tbody>
                </TableComposable>
              </StackItem>
              <StackItem>
                <Checkbox
                  label={t("consumerGroup.reset_offset_accept")}
                  id="resetoffset-checkbox"
                  isChecked={confirmCheckboxChecked}
                  onChange={onConfirmationChange}
                />
              </StackItem>
            </Stack>
          )}
        </StackItem>
      </Stack>
    </Modal>
  );
};
