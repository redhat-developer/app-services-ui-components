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
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import "../ConsumerGroup.css";
import { Consumer } from "../types";
import {
  DropdownWithToggle,
  IDropdownOption,
  IDropdownWithToggleProps,
} from "./DropdownToggle";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";

type OffsetValue = "absolute" | "latest" | "earliest";

export type ConsumerRow = Consumer & {
  selected?: boolean;
};

export type ConsumerGroupResetOffsetProps = {
  isDisconnected: boolean;
  groupId: string;
  selectedTopic: string;
  setSelectedTopic: (selectedTopic: string) => void;
  topics: string[];
  selectedOffset: OffsetValue;
  setSelectedOffset: (value: OffsetValue) => void;
  customOffsetValue: string;
  setcustomOffsetValue: (customOffsetValue: string) => void;
  confirmCheckboxChecked: boolean;
  onConfirmationChange: (value: boolean) => void;
  consumers: ConsumerRow[];
  setConsumers: (value: ConsumerRow[]) => void;
  isSelected: boolean;
  onClickClose: () => void;
};

export const ConsumerGroupResetOffset: FunctionComponent<
  ConsumerGroupResetOffsetProps
> = ({
  isDisconnected,
  groupId,
  selectedTopic,
  setSelectedTopic,
  topics,
  selectedOffset,
  setSelectedOffset,
  customOffsetValue,
  setcustomOffsetValue,
  confirmCheckboxChecked,
  onConfirmationChange,
  consumers,
  onClickClose,
}) => {
  const { t } = useTranslation(["kafka", "common"]);

  const [newConsumers, setNewConsumer] = useState<ConsumerRow[]>(consumers);

  const getTopics = (topics: string[]) => {
    const distinctTopics = topics.filter(
      (topic: string, i: number) => topics.indexOf(topic) === i
    );
    return distinctTopics.map((topic: string) => ({
      key: topic,
      value: topic,
      isDisabled: false,
    }));
  };

  const isResetOffsetDisabled = (): boolean => {
    return (
      selectedTopic === "" ||
      !confirmCheckboxChecked ||
      !isDisconnected ||
      !selectedOffset ||
      consumers.filter(({ selected }) => selected === true).length === 0
    );
  };

  const onTopicSelect: IDropdownWithToggleProps["onSelectOption"] = (
    selectedTopic
  ) => {
    setSelectedTopic(selectedTopic);
  };

  const onOffsetSelect: IDropdownWithToggleProps["onSelectOption"] = (
    value
  ) => {
    setSelectedOffset(value as OffsetValue);
  };

  const offsetValueOption: { [key in OffsetValue]: string } = {
    absolute: t("consumerGroup.offset.absolute"),
    latest: t("consumerGroup.offset.latest"),
    earliest: t("consumerGroup.offset.earliest"),
  };

  const onSelectAllConsumer = (isSelecting = true) => {
    console.log(isSelecting);
    setNewConsumer(
      newConsumers.map((consumer) => {
        consumer.selected = isSelecting;
        return consumer;
      })
    );
  };

  const onSelect = (rowId: number, selecting: boolean) => {
    const selectedConsumers = [...newConsumers];
    selectedConsumers[rowId].selected = !selecting;
    setNewConsumer(selectedConsumers);
  };

  const offsetOptions: IDropdownOption[] = [
    {
      key: offsetValueOption.absolute,
      value: offsetValueOption.absolute,
      isDisabled: false,
    },
    {
      key: offsetValueOption.earliest,
      value: offsetValueOption.earliest,
      isDisabled: false,
    },
    {
      key: offsetValueOption.latest,
      value: offsetValueOption.latest,
      isDisabled: false,
    },
  ];

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
      isOpen={true}
      aria-label={"Modal for resetting offset of Kafka consumergroup"}
      title={t("consumerGroup.reset_offset")}
      showClose={true}
      aria-describedby="modal-message"
      actions={[
        <Button variant="danger" key={1} isDisabled={isResetOffsetDisabled()}>
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
                <DropdownWithToggle
                  id="topic-dropdown"
                  toggleId="topic-dropdowntoggle"
                  ariaLabel="topic-select-dropdown"
                  onSelectOption={onTopicSelect}
                  items={getTopics(topics)}
                  name="cleanup-policy"
                  value={selectedTopic ? selectedTopic : t("common:select")}
                  menuAppendTo={"parent"}
                />
              </FormGroup>
            )}
            {isDisconnected && selectedTopic && (
              <FormGroup label="New offset" fieldId="offset-dropdown">
                <DropdownWithToggle
                  id="offset-dropdown"
                  toggleId="offset-dropdowntoggle"
                  ariaLabel="offset-select-dropdown"
                  onSelectOption={onOffsetSelect}
                  items={offsetOptions}
                  name="offset-dropdown"
                  value={selectedOffset ? selectedOffset : t("common:select")}
                  menuAppendTo={"parent"}
                />
              </FormGroup>
            )}
            {isDisconnected &&
              selectedTopic &&
              selectedOffset === offsetValueOption.absolute && (
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
                          onSelect: (_event, isSelecting) =>
                            onSelectAllConsumer(isSelecting),
                          isSelected:
                            consumers.length ===
                            newConsumers.filter(
                              (consumer) => consumer.selected === true
                            ).length,
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
                    {newConsumers.map((consumer, index) => {
                      return (
                        <Tr key={index}>
                          <Td
                            select={{
                              rowIndex: index,
                              isSelected: consumer.selected || false,
                              onSelect: (_event) =>
                                onSelect(index, consumer.selected || false),
                            }}
                          />
                          <Td>{consumer.selected}</Td>
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
                              ? selectedOffset === offsetValueOption.absolute
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
