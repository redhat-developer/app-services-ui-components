import { Toolbar, ToolbarChip, ToolbarContent, ToolbarGroup, ToolbarToggleGroup } from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons";
import React from "react";
import { ClientIDFilter } from "./ClientIDFilter";
//import { ClientIDSearch } from "./ClientIDSearch";
import { FilterType, FilterValue } from "./FilterProps";
import { FilterSelect } from "./FilterSelect";
import { OwnerFilter } from "./OwnerFilter";
import { ShortDescriptionFilter } from "./ShortDescriptionFIlter";

export type ServiceAccountToolbarProps = {
  isMaxFilter: boolean;
  filteredValue: Array<FilterType>;
  setFilteredValue: (filteredValue: Array<FilterType>) => void;
  filterSelected?: string;
  setFilterSelected: (value: string) => void;
}

export const ServiceAccountToolbar: React.FunctionComponent<ServiceAccountToolbarProps> = ({
  isMaxFilter,
  filteredValue,
  setFilteredValue,
  filterSelected,
  setFilterSelected,
}) => {

  const getSelectionForFilter = (key: string) => {
    const selectedFilters = filteredValue.filter(
      (filter) => filter.filterKey === key
    );
    if (selectedFilters.length > 0) {
      return selectedFilters[0].filterValue.map((val) => val.value);
    }
    return;
  };

  const updateFilter = (
    key: string,
    filter: FilterValue,
    removeIfPresent: boolean
  ) => {
    const newFilterValue: FilterType[] = Object.assign([], filteredValue); // a copy for applied filter
    const filterIndex = newFilterValue.findIndex((f) => f.filterKey === key); // index of current key in applied filter
    if (filterIndex > -1) {
      // if filter is present with the current key
      const filterValue = newFilterValue[filterIndex];
      if (filterValue.filterValue && filterValue.filterValue.length > 0) {
        // if some filters are already there in applied filter for same key
        // index of current filter value in applied filter
        const filterValueIndex = filterValue.filterValue.findIndex(
          (f) => f.value === filter.value
        );
        if (filterValueIndex > -1) {
          // filter value is already present
          if (removeIfPresent) {
            filterValue.filterValue.splice(filterValueIndex, 1); // remove the value
          } else {
            return; // skip the duplicate values
          }
        } else {
          // add the filter value to the current applied filter
          newFilterValue[filterIndex].filterValue.push(filter);
        }
      } else {
        // add the filter value to current applied filter
        newFilterValue[filterIndex].filterValue = [filter];
      }
    } else {
      // add filter with key and value to the applied filter
      newFilterValue.push({ filterKey: key, filterValue: [filter] });
    }
    setFilteredValue(newFilterValue);
  };

  const onDeleteChip = (
    category: string,
    chip: string | ToolbarChip,
    filterOptions?: Array<any>
  ) => {
    const newFilteredValue: FilterType[] = Object.assign([], filteredValue);
    const filterIndex = newFilteredValue.findIndex(
      (filter) => filter.filterKey === category
    );
    const prevFilterValue: FilterValue[] = Object.assign(
      [],
      newFilteredValue[filterIndex]?.filterValue
    );
    let filterChip: string | undefined = chip.toString();
    /**
     * Filter chip from filter options
     */
    if (filterOptions && filterOptions?.length > 0) {
      filterChip = filterOptions?.find(
        (option) => option.label === chip.toString()
      )?.value;
    }
    /**
     * Delete selected chip from filter options
     */
    const chipIndex = prevFilterValue.findIndex(
      (val) => val.value === filterChip
    );
    if (chipIndex >= 0) {
      newFilteredValue[filterIndex].filterValue.splice(chipIndex, 1);
      setFilteredValue(newFilteredValue);
    }
  };

  const onDeleteChipGroup = (category: string) => {
    const newFilteredValue: FilterType[] = Object.assign([], filteredValue);
    const filterIndex = newFilteredValue.findIndex(
      (filter) => filter.filterKey === category
    );
    if (filterIndex >= 0) {
      newFilteredValue.splice(filterIndex, 1);
      setFilteredValue(newFilteredValue);
    }
  };

  const removeFilteredValue = (value: string) => {
    const copyFilteredValue: FilterType[] = Object.assign([], filteredValue);
    const filterIndex = copyFilteredValue.findIndex(
      (filter) => filter.filterKey === value
    );
    if (filterIndex >= 0) {
      copyFilteredValue.splice(filterIndex, 1);
    }
    setFilteredValue(copyFilteredValue);
  };

  const onClear = () => {
    setFilteredValue([]);
  };

  return (
    <Toolbar
      id='service-account-toolbar'
      clearAllFilters={onClear}
      collapseListedFiltersBreakpoint={'md'}
      inset={{ xl: 'insetLg' }}>
      <ToolbarContent>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint='md' >
          <ToolbarGroup variant='filter-group'>
            <FilterSelect
              filterSelected={filterSelected}
              setFilterSelected={setFilterSelected} />
            <OwnerFilter
              isMaxFilter={isMaxFilter}
              filterSelected={filterSelected}
              getSelectionForFilter={getSelectionForFilter}
              updateFilter={updateFilter}
              onDeleteChip={onDeleteChip}
              onDeleteChipGroup={onDeleteChipGroup}
              removeFilterValue={removeFilteredValue}
            />
            <ShortDescriptionFilter
              isMaxFilter={isMaxFilter}
              filterSelected={filterSelected}
              getSelectionForFilter={getSelectionForFilter}
              updateFilter={updateFilter}
              onDeleteChip={onDeleteChip}
              onDeleteChipGroup={onDeleteChipGroup}
              removeFilterValue={removeFilteredValue} />
            <ClientIDFilter
              isMaxFilter={isMaxFilter}
              filterSelected={filterSelected}
              getSelectionForFilter={getSelectionForFilter}
              updateFilter={updateFilter}
              onDeleteChip={onDeleteChip}
              onDeleteChipGroup={onDeleteChipGroup}
              removeFilterValue={removeFilteredValue} />
          </ToolbarGroup>
        </ToolbarToggleGroup>
      </ToolbarContent>
    </Toolbar >
  )

}

