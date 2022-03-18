import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";

type ResourceTypeValue =
  | "Topic"
  | "Consumer group"
  | "Kafka instance"
  | "Transactional ID";

type ResourceTypeProps = {
  value: ResourceTypeValue | undefined;
  onChangeValue: (value: ResourceTypeValue | undefined) => void;
  initialOpen?: boolean;
  invalid: boolean;
};

export const ResourceType: React.VFC<ResourceTypeProps> = ({
  value,
  onChangeValue,
  initialOpen = false,
  invalid,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const resourceTypeOptions: { [key in ResourceTypeValue]: string } = {
    "Consumer group": t("resourceTypes.consumer_group"),
    Topic: t("resourceTypes.topic"),
    "Kafka instance": t("resourceTypes.kafka_instance"),
    "Transactional ID": t("resourceTypes.transactional_id"),
  };
  const onToggle = (value: boolean) => {
    setIsOpen(value);
  };
  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeValue(selection as ResourceTypeValue);
    setIsOpen(false);
  };
  const makeOptions = () => {
    return Object.entries(resourceTypeOptions).map(([value, label]) => (
      <SelectOption key={value} value={value}>
        {label}
      </SelectOption>
    ));
  };

  return (
    <FormGroup
      validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
      helperTextInvalid={t("common:required")}
      fieldId={"resource-type-select"}
    >
      <Select
        id={"resource-type-select"}
        data-testid="acls-resource-type-select"
        variant={SelectVariant.single}
        onToggle={onToggle}
        onSelect={onSelect}
        isOpen={isOpen}
        width={200}
        placeholderText={t("resourceTypes.placeholder_text")}
        validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
        selections={value}
        menuAppendTo={"parent"}
      >
        {makeOptions()}
      </Select>
    </FormGroup>
  );
};
