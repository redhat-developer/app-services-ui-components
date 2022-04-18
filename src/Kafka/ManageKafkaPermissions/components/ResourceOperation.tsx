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

type ResourceOperationValue =
  | "all"
  | "read"
  | "write"
  | "create"
  | "delete"
  | "alter"
  | "describe"
  | "describe-configs"
  | "alter-configs";

type ResourceOperationProps = {
  value: ResourceOperationValue | undefined;
  onChangeValue: (value: ResourceOperationValue | undefined) => void;
  initialOpen?: boolean;
  invalid: boolean;
};

export const ResourceOperation: React.VFC<ResourceOperationProps> = ({
  value,
  onChangeValue,
  initialOpen = false,
  invalid,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const resourceTypeOptions: { [key in ResourceOperationValue]: string } = {
    all: t("operations.all"),
    read: t("operations.read"),
    write: t("operations.write"),
    create: t("operations.create"),
    delete: t("operations.delete"),
    alter: t("operations.alter"),
    describe: t("operations.describe"),
    "describe-configs": t("operations.describe_configs"),
    "alter-configs": t("operations.alter_configs"),
  };
  const onToggle = (value: boolean) => {
    setIsOpen(value);
  };
  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeValue(selection as ResourceOperationValue);
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
      fieldId={"resource-operation-select"}
    >
      <Select
        id={"resource-operation-select"}
        aria-label={t("operations.aria_label")}
        data-testid="acls-resource-operation-select"
        variant={SelectVariant.single}
        onToggle={onToggle}
        onSelect={onSelect}
        isOpen={isOpen}
        width={200}
        placeholderText={t("operations.placeholder_text")}
        validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
        selections={value}
        menuAppendTo={"parent"}
      >
        {makeOptions()}
      </Select>
    </FormGroup>
  );
};
