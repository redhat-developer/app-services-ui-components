import type React from "react";
import { useTranslation } from "react-i18next";
import {
  TextContent,
  Text,
  TextVariants,
  NumberInput,
  FormGroup,
  Form,
  FormSection,
} from "@patternfly/react-core";
import type { NumberInputProps } from "@patternfly/react-core";
import type { NewTopic } from "../types";

export type StepPartitionsProps = {
  newTopicData: NewTopic;
  onPartitionsChange: (value: NewTopic) => void;
  availablePartitionLimit: number;
};

export const StepPartitions: React.FC<StepPartitionsProps> = ({
  newTopicData,
  onPartitionsChange,
  availablePartitionLimit,
}) => {
  const { t } = useTranslation(["create-topic"]);

  const handleOnPlus = () => {
    onPartitionsChange({
      ...newTopicData,
      numPartitions: newTopicData.numPartitions + 1,
    });
  };

  const handleOnMinus = () => {
    onPartitionsChange({
      ...newTopicData,
      numPartitions: newTopicData.numPartitions - 1,
    });
  };

  const handlePartitionTouchspinChange: NumberInputProps["onChange"] = (
    event
  ) => {
    onPartitionsChange({
      ...newTopicData,
      numPartitions: Number((event.target as HTMLInputElement).value),
    });
  };
  const onBlur = () => {
    if (newTopicData.numPartitions < 1)
      onPartitionsChange({ ...newTopicData, numPartitions: 1 });
  };

  return (
    <Form>
      <FormSection title={t("partitions")} id="partitions" titleElement={"h2"}>
        <TextContent>
          <Text component={TextVariants.p}>{t("partition_info")}</Text>
          <Text component={TextVariants.small}>{t("partition_info_note")}</Text>
        </TextContent>

        <FormGroup
          label="Partitions"
          fieldId="step-topic-name-form"
          helperText={
            newTopicData.numPartitions >= availablePartitionLimit
              ? t("partitions_warning")
              : t("partition_helper_text")
          }
          validated={
            newTopicData.numPartitions >= availablePartitionLimit
              ? "warning"
              : "default"
          }
          isRequired
        >
          <NumberInput
            onPlus={handleOnPlus}
            onMinus={handleOnMinus}
            value={Number(newTopicData.numPartitions)}
            inputName="input"
            onChange={handlePartitionTouchspinChange}
            widthChars={20}
            onBlur={onBlur}
          />
        </FormGroup>
      </FormSection>
    </Form>
  );
};
