import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
} from "@patternfly/react-core";

type ResourcePermissionValue = "allow" | "deny";

type ResourcePermissionProps = {
  value: ResourcePermissionValue;
  onChangeValue: (value: ResourcePermissionValue) => void;
  initialOpen?: boolean;
};

export const ResourcePermission: React.VFC<ResourcePermissionProps> = ({
  value,
  onChangeValue,
  initialOpen = false,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const resourcePermissionOptions: {
    [key in ResourcePermissionValue]: string;
  } = {
    allow: t("permissions.allow"),
    deny: t("permissions.deny"),
  };
  const onToggle = (value: boolean) => {
    setIsOpen(value);
  };
  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeValue(selection as ResourcePermissionValue);
    setIsOpen(false);
  };
  const makeOptions = () => {
    return Object.entries(resourcePermissionOptions).map(([value, label]) => (
      <SelectOption key={value} value={value}>
        {label}
      </SelectOption>
    ));
  };

  return (
    <FormGroup fieldId={"resource-permission-select"}>
      <Select
        id={"resource-permission-select"}
        aria-label={t("permissions.aria_label")}
        data-testid="acls-resource-type-select"
        variant={SelectVariant.single}
        onToggle={onToggle}
        onSelect={onSelect}
        isOpen={isOpen}
        width={200}
        placeholderText={t("resourceTypes.placeholder_text")}
        selections={value}
        menuAppendTo={"parent"}
      >
        {makeOptions()}
      </Select>
    </FormGroup>
  );
};
