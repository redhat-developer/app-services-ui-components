import {
  FormGroup,
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useEffect, useRef, useState, VFC } from "react";
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
  onCreate: (value: string) => void;
  onFetchOptions: (filter: string) => Promise<string[]>;
  onValidationCheck: (filterValue: string | undefined) => Validation;
  submitted?: boolean;
  required?: boolean;
};

export const AsyncTypeaheadSelect: VFC<AsyncTypeaheadSelectProps> = ({
  id,
  value,
  ariaLabel,
  onChange,
  onCreate,
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

  const fetchTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined
  );

  useEffect(() => {
    if (submitted && required)
      setValidation({ isValid: false, message: t("common:required") });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submitted]);

  const onTypeahead = (filter: string | undefined) => {
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
    if ((filter === undefined || filter.length < 1) && submitted && required)
      setValidation({ message: t("common:required"), isValid: false });
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
    setIsOpen((isOpen) => {
      if (isOpen !== newState && newState === true) {
        onTypeahead(undefined);
      }
      return newState;
    });
  };
  const clearSelection = () => {
    onChange(undefined);
    setIsOpen(false);
  };

  const formGroupValidated =
    validation && !validation.isValid
      ? ValidatedOptions.error
      : ValidatedOptions.default;
  const isCreatable = !loading && validation && validation.isValid;

  return (
    <FormGroup
      validated={formGroupValidated}
      helperTextInvalid={validation?.message}
      fieldId={id}
    >
      <Select
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
        onCreateOption={onCreate}
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
