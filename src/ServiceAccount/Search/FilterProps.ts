import { ToolbarChip } from "@patternfly/react-core";

export type FilterProps = {
    getSelectionForFilter: (key: string) => string[] | undefined;
    filterSelected?: string;
    onDeleteChip: (
        category: string,
        chip: string | ToolbarChip,
        filterOptions?: Array<any>
    ) => void;
    onDeleteChipGroup: (category: string) => void;
    isMaxFilter: boolean;
    updateFilter: (
        key: string,
        filter: FilterValue,
        removeIfPresent: boolean
    ) => void;
    removeFilterValue: (value: string) => void;
}

export type FilterValue = {
    value: string;
    isExact: boolean;
  };
  
  export type FilterType = {
    filterKey: string;
    filterValue: FilterValue[];
  };
  