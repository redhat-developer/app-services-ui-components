import type React from "react";
import { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Form,
  FormGroup,
  FormSection,
  Text,
  TextContent,
  TextInput,
  TextVariants,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useValidateTopic } from "../types";
import type { NewTopic } from "../types";

export type StepTopicNameProps = {
  newTopicData: NewTopic;
  onTopicNameChange: (value: NewTopic) => void;
  topicNameValidated: ValidatedOptions;
  onValidationCheck: (value: ValidatedOptions) => void;
  invalidText: string;
  setInvalidText: (value: string) => void;
};

export const StepTopicName: React.FC<StepTopicNameProps> = ({
  newTopicData,
  onTopicNameChange,
  topicNameValidated,
  onValidationCheck,
  invalidText,
  setInvalidText,
}) => {
  const { t } = useTranslation(["create-topic"]);
  const { validateName } = useValidateTopic();

  const validationCheck = useCallback(
    (inputValue: string) => {
      const errorMessage = validateName(inputValue);
      if (errorMessage) {
        setInvalidText(errorMessage);
        onValidationCheck(ValidatedOptions.error);
      } else {
        onValidationCheck(ValidatedOptions.default);
      }
    },
    [setInvalidText, onValidationCheck, validateName]
  );

  useEffect(() => {
    validationCheck(newTopicData.name);
  }, [newTopicData.name, validationCheck]);

  const handleTopicNameChange = (value: string) => {
    validationCheck(value);
    onTopicNameChange({ ...newTopicData, name: value });
  };

  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <FormSection title={t("topic_name")} id="topic-name" titleElement={"h2"}>
        <TextContent>
          <Text component={TextVariants.p}>{t("topic_name_info")}</Text>
          <Text component={TextVariants.small}>
            {t("topic_name_info_note")}
          </Text>
        </TextContent>
        <FormGroup
          label={t("topic_name")}
          fieldId="step-topic-name-form"
          helperText={t("topic_name_helper_text")}
          helperTextInvalid={invalidText}
          validated={topicNameValidated}
          isRequired
        >
          <TextInput
            ouiaId={"text-input"}
            isRequired
            type="text"
            id="step-topic-name-input"
            name="step-topic-name"
            value={newTopicData.name}
            onChange={handleTopicNameChange}
            placeholder={t("enter_name")}
            validated={topicNameValidated}
            aria-label={t("topic_nametopic_name")}
          />
        </FormGroup>
      </FormSection>
    </Form>
  );
};
