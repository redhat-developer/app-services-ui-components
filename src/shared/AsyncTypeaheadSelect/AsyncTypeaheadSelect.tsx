import {
  FormGroup,
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useRef, useState, VFC } from "react";
import { useTranslation } from "react-i18next";
import { useDebounce } from "../../utils";

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
  onValidationCheck: (filterValue: string | undefined) => Validation;
};

export const AsyncTypeaheadSelect: VFC<AsyncTypeaheadSelectProps> = ({
  id,
  value,
  ariaLabel,
  onChange,
  onFetchOptions,
  placeholderText,
  onValidationCheck,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [typeAheadSuggestions, setTypeAheadSuggestions] = useState<string[]>(
    []
  );
  const [validation, setValidation] = useState<Validation | undefined>();
  const latestFilter = useRef(value);

  const doFilter = (filter: string) => {
    if (filter !== latestFilter.current) {
      latestFilter.current = filter;

      setLoading(true);
      onFetchOptions(filter)
        .then(setTypeAheadSuggestions)
        .finally(() => setLoading(false));
    }
  };

  const onTypeahead: SelectProps["onFilter"] = (_, filter) => {
    const validation = onValidationCheck(filter);
    setValidation(validation);
    doFilter(filter);

    return undefined;
  };
  const debouncedOnQuery = useDebounce(onTypeahead, 1000);

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    onChange(value as string);
  };
  const onToggle = (newState: boolean) => {
    setIsOpen(newState);
    if (newState === true) {
      doFilter("");
    }
  };
  const clearSelection = () => {
    onChange(undefined);
    setIsOpen(false);
  };

  const onCreateOption = (newValue: string) => {
    onChange(newValue);
  };

  const validated =
    validation && !validation.isValid
      ? ValidatedOptions.error
      : ValidatedOptions.default;

  return (
    <FormGroup
      validated={validated}
      helperTextInvalid={validation?.message}
      fieldId={id}
      style={{ maxWidth: 200 }}
    >
      <Select
        id={id}
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel={ariaLabel}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={value}
        isOpen={isOpen}
        loadingVariant={loading ? "spinner" : undefined}
        placeholderText={placeholderText}
        isCreatable={!validation?.isValid ? false : true}
        menuAppendTo="parent"
        validated={validated}
        maxHeight={400}
        width={200}
        onCreateOption={onCreateOption}
        createText={t("resourcePrefix.create_text")}
        onFilter={debouncedOnQuery}
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
