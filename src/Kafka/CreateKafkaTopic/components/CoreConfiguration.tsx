import type React from "react";
import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import type { NumberInputProps } from "@patternfly/react-core";
import {
  FormSection,
  TextContent,
  Text,
  TextVariants,
  ValidatedOptions,
  TextInput,
  NumberInput,
  Stack,
  Radio,
} from "@patternfly/react-core";
import { FormGroupWithPopover, TextWithLabelPopover } from "../../../shared";
import { CustomRetentionMessage } from "./CustomRetentionMessage";
import { CustomRetentionSize } from "./CustomRetentionSize";
import {
  retentionTimeSelectOptions,
  retentionSizeSelectOptions,
} from "../types";
import { RetentionSizeUnits, RetentionTimeUnits } from "../../types";
import { useValidateTopic } from "../types";
import type { NewTopic } from "../types";

export type CoreConfigurationProps = {
  isCreate?: boolean;
  topicData: NewTopic;
  setTopicData: (data: NewTopic) => void;
  checkTopicName: (value: string) => Promise<boolean>;
  //initialPartition: number | undefined;
  invalidText: string;
  setInvalidText: (message: string) => void;
  setTopicValidated: (error: ValidatedOptions) => void;
  topicValidated: ValidatedOptions;
  setWarning: (isWarning: boolean) => void;
  warning: boolean;
  availablePartitionLimit: number;
};

