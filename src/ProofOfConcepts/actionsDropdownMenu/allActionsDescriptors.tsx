import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownGroup,
  DropdownItem,
  DropdownSeparator,
} from "@patternfly/react-core";

export class ActionsDescriptors extends React.Component {
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
      <DropdownGroup label="Edit [thing] state/condition/status" key="">
        <DropdownItem key="Start">[Start]</DropdownItem>
        <DropdownItem key="Stop">[Stop]</DropdownItem>
        <DropdownItem key="Resume">[Resume]</DropdownItem>
        <DropdownSeparator key="dropdown separator" />
      </DropdownGroup>,
      <DropdownGroup label="[thing] controls" key="">
        <DropdownItem key="Edit">[Edit]*</DropdownItem>
        <DropdownItem key="Duplicate">[Duplicate]</DropdownItem>
        <DropdownItem key="Delete">[Delete]</DropdownItem>
        <DropdownItem key="Change owner">[Change owner]</DropdownItem>
        <DropdownItem key="Reset credentials">[Reset credentials]</DropdownItem>
        <DropdownSeparator key="dropdown separator" />
      </DropdownGroup>,
      <DropdownGroup
        label="View [thing] information"
        key="View [thing] information"
      >
        <DropdownItem key="Connection">Connection</DropdownItem>
        <DropdownItem key="Details">Details</DropdownItem>
        <DropdownItem key="primary data plane tab">
          [Primary data plane tab]
        </DropdownItem>
        <DropdownItem key="[drawer tab label]">[drawer tab label]</DropdownItem>
        <DropdownItem key="access tab">[Access tab]</DropdownItem>
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
