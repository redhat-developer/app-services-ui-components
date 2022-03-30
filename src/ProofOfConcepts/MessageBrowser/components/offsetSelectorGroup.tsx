import "./customStyles.css";
import { DateTimePicker } from "./dateAndTimePicker";

import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownSeparator,
  DropdownToggle,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import FilterIcon from "@patternfly/react-icons/dist/esm/icons/filter-icon";

export class OffsetSelectorGroupClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filters: {
        offset: [],
        epochTimestamp: [],
      },
      currentCategory: "Offset",
      isFilterDropdownOpen: false,
      isCategoryDropdownOpen: false,
      offsetInput: "",
      epochTimestampInput: "",
      inputValue: "",
    };

    this.onDelete = (type = "", id = "") => {
      if (type) {
        this.setState((prevState) => {
          prevState.filters[type.toLowerCase()] = prevState.filters[
            type.toLowerCase()
          ].filter((s) => s !== id);
          return {
            filters: prevState.filters,
          };
        });
      } else {
        this.setState({
          filters: {
            offset: [],
            epochTimestamp: [],
            status: [],
          },
        });
      }
    };

    this.onCategoryToggle = (isOpen) => {
      this.setState({
        isCategoryDropdownOpen: isOpen,
      });
    };

    this.onCategorySelect = (event) => {
      this.setState({
        inputValue: "",
        currentCategory: event.target.innerText,
        isCategoryDropdownOpen: !this.state.isCategoryDropdownOpen,
      });
    };

    this.onFilterToggle = (isOpen) => {
      this.setState({
        isFilterDropdownOpen: isOpen,
      });
    };

    this.onFilterSelect = (event) => {
      this.setState({
        isFilterDropdownOpen: !this.state.isFilterDropdownOpen,
      });
    };

    this.onInputChange = (newValue) => {
      this.setState({ inputValue: newValue });
    };

    this.onEpochTimestampInput = (event) => {
      if (event.key && event.key !== "Enter") {
        return;
      }

      const { inputValue } = this.state;
      this.setState((prevState) => {
        const prevFilters = prevState.filters["epochTimestamp"];
        return {
          filters: {
            ...prevState.filters,
            ["epochTimestamp"]: prevFilters.includes(inputValue)
              ? prevFilters
              : [...prevFilters, inputValue],
          },
          inputValue: "",
        };
      });
    };

    this.onOffsetSelect = (event) => {
      if (event.key && event.key !== "Enter") {
        return;
      }

      const { inputValue } = this.state;
      this.setState((prevState) => {
        const prevFilters = prevState.filters["offset"];
        return {
          filters: {
            ...prevState.filters,
            ["offset"]: prevFilters.includes(inputValue)
              ? prevFilters
              : [...prevFilters, inputValue],
          },
          inputValue: "",
        };
      });
    };
  }

  buildCategoryDropdown() {
    const { isCategoryDropdownOpen, currentCategory } = this.state;

    return (
      <ToolbarItem>
        <Dropdown
          onSelect={this.onCategorySelect}
          position={DropdownPosition.left}
          toggle={
            <DropdownToggle
              onToggle={this.onCategoryToggle}
              style={{ width: "100%" }}
            >
              {/* <FilterIcon />  */}
              {currentCategory}
            </DropdownToggle>
          }
          isOpen={isCategoryDropdownOpen}
          dropdownItems={[
            <DropdownItem key="cat1">Offset</DropdownItem>,
            <DropdownItem key="cat2">Timestamp</DropdownItem>,
            <DropdownItem key="cat3">Epoch Timestamp</DropdownItem>,
            <DropdownSeparator key="separator" />,
            <DropdownItem key="cat5" itemId={1}>
              Latest messages
            </DropdownItem>,
          ]}
          style={{ width: "100%" }}
        />
      </ToolbarItem>
    );
  }

  buildFilterDropdown() {
    const { currentCategory, isFilterDropdownOpen, inputValue, filters } =
      this.state;

    return (
      <React.Fragment>
        <ToolbarFilter
          categoryName="Offset"
          showToolbarItem={currentCategory === "Offset"}
        >
          <TextInput
          className="pf-c-form-control custom-width"
            aria-label="offset filter"
            placeholder="Select offset"
            onChange={this.onInputChange}
            value={inputValue}
            type="text"
            onClear={() => {
              this.onInputChange("");
            }}
          />
        </ToolbarFilter>
        <ToolbarFilter
          categoryName="Timestamp"
          showToolbarItem={currentCategory === "Timestamp"}
        >
          <DateTimePicker />
        </ToolbarFilter>
        <ToolbarFilter
          categoryName="Epoch Timestamp"
          showToolbarItem={currentCategory === "Epoch Timestamp"}
        >
          <TextInput
            className="pf-c-form-control custom"
            aria-label="epochTimestamp filter"
            placeholder="Select epoch timestamp"
            onChange={this.onInputChange}
            value={inputValue}
            type="text"
            onClear={() => {
              this.onInputChange("");
            }}
          />
        </ToolbarFilter>
      </React.Fragment>
    );
  }

  renderToolbar() {
    const { filters } = this.state;
    return (
      <Toolbar
        id="toolbar-with-chip-groups"
        clearAllFilters={this.onDelete}
        collapseListedFiltersBreakpoint="xl"
      >
        <ToolbarContent>
          <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
            <ToolbarGroup variant="filter-group">
              {this.buildCategoryDropdown()}
              {this.buildFilterDropdown()}
            </ToolbarGroup>
          </ToolbarToggleGroup>
        </ToolbarContent>
      </Toolbar>
    );
  }

  render() {
    const { filters } = this.state;
    return <React.Fragment>{this.renderToolbar()}</React.Fragment>;
  }
}
