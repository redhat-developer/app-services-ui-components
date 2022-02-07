import { ToolbarFilter, ToolbarGroup } from "@patternfly/react-core";
import React, { VoidFunctionComponent } from "react";
import { Search, SearchProps } from "./Search";
import { SearchCategory } from "./types";

type SearchChipsProps = {
  clientIdChips: string[];
  descriptionChips: string[];
  ownerChips: string[];
  onSearch: SearchProps["onSearch"];
  onDeleteChip: (category: SearchCategory, value: string) => void;
  onDeleteChipGroup: (category: SearchCategory) => void;
};

export const SearchChips: VoidFunctionComponent<SearchChipsProps> = ({
  clientIdChips,
  descriptionChips,
  ownerChips,
  onSearch,
  onDeleteChip,
  onDeleteChipGroup,
}) => {
  return (
    <ToolbarGroup variant="filter-group">
      <Search onSearch={onSearch} />
      <ToolbarFilter
        chips={clientIdChips}
        deleteChip={(_, value) => onDeleteChip("clientid", value as string)}
        deleteChipGroup={() => onDeleteChipGroup("clientid")}
        categoryName="Client ID"
      >
        {/** */}
      </ToolbarFilter>
      <ToolbarFilter
        chips={descriptionChips}
        deleteChip={(_, value) => onDeleteChip("description", value as string)}
        deleteChipGroup={() => onDeleteChipGroup("description")}
        categoryName="Short description"
      >
        {/** */}
      </ToolbarFilter>
      <ToolbarFilter
        chips={ownerChips}
        deleteChip={(_, value) => onDeleteChip("owner", value as string)}
        deleteChipGroup={() => onDeleteChipGroup("owner")}
        categoryName="Owner"
      >
        {/** */}
      </ToolbarFilter>
    </ToolbarGroup>
  );
};
