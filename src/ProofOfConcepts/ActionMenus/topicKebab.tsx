import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownSeparator,
  KebabToggle,
  DropdownGroup,
} from "@patternfly/react-core";

export class TopicKebab extends React.Component {
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
      <DropdownGroup label="View topic information">
        <DropdownItem>Consumer groups</DropdownItem>
        <DropdownItem>Messages</DropdownItem>
        <DropdownItem>Properties</DropdownItem>
        <DropdownItem>Schemas</DropdownItem>
        <DropdownSeparator />
      </DropdownGroup>,
      <DropdownGroup>
        <DropdownItem>Edit topic configuration</DropdownItem>
        <DropdownSeparator />
      </DropdownGroup>,
      <DropdownGroup>
        <DropdownItem>Delete topic</DropdownItem>
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
