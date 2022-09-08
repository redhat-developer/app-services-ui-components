import type React from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormGroup,
  FormSection,
  Radio,
  Stack,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import {
  retentionSizeSelectOptions,
  RetentionSizeUnits,
  retentionTimeSelectOptions,
  RetentionTimeUnits,
} from "../types";
import type { NewTopic } from "../types";
import { CustomRetentionMessage } from "./CustomRetentionMessage";
import { CustomRetentionSize } from "./CustomRetentionSize";

export type StepMessageRetentionProps = {
  newTopicData: NewTopic;
  onChangeMessageRetention: (topic: NewTopic) => void;
};

export const StepMessageRetention: React.FC<StepMessageRetentionProps> = ({
  newTopicData,
  onChangeMessageRetention,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const [isRetentionTimeSelectOpen, setIsRetentionTimeSelectOpen] =
    useState<boolean>(false);
  const [isRetentionSizeSelectOpen, setIsRetentionSizeSelectOpen] =
    useState<boolean>(false);

  const handleRetentionMessageTime = (value: RetentionTimeUnits) => {
    switch (value) {
      case RetentionTimeUnits.DAY:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: RetentionTimeUnits.DAY,
        });
        break;

      case RetentionTimeUnits.HOUR:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: RetentionTimeUnits.HOUR,
        });
        break;
      case RetentionTimeUnits.MILLISECOND:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: RetentionTimeUnits.MILLISECOND,
        });
        break;
      case RetentionTimeUnits.MINUTE:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: RetentionTimeUnits.MINUTE,
        });
        break;
      case RetentionTimeUnits.SECOND:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: RetentionTimeUnits.SECOND,
        });
        break;
      case RetentionTimeUnits.WEEK:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: RetentionTimeUnits.WEEK,
        });
        break;
      case RetentionTimeUnits.UNLIMITED:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: RetentionTimeUnits.UNLIMITED,
        });
        break;
      case RetentionTimeUnits.CUSTOM:
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 7,
          retentionTimeUnit: RetentionTimeUnits.CUSTOM,
        });
        break;
    }
  };

  const handleRetentionMessageSize = (value: RetentionSizeUnits) => {
    if (value == RetentionSizeUnits.CUSTOM) {
      onChangeMessageRetention({
        ...newTopicData,
        retentionBytes: 1,
        retentionBytesUnit: RetentionSizeUnits.CUSTOM,
      });
    } else {
      onChangeMessageRetention({
        ...newTopicData,
        retentionBytes: 1,
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

  return (
    <>
      <Form onSubmit={(event) => event.preventDefault()}>
        <FormSection
          title={t("message_retention")}
          id="message-retention"
          titleElement={"h2"}
        >
          <TextContent>
            <Text component={TextVariants.p}>
              {t("message_retention_info")}
            </Text>
            <Text component={TextVariants.small}>
              {t("message_retention_info_note")}
            </Text>
          </TextContent>

          <FormGroup
            fieldId="form-group-retention-time-in-wizard"
            label={t("retention_time")}
          >
            <Stack hasGutter>
              <Radio
                isChecked={
                  newTopicData.retentionTimeUnit === RetentionTimeUnits.DAY
                }
                name="radioDay"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.DAY)
                }
                label="A day"
                aria-label="A day"
                id="radio-controlled-1"
                value={RetentionTimeUnits.DAY}
              />
              <Radio
                isChecked={
                  newTopicData.retentionTimeUnit === RetentionTimeUnits.WEEK
                }
                name="radioWeek"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.WEEK)
                }
                label="A week"
                aria-label="A week"
                id="radio-controlled-2"
                value={RetentionTimeUnits.WEEK}
              />
              <Radio
                isChecked={
                  newTopicData.retentionTimeUnit === RetentionTimeUnits.CUSTOM
                }
                name="radioCustomTime"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.CUSTOM)
                }
                label="Custom duration"
                aria-label="custom input"
                id="radio-controlled-4"
                value={RetentionTimeUnits.CUSTOM}
              />
              {newTopicData.retentionTimeUnit === RetentionTimeUnits.CUSTOM && (
                <CustomRetentionMessage
                  name="retention-ms"
                  topicData={newTopicData}
                  setTopicData={onChangeMessageRetention}
                  onToggle={onRetentionTimeToggle}
                  isOpen={isRetentionTimeSelectOpen}
                  selectOptions={retentionTimeSelectOptions}
                />
              )}
              <Radio
                isChecked={
                  newTopicData.retentionTimeUnit ===
                  RetentionTimeUnits.UNLIMITED
                }
                name="radioUnlimitedTime"
                onChange={() =>
                  handleRetentionMessageTime(RetentionTimeUnits.UNLIMITED)
                }
                label="Unlimited"
                aria-label="Unlimited"
                id="radio-controlled-3"
                value={RetentionTimeUnits.UNLIMITED}
              />
            </Stack>
          </FormGroup>
          <FormGroup
            fieldId="form-group-retention-size-in-wizard"
            label="Retention size"
          >
            <Stack hasGutter>
              <Radio
                isChecked={
                  newTopicData.retentionBytesUnit ===
                  RetentionSizeUnits.UNLIMITED
                }
                name="radioUnlimitedSize"
                onChange={() =>
                  handleRetentionMessageSize(RetentionSizeUnits.UNLIMITED)
                }
                label="Unlimited"
                aria-label="Unlimited"
                id="radio-controlled-6"
                value={RetentionSizeUnits.UNLIMITED}
              />
              <Radio
                isChecked={
                  newTopicData.retentionBytesUnit === RetentionSizeUnits.CUSTOM
                }
                name="radioCustomSize"
                onChange={() =>
                  handleRetentionMessageSize(RetentionSizeUnits.CUSTOM)
                }
                label="Custom size"
                aria-label="custom size"
                id="radio-controlled-5"
                value={RetentionSizeUnits.CUSTOM}
              />
              {newTopicData.retentionBytesUnit ===
                RetentionSizeUnits.CUSTOM && (
                <CustomRetentionSize
                  name="retention-bytes"
                  topicData={newTopicData}
                  setTopicData={onChangeMessageRetention}
                  onToggle={onRetentionSizeToggle}
                  isOpen={isRetentionSizeSelectOpen}
                  selectOptions={retentionSizeSelectOptions}
                />
              )}
            </Stack>
          </FormGroup>
        </FormSection>
      </Form>
    </>
  );
};
