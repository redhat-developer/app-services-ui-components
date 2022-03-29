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

export type ResourcePrefixProps = {
  value: string | undefined;
  onChange: (value: string | undefined) => void;
  invalid: boolean;
  resourceCondition: "Starts with" | "Is";
  onFetchOptions: () => Promise<string[]>;
};

export const ResourcePrefix: React.VFC<ResourcePrefixProps> = ({
  value,
  onChange,
  invalid,
  resourceCondition,
  onFetchOptions,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [typeAheadSuggestions, setTypeAheadSuggestions] = useState<string[]>(
    []
  );
  const [filter, setFilter] = useState<string>();

  useEffect(() => {
    onFetchOptions().then((results: string[]) =>
      setTypeAheadSuggestions(results)
    );
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

  return (
    <FormGroup
      validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
      helperTextInvalid={t("common:required")}
      fieldId={"resource-prefix-select"}
    >
      <Select
        id={"resource-prefix-select"}
        data-testid="acls-prefix-select"
        variant={SelectVariant.typeahead}
        typeAheadAriaLabel={t("resourcePrefix.prefix_aria_label")}
        onToggle={onToggle}
        onSelect={onSelect}
        onClear={clearSelection}
        selections={value}
        isOpen={isOpen}
        placeholderText={
          resourceCondition === "Starts with"
            ? t("resourcePrefix.placeholder_text_starts_with")
            : t("resourcePrefix.placeholder_text_is")
        }
        isCreatable={false}
        menuAppendTo="parent"
        validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
        maxHeight={400}
        width={200}
        onTypeaheadInputChanged={(value) => setFilter(value)}
      >
        {makeOptions()}
      </Select>
    </FormGroup>
  );
};
