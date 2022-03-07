import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
} from "@patternfly/react-core";

export class ActionsDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.onToggle = (isOpen) => {
      this.setState({
        isOpen,
      });
    };
    this.onSelect = (event) => {
      this.setState({
        isOpen: !this.state.isOpen,
      });
      this.onFocus();
    };
    this.onFocus = () => {
      const element = document.getElementById("toggle-id-3");
      element.focus();
    };
  }

  render() {
    const { isOpen } = this.state;
    const dropdownItems = [
      <DropdownGroup label="View information" key="View information">
        <DropdownItem key="View information:Details">Details</DropdownItem>
        <DropdownItem key="View information:Connection">
          {" "}
          Connection
        </DropdownItem>
        <DropdownSeparator key="dropdown separator" />
      </DropdownGroup>,
      <DropdownGroup key="Actions">
        <DropdownItem key="Actions:Delete">Delete instance</DropdownItem>
      </DropdownGroup>,
    ];
    return (
      <Dropdown
        onSelect={this.onSelect}
        toggle={
          <DropdownToggle onToggle={this.onToggle} id="toggle-id-3">
            Actions
          </DropdownToggle>
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
        isGrouped
      />
    );
  }
}
