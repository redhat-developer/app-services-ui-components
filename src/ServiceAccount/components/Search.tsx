import { InputGroup, ToolbarItem } from "@patternfly/react-core";
import React, { useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FilterSelect } from "./FilterSelect";
import { SearchInput } from "./SearchInput";
import { SearchCategory } from "./types";

export type SearchProps = {
  onSearch: (category: SearchCategory, value: string) => void;
};

export const Search: VoidFunctionComponent<SearchProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [category, setCategory] = useState<SearchCategory>("description");
  const labels: {
    [category in SearchCategory]: {
      placeholder: string;
      errorMessage: string;
      validate: (value: string) => boolean;
    };
  } = {
    owner: {
      placeholder: t("kafka:filter_by_owner"),
      errorMessage: t("kafka:owner_field_invalid_message"),
      validate: (value: string) => {
        return !/["$^<>|+%/;:,\s*=~#()]/.test(value);
      },
    },
    description: {
      placeholder: t("kafka:filter_by_short_description"),
      errorMessage: t("kafka:input_field_invalid_message"),
      validate: (value: string) => {
        return /^[a-z]([-a-z0-9]*[a-z0-9])?$/.test(value);
      },
    },
    clientid: {
      placeholder: t("kafka:filter_by_client_id"),
      errorMessage: t("kafka:input_field_invalid_message"),
      validate: (value: string) => {
        return !/["$^<>|+%/;:,\s*=~#()]/.test(value);
      },
    },
  };
  return (
    <ToolbarItem>
      <InputGroup>
        <FilterSelect value={category} onChange={setCategory} />
        <SearchInput
          key={category}
          placeholder={labels[category].placeholder}
          errorMessage={labels[category].errorMessage}
          validate={labels[category].validate}
          onSearch={(value) => onSearch(category, value)}
        />
      </InputGroup>
    </ToolbarItem>
  );
};
