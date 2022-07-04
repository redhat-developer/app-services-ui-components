import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
} from "@patternfly/react-core";

export class InstanceDropdown extends React.Component {
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
      <DropdownGroup label="View instance information">
        <DropdownItem>Details</DropdownItem>
        <DropdownItem>Connection</DropdownItem>
        <DropdownSeparator />
      </DropdownGroup>,
      <DropdownGroup>
        <DropdownItem>Change instance owner</DropdownItem>
        <DropdownSeparator />
      </DropdownGroup>,
      <DropdownGroup>
        <DropdownItem>Delete instance</DropdownItem>
      </DropdownGroup>,
    ];
    return (
      <Dropdown
        onSelect={this.onSelect}
        toggle={
          <DropdownToggle onToggle={this.onToggle} id="toggle-id-3" isPrimary>
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
