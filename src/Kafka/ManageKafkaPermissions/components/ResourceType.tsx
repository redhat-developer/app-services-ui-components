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
  onChangeValue: (value: string | undefined) => void;
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
  const resourceTypeOptions = [
    t("resourceTypes.consumer_group"),
    t("resourceTypes.topic"),
    t("resourceTypes.kafka_instance"),
    t("resourceTypes.transactional_id"),
  ];
  const onToggle = (value: boolean) => {
    setIsOpen(value);
  };
  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeValue(selection as string);
    setIsOpen(false);
  };
  const makeOptions = () => {
    return resourceTypeOptions.map((value, index) => (
      <SelectOption key={index} value={value}></SelectOption>
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
