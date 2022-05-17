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
  Title,
} from "@patternfly/react-core";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import "../ConsumerGroup.css";
import { Consumer, OffsetValue } from "../types";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import { TopicDropdown } from "./TopicsDropdown";
import { OffsetDropdown } from "./OffsetDropdown";

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
  onSelectRow: (index: number, select: boolean) => void;
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
}) => {
  const { t } = useTranslation(["kafka"]);

  const isResetOffsetDisabled = (): boolean => {
    return (
      selectedTopic === "" ||
      !confirmCheckboxChecked ||
      !isDisconnected ||
      !selectedOffset ||
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
      aria-label={"Modal for resetting offset of Kafka consumergroup"}
      title={t("consumerGroup.reset_offset")}
      showClose={true}
      aria-describedby="modal-message"
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
            <FormGroup label="Consumer group" fieldId="horizontal-form-name">
              <Title className="form-title" headingLevel="h4" size="md">
                {groupId}
              </Title>
            </FormGroup>
            {isDisconnected && (
              <FormGroup label="Topic" fieldId="horizontal-form-name">
                <TopicDropdown
                  value={selectedTopic ? selectedTopic : t("common:select")}
                  topics={topics}
                  onChange={onChangeTopic}
                />
              </FormGroup>
            )}
            {isDisconnected && selectedTopic && (
              <FormGroup label="New offset" fieldId="offset-dropdown">
                <OffsetDropdown
                  value={selectedOffset ? selectedOffset : t("common:select")}
                  onChange={onChangeOffsetValue}
                />
              </FormGroup>
            )}
            {isDisconnected && selectedTopic && selectedOffset === "absolute" && (
              <FormGroup label="Custom offset" fieldId="custom-offset-input">
                <TextInput
                  id="custom-offset-input"
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
                  aria-label="Selectable Table"
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
                            {consumer.groupId + consumer.memberId}
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
                  aria-label="uncontrolled checkbox example"
                  id="check-5"
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
