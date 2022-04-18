import { useTranslation } from "react-i18next";
import { ResourceTypeValue } from "./ResourceType";
import { ResourcePrefixRuleValue } from "./ResourcePrefixRule";
import { AsyncTypeaheadSelect } from "../../../shared";

type ResourceNameProps = {
  value: string | undefined;
  onChangeValue: (value: string | undefined) => void;
  onCreate: (value: string) => void;
  onFetchOptions: (filter: string) => Promise<string[]>;
  submitted: boolean;
  resourceType: ResourceTypeValue | undefined;
  resourcePrefixRule: ResourcePrefixRuleValue;
};

export const ResourceName: React.VFC<ResourceNameProps> = ({
  value,
  onChangeValue,
  submitted,
  resourceType,
  resourcePrefixRule,
  onCreate,
  onFetchOptions,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const validationCheck = (
    resourceType: ResourceTypeValue | undefined,
    resourcePreixCondition: "starts-with" | "is",
    filter: string | undefined
  ) => {
    const regExp = new RegExp("^[0-9A-Za-z_.-]+$");

    if (filter === undefined || filter === "")
      return { isValid: true, message: undefined };
    if (resourcePreixCondition == "is" && resourceType == "topic") {
      if (filter == "." || filter == "..")
        return {
          isValid: false,
          message: t("resourcePrefix.invalid_topic_length"),
        };
    }
    if (resourceType == "topic" && !regExp.test(filter))
      return {
        isValid: false,
        message: t("resourcePrefix.invalid_topic"),
      };

    if (resourceType == "consumer-group" && !regExp.test(filter))
      return {
        isValid: false,
        message: t("resourcePrefix.invalid_consumer_group"),
      };
    if (filter.length > 32)
      return { isValid: false, message: t("resourcePrefix.invalid_length") };

    return { isValid: true, message: undefined };
  };

  const onValidation = (filter: string | undefined) => {
    const validationMessage = validationCheck(
      resourceType,
      resourcePrefixRule,
      filter
    );
    return validationMessage;
  };

  return (
    <AsyncTypeaheadSelect
      id="resource-name"
      ariaLabel={
        resourcePrefixRule === "is"
          ? t("resourcePrefix.name_aria_label", { resourceType })
          : t("resourcePrefix.prefix_aria_label", { resourceType })
      }
      value={value}
      placeholderText={
        resourcePrefixRule === "is"
          ? t("resourcePrefix.placeholder_text_is")
          : t("resourcePrefix.placeholder_text_starts_with")
      }
      onChange={onChangeValue}
      onCreate={onCreate}
      required={true}
      submitted={submitted}
      onFetchOptions={onFetchOptions}
      onValidationCheck={onValidation}
    />
  );
};
