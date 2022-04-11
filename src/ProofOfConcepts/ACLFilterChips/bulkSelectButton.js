import React from "react";
import {
  Dropdown,
  DropdownToggle,
  DropdownToggleCheckbox,
  DropdownItem,
  DropdownSeparator,
} from "@patternfly/react-core";

class SplitButtonDropdown extends React.Component {
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
      const element = document.getElementById("toggle-id-8");
      element.focus();
    };
  }

  render() {
    const { isOpen } = this.state;
    const dropdownItems = [
      <DropdownItem key="link">Link</DropdownItem>,
      <DropdownItem key="action" component="button">
        Action
      </DropdownItem>,
      <DropdownItem key="disabled link" isDisabled>
        Disabled link
      </DropdownItem>,
      <DropdownItem key="disabled action" isDisabled component="button">
        Disabled action
      </DropdownItem>,
      <DropdownSeparator key="separator" />,
      <DropdownItem key="separated link">Separated link</DropdownItem>,
      <DropdownItem key="separated action" component="button">
        Separated action
      </DropdownItem>,
    ];
    return (
      <Dropdown
        onSelect={this.onSelect}
        toggle={
          <DropdownToggle
            splitButtonItems={[
              <DropdownToggleCheckbox
                id="example-checkbox-1"
                key="split-checkbox"
                aria-label="Select all"
              />,
            ]}
            onToggle={this.onToggle}
            id="toggle-id-8"
          />
        }
        isOpen={isOpen}
        dropdownItems={dropdownItems}
      />
    );
  }
}

export default SplitButtonDropdown;
