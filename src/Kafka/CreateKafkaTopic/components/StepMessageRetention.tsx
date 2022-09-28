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
  retentionTimeSelectOptions,
} from "../types";
import type { RetentionSizeUnits, RetentionTimeUnits } from "../types";
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
      case "days":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: "days",
        });
        break;

      case "hours":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: "hours",
        });
        break;
      case "milliseconds":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: "milliseconds",
        });
        break;
      case "minutes":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: "minutes",
        });
        break;
      case "seconds":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: "seconds",
        });
        break;
      case "weeks":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: "weeks",
        });
        break;
      case "unlimited":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 1,
          retentionTimeUnit: "unlimited",
        });
        break;
      case "custom":
        onChangeMessageRetention({
          ...newTopicData,
          retentionTime: 7,
          retentionTimeUnit: "custom",
        });
        break;
    }
  };

  const handleRetentionMessageSize = (value: RetentionSizeUnits) => {
    if (value == "custom") {
      onChangeMessageRetention({
        ...newTopicData,
        retentionBytes: 1,
        retentionBytesUnit: "custom",
      });
    } else {
      onChangeMessageRetention({
        ...newTopicData,
        retentionBytes: 1,
        retentionBytesUnit: "unlimited",
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
                isChecked={newTopicData.retentionTimeUnit === "days"}
                name="radioDay"
                onChange={() => handleRetentionMessageTime("days")}
                label="A day"
                aria-label="A day"
                id="radio-controlled-1"
                value={"days"}
              />
              <Radio
                isChecked={newTopicData.retentionTimeUnit === "weeks"}
                name="radioWeek"
                onChange={() => handleRetentionMessageTime("weeks")}
                label="A week"
                aria-label="A week"
                id="radio-controlled-2"
                value={"weeks"}
              />
              <Radio
                isChecked={newTopicData.retentionTimeUnit === "custom"}
                name="radioCustomTime"
                onChange={() => handleRetentionMessageTime("custom")}
                label="Custom duration"
                aria-label="custom input"
                id="radio-controlled-4"
                value={"custom"}
              />
              {newTopicData.retentionTimeUnit === "custom" && (
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
                isChecked={newTopicData.retentionTimeUnit === "unlimited"}
                name="radioUnlimitedTime"
                onChange={() => handleRetentionMessageTime("unlimited")}
                label="Unlimited time"
                aria-label="Unlimited"
                id="radio-controlled-3"
                value={"unlimited"}
              />
            </Stack>
          </FormGroup>
          <FormGroup
            fieldId="form-group-retention-size-in-wizard"
            label="Retention size"
          >
            <Stack hasGutter>
              <Radio
                isChecked={newTopicData.retentionBytesUnit === "unlimited"}
                name="radioUnlimitedSize"
                onChange={() => handleRetentionMessageSize("unlimited")}
                label="Unlimited size"
                aria-label="Unlimited"
                id="radio-controlled-6"
                value={"unlimited"}
              />
              <Radio
                isChecked={newTopicData.retentionBytesUnit === "custom"}
                name="radioCustomSize"
                onChange={() => handleRetentionMessageSize("custom")}
                label="Custom size"
                aria-label="custom size"
                id="radio-controlled-5"
                value={"custom"}
              />
              {newTopicData.retentionBytesUnit === "custom" && (
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
