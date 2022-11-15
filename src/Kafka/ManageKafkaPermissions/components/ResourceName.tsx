import { useTranslation } from "react-i18next";
import type { ResourceTypeValue } from "./ResourceType";
import type { ResourcePrefixRuleValue } from "./ResourcePrefixRule";
import { AsyncTypeaheadSelect } from "../../../shared";

type ResourceNameProps = {
  value: string | undefined;
  onChangeValue: (value: string | undefined) => void;
  onFetchOptions: (filter: string) => string[];
  submitted: boolean;
  resourceType: ResourceTypeValue | undefined;
  resourcePrefixRule: ResourcePrefixRuleValue;
  setIsNameValid: (value: boolean) => void;
};

export const ResourceName: React.VFC<ResourceNameProps> = ({
  value,
  onChangeValue,
  submitted,
  resourceType,
  resourcePrefixRule,
  onFetchOptions,
  setIsNameValid,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const validationCheck = (
    resourceType: ResourceTypeValue | undefined,
    resourcePreixCondition: "Starts with" | "Is",
    filter: string | undefined
  ) => {
    const regExp = new RegExp("^[0-9A-Za-z_.-]+$");

    if (filter === undefined || filter === "")
      return { isValid: true, message: undefined };
    if (resourcePreixCondition == "Is" && resourceType == "topic") {
      if (filter == "." || filter == "..")
        return {
          isValid: false,
          message: t("resourcePrefix.invalid_topic_name"),
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
    setIsNameValid(validationMessage.isValid);
    return validationMessage;
  };

  return (
    <AsyncTypeaheadSelect
      id="resource-name"
      ariaLabel={
        resourcePrefixRule === "Is"
          ? t("resourcePrefix.aria_label_name_is", { value: resourceType })
          : t("resourcePrefix.aria_label_name_starts_with", {
              value: resourceType,
            })
      }
      value={value}
      placeholderText={
        resourcePrefixRule === "Is"
          ? t("resourcePrefix.placeholder_name_is")
          : t("resourcePrefix.placeholder_name_starts_with")
      }
      onChange={onChangeValue}
      required={true}
      submitted={submitted}
      onFetchOptions={onFetchOptions}
      onValidationCheck={onValidation}
    />
  );
};
