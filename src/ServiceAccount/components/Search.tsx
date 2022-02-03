import { InputGroup, ToolbarItem } from "@patternfly/react-core";
import React, { useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FilterSelect } from "./FilterSelect";
import { SearchInput } from "./SearchInput";
import { SearchType } from "./types";

export type SearchProps = {
  onSearch: (category: SearchType, value: string) => void;
};

export const Search: VoidFunctionComponent<SearchProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [category, setCategory] = useState<SearchType>("description");
  const labels: {
    [category in SearchType]: { placeholder: string; errorMessage: string };
  } = {
    owner: {
      placeholder: t("kafka:filter_by_owner"),
      errorMessage: t("kafka:owner_field_invalid_message"),
    },
    description: {
      placeholder: t("kafka:filter_by_short_description"),
      errorMessage: t("kafka:input_field_invalid_message"),
    },
    clientid: {
      placeholder: t("kafka:filter_by_client_id"),
      errorMessage: t("kafka:input_field_invalid_message"),
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
          onSearch={(value) => onSearch(category, value)}
        />
      </InputGroup>
    </ToolbarItem>
  );
};
