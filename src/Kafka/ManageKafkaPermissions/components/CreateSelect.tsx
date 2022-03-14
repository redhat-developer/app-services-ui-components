import {
  SelectOption,
  Validated,
  AclPermissionType,
  AclResourceType,
  AclPatternType,
  AclOperation,
} from "../types";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Select as PFSelect } from "@patternfly/react-core/dist/js/components/Select/Select";
import { SelectProps, SelectVariant } from "@patternfly/react-core";
import { SelectOption as PFSelectOption } from "@patternfly/react-core/dist/js/components/Select/SelectOption";
import { FormGroupWithPopover } from "../../../shared";

import { ValidatedOptions } from "@patternfly/react-core";

export type CreateSelectProps<T> = {
  value: string;
  options: SelectOption<T>[];
  selected: Validated<string | undefined>;
  setSelected: (row: number, value: T | undefined, childRow?: number) => void;
  row: number;
  childRow?: number;
  placeholder?: string;
  setEscapeClosesModal: (closes: boolean) => void;
  onSelect: (value: string) => void;
  menuAppendTo:
    | HTMLElement
    | (() => HTMLElement)
    | "parent"
    | "inline"
    | undefined;
  onClear: () => T | undefined;
};

export const CreateSelect = <
  T extends AclPermissionType | AclResourceType | AclPatternType | AclOperation
>({
  options,
  setSelected,
  selected,
  row,
  value,
  placeholder,
  setEscapeClosesModal,
  onSelect,
  menuAppendTo,
  onClear,
  childRow,
}: CreateSelectProps<T>): React.ReactElement => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (newState: boolean) => {
    if (newState) {
      setEscapeClosesModal(false);
    } else {
      setEscapeClosesModal(true);
    }
    setIsOpen(newState);
  };

  const clearSelection = () => {
    setSelected(row, onClear(), childRow);
    setIsOpen(false);
  };

  const select: SelectProps["onSelect"] = (_, select, isPlaceHolder) => {
    if (select === "" || isPlaceHolder) clearSelection();
    else {
      setSelected(row, select as T, childRow);
      setIsOpen(false);
      onSelect(select as T);
    }
  };

  return (
    <FormGroupWithPopover
      labelHead={t(`assign_permissions.popover_head`)}
      fieldId={value}
      labelBody={t(`assign_permissions.popover_label`)}
      buttonAriaLabel={t(`assign_permissions.aria_label`)}
      isRequired={true}
      helperTextInvalid={selected.errorMessage}
      validated={selected.validated || ValidatedOptions.default}
    >
      <PFSelect
        variant={SelectVariant.single}
        onToggle={onToggle}
        onSelect={select}
        selections={selected.value}
        isOpen={isOpen}
        isInputValuePersisted={true}
        placeholderText={placeholder}
        validated={selected.validated || ValidatedOptions.default}
        menuAppendTo={menuAppendTo}
        maxHeight={200}
        direction={"down"}
      >
        {options.map((option, index) => (
          <PFSelectOption
            isDisabled={option.disabled}
            key={index}
            value={option.value}
            {...(option.description && { description: option.description })}
          >
            {option.title}
          </PFSelectOption>
        ))}
      </PFSelect>
    </FormGroupWithPopover>
  );
};
