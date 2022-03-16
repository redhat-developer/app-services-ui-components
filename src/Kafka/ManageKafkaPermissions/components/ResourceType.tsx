import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";

export type ResourceTypeProps = {
  resourceTypeValue: string | undefined;
  onChangeValue: (value: string | undefined) => void;
  initialOpen?: boolean;
};

export const ResourceType: React.VFC<ResourceTypeProps> = ({
  resourceTypeValue,
  onChangeValue,
  initialOpen = false,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
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
    if (value === false && resourceTypeValue == undefined) setIsDirty(true);
  };
  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeValue(selection as string);
    setIsDirty(false);
    setIsOpen(false);
  };
  const makeOptions = () => {
    return resourceTypeOptions.map((value, index) => (
      <SelectOption key={index} value={value}></SelectOption>
    ));
  };

  const validation: ValidatedOptions = isDirty
    ? ValidatedOptions.error
    : ValidatedOptions.default;
  return (
    <Select
      id={"resource-type-select"}
      data-testid="acls-resource-type-select"
      variant={SelectVariant.single}
      onToggle={onToggle}
      onSelect={onSelect}
      isOpen={isOpen}
      width={200}
      placeholderText={t("resourceTypes.placeholder_text")}
      validated={validation}
      selections={resourceTypeValue}
      menuAppendTo={"parent"}
    >
      {makeOptions()}
    </Select>
  );
};
