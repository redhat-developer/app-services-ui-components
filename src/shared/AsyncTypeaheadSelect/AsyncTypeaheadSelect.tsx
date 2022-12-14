import type { SelectProps } from "@patternfly/react-core";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import type { VFC } from "react";
import { useRef } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export type Validation = {
  message: string | undefined;
  isValid: boolean;
};

export type AsyncTypeaheadSelectProps = {
  id: string;
  value: string | undefined;
  ariaLabel: string;
  placeholderText: string;
  onChange: (value: string | undefined) => void;
  onFetchOptions: (filter: string) => string[];
  onValidationCheck: (
    filterValue: string | undefined,
    isCreated?: boolean
  ) => Validation;
  submitted?: boolean;
  required?: boolean;
};

export const AsyncTypeaheadSelect: VFC<AsyncTypeaheadSelectProps> = ({
  id,
  value,
  ariaLabel,
  onChange,
  onFetchOptions,
  placeholderText,
  onValidationCheck,
  submitted,
  required,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [validation, setValidation] = useState<Validation | undefined>(
    undefined
  );
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const fetchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const onTypeahead = (filter: string | undefined) => {
    setFilterValue(filter);
    setValidation(onValidationCheck(filter));
    if (fetchTimeout.current) {
      clearTimeout(fetchTimeout.current);
      fetchTimeout.current = undefined;
    }
  };

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    setValidation(onValidationCheck(value as string));
    onChange(value as string);
    onToggle(false);
  };
  const onToggle = (newState: boolean) => {
    setIsOpen(newState);
  };
  const clearSelection = () => {
    setIsOpen(false);
    onChange(undefined);
    submitted && required
      ? setValidation({ isValid: false, message: t("common:required") })
      : setValidation({ isValid: true, message: undefined });
  };

  const formValidation =
    validation?.isValid || validation == undefined
      ? ValidatedOptions.default
      : ValidatedOptions.error;

  const onFilter = (filter = "") => {
    const options =
      filter != undefined ? onFetchOptions(filter) : onFetchOptions("");
    return options.map((value, index) => (
      <SelectOption key={index} value={value}>
        {value}
      </SelectOption>
    ));
  };

  return (
    <FormGroup
      onKeyPress={(event) => event.key === "Enter" && event.preventDefault()}
      validated={
        submitted &&
        (((filterValue == "" || filterValue == undefined) && value == "") ||
          value == undefined)
          ? ValidatedOptions.error
          : formValidation
      }
      helperTextInvalid={
        submitted &&
        (filterValue == "" || filterValue == undefined || value == undefined)
          ? t("common:required")
          : validation?.message
      }
      fieldId={id}
    >
      <Select
        aria-describedby={id}
        id={id}
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel={ariaLabel}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={value}
        isOpen={validation && !validation.isValid ? false : isOpen}
        placeholderText={placeholderText}
        onTypeaheadInputChanged={onTypeahead}
        onFilter={(_, value) => onFilter(value)}
        isCreatable={true}
        menuAppendTo={document.body}
        validated={
          submitted &&
          (((filterValue == "" || filterValue == undefined) && value == "") ||
            value == undefined)
            ? ValidatedOptions.error
            : formValidation
        }
        maxHeight={400}
        width={170}
        createText={t("resourcePrefix.create_text")}
      >
        {onFilter()}
      </Select>
    </FormGroup>
  );
};
