import {
  FormGroup,
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
  ValidatedOptions,
} from "@patternfly/react-core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ResourceTypeValue } from "../../Kafka/ManageKafkaPermissions/components/ResourceType";

export type AsyncTypeaheadSelectProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  invalid: boolean;
  onFetchOptions: () => Promise<string[]>;
  placeholderText: string;
  onValidationCheck: (filterValue: string | undefined) => string | undefined;
  resourceType: ResourceTypeValue | undefined;
};

export const AsyncTypeaheadSelect: React.VFC<AsyncTypeaheadSelectProps> = ({
  value,
  onChange,
  invalid,
  onFetchOptions,
  placeholderText,
  onValidationCheck,
  resourceType,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [typeAheadSuggestions, setTypeAheadSuggestions] = useState<string[]>(
    []
  );
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    setLoading(true);
    onFetchOptions().then((results: string[]) => {
      setTypeAheadSuggestions(results);
      setLoading(false);
    });
  }, [onFetchOptions, filter]);

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    onChange(value as string);
  };
  const onToggle = (newState: boolean) => {
    setIsOpen(newState);
  };
  const clearSelection = () => {
    onChange(undefined);
    setIsOpen(false);
  };
  const makeOptions = () => {
    return typeAheadSuggestions.map((value, index) => (
      <SelectOption key={index} value={value}>
        {value}
      </SelectOption>
    ));
  };
  const onCreateOption = (newValue: string) => {
    onChange(newValue);
  };

  return (
    <FormGroup
      validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
      helperTextInvalid={onValidationCheck(filter)}
      fieldId={"resource-prefix-select"}
      style={{ maxWidth: 200 }}
    >
      <Select
        id={"resource-prefix-select"}
        data-testid="acls-prefix-select"
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel={
          resourceType == undefined
            ? t("resourcePrefix.prefix_aria_label")
            : t("resourcePrefix.select_prefix_aria_abel", resourceType)
        }
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={value}
        isOpen={isOpen}
        loadingVariant={loading ? "spinner" : undefined}
        placeholderText={placeholderText}
        isCreatable={true}
        menuAppendTo="parent"
        validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
        maxHeight={400}
        width={200}
        onTypeaheadInputChanged={(value) => setFilter(value)}
        onCreateOption={onCreateOption}
        createText={t("resourcePrefix.create_text")}
      >
        {makeOptions()}
      </Select>
    </FormGroup>
  );
};
