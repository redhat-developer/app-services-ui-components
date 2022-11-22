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
  const [typeAheadSuggestions, setTypeAheadSuggestions] = useState<string[]>(
    onFetchOptions("")
  );
  const [validation, setValidation] = useState<Validation | undefined>();
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);
  const fetchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const onTypeahead = (filter: string | undefined) => {
    setValidation(onValidationCheck(filter));
    function fetchSuggestions() {
      filter != undefined
        ? setTypeAheadSuggestions(onFetchOptions(filter))
        : setTypeAheadSuggestions(onFetchOptions(""));
    }
    if (fetchTimeout.current) {
      clearTimeout(fetchTimeout.current);
      fetchTimeout.current = undefined;
    }
    fetchTimeout.current = setTimeout(fetchSuggestions, 300);
  };

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    setValidation(onValidationCheck(value as string));
    onChange(value as string);
    onToggle(false);
    setFilterValue(value as string);
  };
  const onToggle = (newState: boolean) => {
    submitted && required && (value == "" || value == undefined)
      ? setValidation({ isValid: false, message: t("common:required") })
      : null;
    setIsOpen((isOpen) => {
      if (isOpen !== newState && newState === true) {
        onChange(undefined);
      }
      return newState;
    });
  };
  const clearSelection = () => {
    onChange(undefined);
    submitted && required
      ? setValidation({ isValid: false, message: t("common:required") })
      : setValidation({ isValid: true, message: undefined });
  };

  //const isCreatable = validation && validation.isValid;

  const formGroupValidated =
    submitted &&
    required &&
    (value === undefined || value === "") &&
    (filterValue === undefined || filterValue === "")
      ? ValidatedOptions.error
      : validation && !validation.isValid
      ? ValidatedOptions.error
      : ValidatedOptions.default;

  const formGroupValidatedText =
    submitted &&
    required &&
    (value === undefined || value === "") &&
    (filterValue === undefined || filterValue === "")
      ? t("common:required")
      : validation?.message;

  return (
    <FormGroup
      validated={formGroupValidated}
      helperTextInvalid={formGroupValidatedText}
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
        isCreatable={true}
        menuAppendTo={document.body}
        validated={formGroupValidated}
        maxHeight={400}
        width={170}
        onFilter={() => undefined}
        createText={t("resourcePrefix.create_text")}
      >
        {typeAheadSuggestions.map((value, index) => (
          <SelectOption key={index} value={value}>
            {value}
          </SelectOption>
        ))}
      </Select>
    </FormGroup>
  );
};
