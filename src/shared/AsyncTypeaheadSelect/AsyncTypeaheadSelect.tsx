import type { SelectProps } from "@patternfly/react-core";
import {
  FormGroup,
  Select,
  SelectOption,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import type { VFC } from "react";
import { useRef, useState } from "react";
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
  onFetchOptions: (filter: string) => Promise<string[]>;
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
  const [loading, setLoading] = useState<boolean>(false);
  const [typeAheadSuggestions, setTypeAheadSuggestions] = useState<string[]>(
    []
  );
  const [validation, setValidation] = useState<Validation | undefined>();
  const [filterValue, setFilterValue] = useState<string | undefined>(undefined);

  const fetchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );
  const onTypeahead = (filter: string | undefined) => {
    setFilterValue(filter);
    function doFetch() {
      onFetchOptions(filter || "")
        .then(setTypeAheadSuggestions)
        .finally(() => setLoading(false));
    }
    setLoading(true);
    if (filter !== undefined) {
      setValidation(onValidationCheck(filter));
      setTypeAheadSuggestions([]);
    }
    if (fetchTimeout.current) {
      clearTimeout(fetchTimeout.current);
      fetchTimeout.current = undefined;
    }
    fetchTimeout.current = setTimeout(doFetch, 300);
  };

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    onChange(value as string);
  };
  const onToggle = (newState: boolean) => {
    submitted && required
      ? setValidation({ isValid: false, message: t("common:required") })
      : null;
    setIsOpen((isOpen) => {
      if (isOpen !== newState && newState === true) {
        onTypeahead(undefined);
      }
      return newState;
    });
  };
  const clearSelection = () => {
    onChange(undefined);
    submitted && required
      ? setValidation({ isValid: false, message: t("common:required") })
      : setValidation({ isValid: true, message: undefined });
    setIsOpen(false);
  };

  const isCreatable = !loading && validation && validation.isValid;

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
  const onCreateOption = (value: string) => {
    setIsOpen(false);
    setValidation(onValidationCheck(value, true));
  };
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
        loadingVariant={loading ? "spinner" : undefined}
        placeholderText={placeholderText}
        isCreatable={isCreatable}
        menuAppendTo="parent"
        validated={formGroupValidated}
        maxHeight={400}
        onCreateOption={onCreateOption}
        createText={t("resourcePrefix.create_text")}
        onTypeaheadInputChanged={onTypeahead}
        onFilter={() => undefined}
      >
        {typeAheadSuggestions.map((value, index) => (
          <SelectOption key={index} value={value} isDisabled={loading}>
            {value}
          </SelectOption>
        ))}
      </Select>
    </FormGroup>
  );
};
