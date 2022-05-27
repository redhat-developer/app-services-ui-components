import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  KebabToggle,
  DropdownGroup,
} from "@patternfly/react-core";

export class ActionsTable extends React.Component {
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
      <DropdownGroup label="View instance information">
        <DropdownItem>Details</DropdownItem>
        <DropdownItem>Connection</DropdownItem>
        <DropdownItem>Settings</DropdownItem>
        <DropdownItem>Topics</DropdownItem>
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
        toggle={<KebabToggle onToggle={this.onToggle} id="toggle-id-6" />}
        isOpen={isOpen}
        isPlain
        dropdownItems={dropdownItems}
      />
    );
  }
}
