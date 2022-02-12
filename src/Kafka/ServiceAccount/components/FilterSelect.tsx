import { FunctionComponent, MouseEvent, ChangeEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectOption,
  SelectOptionObject,
  SelectVariant,
} from "@patternfly/react-core";
import { SearchCategory } from "../types";

export type FilterSelectProps = {
  value: SearchCategory;
  onChange: (value: SearchCategory) => void;
};

export const FilterSelect: FunctionComponent<FilterSelectProps> = ({
  onChange,
  value,
}) => {
  const { t } = useTranslation();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const onToggle = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const onSelect = (
    _event: MouseEvent | ChangeEvent,
    selection: string | SelectOptionObject
  ) => {
    setIsFilterExpanded(!isFilterExpanded);
    onChange(selection as SearchCategory);
  };

  const options = [
    {
      label: t("kafka:short_description"),
      value: "description",
      disabled: false,
    },
    { label: t("kafka:clientID"), value: "clientid", disabled: false },
    { label: t("kafka:owner"), value: "owner", disabled: false },
  ];

  const ariaId = "select_filter_category";

  return (
    <>
      <label hidden id={ariaId}>
        {t("kafka:select_filter_category")}
      </label>
      <Select
        variant={SelectVariant.single}
        aria-labelledby={ariaId}
        onToggle={onToggle}
        selections={value}
        isOpen={isFilterExpanded}
        onSelect={onSelect}
        width={"200px"}
      >
        {options.map((option, index) => (
          <SelectOption
            isDisabled={option.disabled}
            key={index}
            value={option.value}
          >
            {option.label}
          </SelectOption>
        ))}
      </Select>
    </>
  );
};
