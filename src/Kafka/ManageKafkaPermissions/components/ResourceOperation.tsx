import { useLayoutEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import type { SelectProps } from "@patternfly/react-core";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";

export type ResourceOperationValue =
  | "All"
  | "Read"
  | "Write"
  | "Create"
  | "Delete"
  | "Alter"
  | "Describe"
  | "Describe configs"
  | "Alter configs";

type ResourceOperationProps = {
  value: ResourceOperationValue | undefined;
  onChangeValue: (value: ResourceOperationValue | undefined) => void;
  initialOpen?: boolean;
  invalid: boolean;
  resourceTypeOptions: string[];
};

export const ResourceOperation: React.VFC<ResourceOperationProps> = ({
  value,
  onChangeValue,
  initialOpen = false,
  invalid,
  resourceTypeOptions,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // for Storybook, allows opening the select programmatically respecting the initialization needed by the modal and Popper.js
  useLayoutEffect(() => setIsOpen(initialOpen), [initialOpen]);

  const onToggle = (value: boolean) => {
    setIsOpen(value);
  };
  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChangeValue(selection as ResourceOperationValue);
    setIsOpen(false);
  };
  const makeOptions = () => {
    return resourceTypeOptions.map((value, index) => (
      <SelectOption key={index} value={value}>
        {value}
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
        aria-label={t("operations.aria_label", value)}
        data-testid="acls-resource-operation-select"
        variant={SelectVariant.single}
        onToggle={onToggle}
        onSelect={onSelect}
        isOpen={isOpen}
        width={200}
        placeholderText={t("operations.placeholder_text")}
        validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
        selections={value}
        menuAppendTo={document.body}
      >
        {makeOptions()}
      </Select>
    </FormGroup>
  );
};
