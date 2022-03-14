import React from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupTextVariant,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import "./styling.css";

export class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.defaultOptions = [
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      { value: "7" },
      { value: "8" },
      { value: "9" },
      { value: "10" }
    ];

    this.state = {
      options: this.defaultOptions,
      isOpen: false,
      selected: null,
      isDisabled: false,
      isCreatable: false,
      isInputValuePersisted: false,
      isInputFilterPersisted: false,
      hasOnCreateOption: false,
    };

    this.onToggle = (isOpen) => {
      this.setState({
        isOpen,
      });
    };

    this.onSelect = (event, selection, isPlaceholder) => {
      if (isPlaceholder) this.clearSelection();
      else {
        this.setState({
          selected: selection,
          isOpen: false,
        });
        console.log("selected:", selection);
      }
    };

    this.onCreateOption = (newValue) => {
      this.setState({
        options: [...this.state.options, { value: newValue }],
      });
    };

    this.clearSelection = () => {
      this.setState({
        selected: null,
        isOpen: false,
        options: this.defaultOptions,
      });
    };

    this.toggleDisabled = (checked) => {
      this.setState({
        isDisabled: checked,
      });
    };

    this.toggleCreatable = (checked) => {
      this.setState({
        isCreatable: checked,
      });
    };

    this.toggleCreateNew = (checked) => {
      this.setState({
        hasOnCreateOption: checked,
      });
    };

    this.toggleInputValuePersisted = (checked) => {
      this.setState({
        isInputValuePersisted: checked,
      });
    };

    this.toggleInputFilterPersisted = (checked) => {
      this.setState({
        isInputFilterPersisted: checked,
      });
    };
  }

  render() {
    const {
      isOpen,
      selected,
      isDisabled,
      isCreatable,
      hasOnCreateOption,
      isInputValuePersisted,
      isInputFilterPersisted,
      options,
    } = this.state;
    const titleId = "typeahead-select-id-1";
    return (
      <React.Fragment>
        <InputGroup>
          <InputGroupText>Partition</InputGroupText>
          <div>
            <span id={titleId} hidden>
              Select a state
            </span>
            <Select
              width={140}
              variant={SelectVariant.typeahead}
              typeAheadAriaLabel="Select a state"
              onToggle={this.onToggle}
              onSelect={this.onSelect}
              onClear={this.clearSelection}
              selections={selected}
              isOpen={isOpen}
              aria-labelledby={titleId}
              isInputValuePersisted={isInputValuePersisted}
              isInputFilterPersisted={isInputFilterPersisted}
              placeholderText="2"
              isDisabled={isDisabled}
              isCreatable={isCreatable}
              onCreateOption={
                (hasOnCreateOption && this.onCreateOption) || undefined
              }
              maxHeight={200}
            >
              {options.map((option, index) => (
                <SelectOption
                  isDisabled={option.disabled}
                  key={index}
                  value={option.value}
                  {...(option.description && {
                    description: option.description,
                  })}
                />
              ))}
            </Select>
          </div>
          <InputGroupText
            className="mas-m-color"
            id="plain-example"
            variant={InputGroupTextVariant.plain}
          >
            of 50
          </InputGroupText>
        </InputGroup>
      </React.Fragment>
    );
  }
}
