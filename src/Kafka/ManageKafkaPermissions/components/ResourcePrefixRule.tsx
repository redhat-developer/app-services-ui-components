import type { SelectProps } from "@patternfly/react-core";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export type ResourcePrefixRuleValue = "Is" | "Starts with";

type ResourcePrefixRuleProps = {
  value: ResourcePrefixRuleValue;
  onChangeValue: (value: ResourcePrefixRuleValue) => void;
  initialOpen?: boolean;
};

export const ResourcePrefixRule: React.VFC<ResourcePrefixRuleProps> = ({
  value,
  onChangeValue,
  initialOpen = false,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const resourcePrefixRuleOptions: {
    [key in ResourcePrefixRuleValue]: { label: string; description: string };
  } = {
    "Starts with": {
      label: t("resource_prefix_rule.starts_with"),
      description: t("resource_prefix_rule.starts_with_description"),
    },
    Is: {
      label: t("resource_prefix_rule.is"),
      description: t("resource_prefix_rule.is_description"),
    },
  };

  const onToggle = (value: boolean) => {
    setIsOpen(value);
  };
  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeValue(selection as ResourcePrefixRuleValue);
    setIsOpen(false);
  };
  const makeOptions = () => {
    return Object.entries(resourcePrefixRuleOptions).map(
      ([key, { label, description }]) => (
        <SelectOption key={key} value={key} description={description}>
          {label}
        </SelectOption>
      )
    );
  };

  return (
    <Select
      id={"resource-prefix-rule-select"}
      aria-label={t("resource_prefix_rule.aria_label", { value })}
      data-testid="acls-resource-prefix-rule-select"
      variant={SelectVariant.single}
      onToggle={onToggle}
      onSelect={onSelect}
      isOpen={isOpen}
      width={150}
      selections={value}
      menuAppendTo={"parent"}
    >
      {makeOptions()}
    </Select>
  );
};
