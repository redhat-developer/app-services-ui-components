import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";

import React from "react";
import {
  Toolbar,
  ToolbarItem,
  ToolbarContent,
  ToolbarFilter,
  ToolbarToggleGroup,
  ToolbarGroup,
} from "@patternfly/react-core";
import {
  Button,
  ButtonVariant,
  InputGroup,
  Select,
  SelectOption,
  SelectVariant,
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  KebabToggle,
  Text,
} from "@patternfly/react-core";

import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import FilterIcon from "@patternfly/react-icons/dist/esm/icons/filter-icon";
import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";
import EditIcon from "@patternfly/react-icons/dist/esm/icons/edit-icon";
import CloneIcon from "@patternfly/react-icons/dist/esm/icons/clone-icon";
import SyncIcon from "@patternfly/react-icons/dist/esm/icons/sync-icon";
import CheckboxTreeView from "./treeviewDropdown";
import BulkSelector from "./bulkSelectButton";

class ToolbarWithFilterExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      inputValue: "",
      statusIsExpanded: false,
      riskIsExpanded: false,
      filters: {
        // risk: ['1', 'New'],
        // status: ['New', 'Pending']
      },
      kebabIsOpen: false,
    };

    this.toggleIsExpanded = () => {
      this.setState((prevState) => ({
        isExpanded: !prevState.isExpanded,
      }));
    };

    this.closeExpandableContent = () => {
      this.setState(() => ({
        isExpanded: false,
      }));
    };

    this.onInputChange = (newValue) => {
      this.setState({ inputValue: newValue });
    };

    this.onSelect = (type, event, selection) => {
      const checked = event.target.checked;
      this.setState((prevState) => {
        const prevSelections = prevState.filters[type];
        return {
          filters: {
            ...prevState.filters,
            [type]: checked
              ? [...prevSelections, selection]
              : prevSelections.filter((value) => value !== selection),
          },
        };
      });
    };

    this.onStatusSelect = (event, selection) => {
      this.onSelect("status", event, selection);
    };

    this.onRiskSelect = (event, selection) => {
      this.onSelect("risk", event, selection);
    };

    this.onDelete = (type = "", id = "") => {
      if (type) {
        this.setState((prevState) => {
          const newState = Object.assign(prevState);
          newState.filters[type.toLowerCase()] = newState.filters[
            type.toLowerCase()
          ].filter((s) => s !== id);
          return {
            filters: newState.filters,
          };
        });
      } else {
        this.setState({
          filters: {
            risk: [],
            status: [],
          },
        });
      }
    };

    this.onDeleteGroup = (type) => {
      this.setState((prevState) => {
        prevState.filters[type.toLowerCase()] = [];
        return {
          filters: prevState.filters,
        };
      });
    };

    this.onStatusToggle = (isExpanded) => {
      this.setState({
        statusIsExpanded: isExpanded,
      });
    };

    this.onRiskToggle = (isExpanded) => {
      this.setState({
        riskIsExpanded: isExpanded,
      });
    };

    this.onKebabToggle = (isOpen) => {
      this.setState({
        kebabIsOpen: isOpen,
      });
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.closeExpandableContent);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.closeExpandableContent);
  }

  render() {
    const {
      inputValue,
      filters,
      statusIsExpanded,
      riskIsExpanded,
      kebabIsOpen,
    } = this.state;

    const attributeFilterPlaceholder = [
      <p>
        <FilterIcon /> Resource type permission
      </p>,
    ];
    const statusMenuItems = [
      <React.Fragment>
        <p>
          {" "}
          &emsp; Resource type permission&emsp;
          <CheckIcon color="blue" />{" "}
        </p>
        <br></br>
        <Text> &emsp; Resource name</Text>
        <br></br>
        <Text> &emsp; Account type</Text>
        <br></br>
        <Text> &emsp; Account</Text>
      </React.Fragment>,
    ];

    const riskMenuItems = [<CheckboxTreeView />];

    const toggleGroupItems = (
      <React.Fragment>
        <ToolbarItem>
          <BulkSelector />
        </ToolbarItem>
        <ToolbarGroup variant="filter-group">
          <ToolbarFilter
            chips={filters.status}
            deleteChip={this.onDelete}
            deleteChipGroup={this.onDeleteGroup}
            categoryName="Resource type permission"
          >
            <Select
              variant={SelectVariant.checkbox}
              aria-label="Resource type permission"
              onToggle={this.onStatusToggle}
              onSelect={this.onStatusSelect}
              selections={filters.status}
              isOpen={statusIsExpanded}
              placeholderText={attributeFilterPlaceholder}
            >
              {statusMenuItems}
            </Select>
          </ToolbarFilter>
          <ToolbarFilter
            chips={filters.risk}
            deleteChip={this.onDelete}
            categoryName="Risk"
          >
            <Select
              variant={SelectVariant.checkbox}
              aria-label="Filter by resource type permission"
              onToggle={this.onRiskToggle}
              onSelect={this.onRiskSelect}
              selections={filters.risk}
              isOpen={riskIsExpanded}
              placeholderText="Filter by resource type permission"
            >
              {riskMenuItems}
            </Select>
          </ToolbarFilter>
        </ToolbarGroup>
      </React.Fragment>
    );

    const dropdownItems = [
      <DropdownItem key="link">Link</DropdownItem>,
      <DropdownItem key="action" component="button">
        Action
      </DropdownItem>,
      <DropdownItem key="disabled link" isDisabled>
        Disabled Link
      </DropdownItem>,
      <DropdownItem key="disabled action" isDisabled component="button">
        Disabled Action
      </DropdownItem>,
      <DropdownSeparator key="separator" />,
      <DropdownItem key="separated link">Separated Link</DropdownItem>,
      <DropdownItem key="separated action" component="button">
        Separated Action
      </DropdownItem>,
    ];

    const toolbarItems = (
      <React.Fragment>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="xl">
          {toggleGroupItems}
        </ToolbarToggleGroup>
        <ToolbarItem>
          <Button variant={ButtonVariant.primary}>Manage access</Button>
        </ToolbarItem>
        <ToolbarItem>
          <Dropdown
            toggle={<KebabToggle onToggle={this.onKebabToggle} />}
            isOpen={kebabIsOpen}
            isPlain
            dropdownItems={dropdownItems}
          />
        </ToolbarItem>
      </React.Fragment>
    );

    return (
      <React.Fragment>
        <Toolbar
          id="toolbar-with-filter"
          className="pf-m-toggle-group-container"
          collapseListedFiltersBreakpoint="xl"
          clearAllFilters={this.onDelete}
        >
          <ToolbarContent>{toolbarItems}</ToolbarContent>
        </Toolbar>
      </React.Fragment>
    );
  }
}

export default ToolbarWithFilterExample;