const CoreConfiguration: React.FC<CoreConfigurationProps> = ({
  isCreate,
  topicData,
  setTopicData,
  invalidText,
  setInvalidText,
  setTopicValidated,
  topicValidated,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic"]);
  const { validateName } = useValidateTopic();
  const [isRetentionTimeSelectOpen, setIsRetentionTimeSelectOpen] =
    useState<boolean>();
  const [isRetentionSizeSelectOpen, setIsRetentionSizeSelectOpen] =
    useState<boolean>();

  const validationCheck = useCallback(
    (value: string) => {
      const errorMessage = validateName(value);
      if (errorMessage) {
        setInvalidText(errorMessage);
        setTopicValidated(ValidatedOptions.error);
      } else {
        setTopicValidated(ValidatedOptions.default);
      }
    },
    [setInvalidText, setTopicValidated, validateName]
  );

  const handleRetentionMessageSize = (value: string) => {
    switch (value) {
      case RetentionSizeUnits.CUSTOM:
        setTopicData({
          ...topicData,
          retentionBytes: 1,
          retentionBytesUnit: RetentionSizeUnits.CUSTOM,
        });
        break;
      case RetentionTimeUnits.UNLIMITED:
        setTopicData({
          ...topicData,
          retentionBytesUnit: RetentionSizeUnits.UNLIMITED,
        });
    }
  };

  const onRetentionTimeToggle = (isOpen: boolean) => {
    setIsRetentionTimeSelectOpen(isOpen);
  };

  const onRetentionSizeToggle = (isOpen: boolean) => {
    setIsRetentionSizeSelectOpen(isOpen);
  };

  const handleRetentionMessageTime = (value: string) => {
    switch (value) {
      case RetentionTimeUnits.CUSTOM:
        setTopicData({
          ...topicData,
          retentionTime: 7,
          retentionTimeUnit: RetentionTimeUnits.CUSTOM,
        });
        break;
      case RetentionTimeUnits.UNLIMITED:
        setTopicData({
          ...topicData,
          retentionTimeUnit: RetentionTimeUnits.UNLIMITED,
        });
    }
  };

  const handleTextInputChange = (value: string) => {
    validationCheck(value);
    setTopicData({ ...topicData, name: value });
  };

  const onPartitionsChange: NumberInputProps["onChange"] = (event) => {
    setTopicData({
      ...topicData,
      numPartitions: Number((event.target as HTMLInputElement).value),
    });
  };
  const handleOnPlus = () => {
    setTopicData({
      ...topicData,
      numPartitions: topicData.numPartitions + 1,
    });
  };

  const handleOnMinus = () => {
    setTopicData({
      ...topicData,
      numPartitions: topicData.numPartitions - 1,
    });
  };

  const retentionTimeInput = (
    <CustomRetentionMessage
      toggleId="core-config-retention-dropdowntoggle"
      name="retention-ms"
      topicData={topicData}
      setTopicData={setTopicData}
      onToggle={onRetentionTimeToggle}
      isOpen={isRetentionTimeSelectOpen}
      selectOptions={retentionTimeSelectOptions}
    />
  );

  const retentionSizeInput = (
    <CustomRetentionSize
      toggleId="core-config-retention-size-dropdowntoggle"
      name="retention-bytes"
      topicData={topicData}
      setTopicData={setTopicData}
      onToggle={onRetentionSizeToggle}
      isOpen={isRetentionSizeSelectOpen}
      selectOptions={retentionSizeSelectOptions}
    />
  );

  return (
    <FormSection
      title={t("core_configuration")}
      id="core-configuration"
      titleElement={"h2"}
    >
      <TextContent>
        <Text component={TextVariants.p} className="section-info">
          {t("core_config_info")}
        </Text>
      </TextContent>
      {isCreate ? (
        <FormGroupWithPopover
          labelHead={t("topic_name")}
          fieldId="create-topic-name"
          fieldLabel={t("topic_name")}
          labelBody={t("topic_name_description")}
          buttonAriaLabel="More info for topic name field"
          helperTextInvalid={invalidText}
          validated={topicValidated}
          isRequired={true}
          helperText={t("topic_name_helper_text")}
        >
          <TextInput
            isRequired
            type="text"
            id="create-topic-name"
            name="name"
            value={topicData.name}
            onChange={handleTextInputChange}
            label={t("topic_name")}
            placeholder={t("enter_name")}
            validated={topicValidated}
          />
        </FormGroupWithPopover>
      ) : (
        <TextWithLabelPopover
          fieldId="topic-name"
          btnAriaLabel="topic detail name"
          fieldLabel="Name"
          fieldValue={topicData.name}
          popoverBody={t("topic_name_description")}
          popoverHeader={t("topic_name")}
        />
      )}

      <FormGroupWithPopover
        fieldId="create-topic-partitions"
        fieldLabel="Partitions"
        labelHead={t("partitions")}
        labelBody={t("partitions_description")}
        buttonAriaLabel="More info for partitions field"
        helperText={
          topicData.numPartitions >= availablePartitionLimit
            ? t("partitions_warning")
            : t("partition_helper_text")
        }
        validated={
          topicData.numPartitions >= availablePartitionLimit
            ? "warning"
            : "default"
        }
      >
        <NumberInput
          id="create-topic-partitions"
          inputName="num-partitions"
          onChange={onPartitionsChange}
          data-testid={t("partitions")}
          onPlus={handleOnPlus}
          onMinus={handleOnMinus}
          value={topicData.numPartitions}
          plusBtnProps={{ name: "num-partitions" }}
          minusBtnProps={{ name: "num-partitions" }}
          min={0}
        />
      </FormGroupWithPopover>

      <TextWithLabelPopover
        fieldId="replicas"
        btnAriaLabel={t("replicas")}
        fieldLabel={t("replicas")}
        fieldValue={topicData.replicationFactor.toString()}
        popoverBody={t("replicas_description")}
        popoverHeader={t("replicas")}
      />
      <TextWithLabelPopover
        fieldId="min-insync-replicas"
        btnAriaLabel="topic detail min-in-sync replica"
        fieldLabel="Minimum in-sync replicas"
        fieldValue={topicData.minInSyncReplica?.toString()}
        popoverBody={t("min_insync_replicas_description")}
        popoverHeader={t("min_insync_replicas")}
      />
      <FormGroupWithPopover
        fieldId="retention"
        fieldLabel="Retention time"
        labelHead={t("retention_time")}
        labelBody={t("retention_time_description")}
        buttonAriaLabel="More info for retention time field"
      >
        <Stack hasGutter>
          <Radio
            isChecked={
              topicData.retentionTimeUnit === RetentionTimeUnits.DAY ||
              topicData.retentionTimeUnit === RetentionTimeUnits.WEEK ||
              topicData.retentionTimeUnit === RetentionTimeUnits.CUSTOM
            }
            name="custom-retention-time"
            onChange={() =>
              handleRetentionMessageTime(RetentionTimeUnits.CUSTOM)
            }
            label={retentionTimeInput}
            className="kafka-ui--radio-label__number-input"
            aria-label="custom duration"
            id="custom-retention-time"
            value={RetentionTimeUnits.CUSTOM}
          />
          <Radio
            isChecked={
              topicData.retentionTimeUnit === RetentionTimeUnits.UNLIMITED
            }
            name="unlimited-retention-time"
            onChange={() =>
              handleRetentionMessageTime(RetentionTimeUnits.UNLIMITED)
            }
            label="Unlimited time"
            aria-label="Unlimited"
            id="unlimited-retention-time"
            value={RetentionTimeUnits.UNLIMITED}
          />
        </Stack>
      </FormGroupWithPopover>
      <FormGroupWithPopover
        fieldId="retention-size"
        fieldLabel="Retention size"
        labelHead={t("retention_size")}
        labelBody={t("retention_size_description")}
        buttonAriaLabel="More info for retention size field"
      >
        <Stack hasGutter>
          <Radio
            isChecked={
              topicData.retentionBytesUnit === RetentionSizeUnits.CUSTOM
            }
            name="custom-retention-size"
            onChange={() =>
              handleRetentionMessageSize(RetentionSizeUnits.CUSTOM)
            }
            label={retentionSizeInput}
            className="kafka-ui--radio-label__number-input"
            aria-label="custom size"
            id="custom-retention-size"
            value={RetentionSizeUnits.CUSTOM}
          />
          <Radio
            isChecked={
              topicData.retentionBytesUnit === RetentionSizeUnits.UNLIMITED
            }
            name="unlimited-retention-size"
            onChange={() =>
              handleRetentionMessageSize(RetentionSizeUnits.UNLIMITED)
            }
            label="Unlimited size"
            aria-label="Unlimited"
            id="unlimited-retention-size"
            value={RetentionSizeUnits.UNLIMITED}
          />
        </Stack>
      </FormGroupWithPopover>
    </FormSection>
  );
};

export { CoreConfiguration };
