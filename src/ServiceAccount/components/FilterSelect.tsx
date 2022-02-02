import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Select,
  SelectOption,
  SelectOptionObject,
  SelectVariant,
} from "@patternfly/react-core";
import { SearchType } from "./types";

export type FilterSelectProps = {
  value: SearchType;
  onChange: (value: SearchType) => void;
};

export const FilterSelect: React.FunctionComponent<FilterSelectProps> = ({
  onChange,
  value,
}) => {
  const { t } = useTranslation();
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const onToggle = () => {
    setIsFilterExpanded(!isFilterExpanded);
  };

  const onSelect = (
    _event: React.MouseEvent | React.ChangeEvent,
    selection: string | SelectOptionObject
  ) => {
    setIsFilterExpanded(!isFilterExpanded);
    onChange(selection as SearchType);
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

  return (
    <Select
      variant={SelectVariant.single}
      aria-label="Select filter"
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
  );
};
