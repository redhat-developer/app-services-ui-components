import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  KebabToggle,
  DropdownGroup,
} from "@patternfly/react-core";

export class AllActionsDropdown extends React.Component {
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
      const element = document.getElementById("toggle-id-6");
      element.focus();
    };
  }

  render() {
    const { isOpen } = this.state;
    const dropdownItems = [
      <DropdownGroup>
        <DropdownItem>Start instance</DropdownItem>
        <DropdownItem>Stop instance</DropdownItem>
        <DropdownSeparator />
      </DropdownGroup>,
      <DropdownGroup label="View instance information">
        <DropdownItem>Details</DropdownItem>
        <DropdownItem>Connection</DropdownItem>
        <DropdownSeparator />
      </DropdownGroup>,
      <DropdownGroup>
        <DropdownItem>Edit instance configuration</DropdownItem>
        <DropdownItem>Change instance owner</DropdownItem>
        <DropdownItem>Duplicate instance</DropdownItem>
        <DropdownSeparator />
      </DropdownGroup>,
      <DropdownGroup>
        <DropdownItem>Delete instance</DropdownItem>
      </DropdownGroup>,
    ];
    return (
      <Dropdown
        onSelect={this.onSelect}
        toggle={<KebabToggle onToggle={this.onToggle} id="toggle-id-6" />}
        isOpen={isOpen}
        isPlain
        dropdownItems={dropdownItems}
      />
    );
  }
}
