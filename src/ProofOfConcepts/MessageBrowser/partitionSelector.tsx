import React from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupTextVariant,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import "./customStyles.css";

// TODO
// Add a tick for 0 since that is selected
// Make the 0 black

export class PartitionSelectorClass extends React.Component {
  constructor(props) {
    super(props);
    this.defaultOptions = [
      { value: "0" },
      { value: "1" },
      { value: "2" },
      { value: "3" },
      { value: "4" },
      { value: "5" },
      { value: "6" },
      { value: "7" },
      { value: "8" },
      { value: "9" },
      { value: "10" },
      { value: "11" },
      { value: "12" },
      { value: "13" },
      { value: "14" },
      { value: "15" },
      { value: "16" },
      { value: "17" },
      { value: "18" },
      { value: "19" },
      { value: "20" },
      { value: "21" },
      { value: "22" },
      { value: "23" },
      { value: "24" },
      { value: "25" },
      { value: "26" },
      { value: "27" },
      { value: "28" },
      { value: "29" },
      { value: "30" },
      { value: "31" },
      { value: "32" },
      { value: "33" },
      { value: "34" },
      { value: "35" },
      { value: "36" },
      { value: "37" },
      { value: "38" },
      { value: "39" },
      { value: "40" },
      { value: "41" },
      { value: "42" },
      { value: "43" },
      { value: "44" },
      { value: "45" },
      { value: "46" },
      { value: "47" },
      { value: "48" },
      { value: "49" },
      { value: "50" },
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
      <InputGroup>
        <InputGroupText className="pf-c-content">Partition</InputGroupText>
        <div>
          <span id={titleId} hidden>
            Select a state
          </span>
          <Select
            width={115}
            variant={SelectVariant.typeahead}
            typeAheadAriaLabel="Select a state"
            onToggle={this.onToggle}
            onSelect={this.onSelect}
            selections={selected}
            isOpen={isOpen}
            aria-labelledby={titleId}
            isInputValuePersisted={isInputValuePersisted}
            isInputFilterPersisted={isInputFilterPersisted}
            placeholderText="0"
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
          id="plain-example"
          variant={InputGroupTextVariant.plain}
          className="pf-c-content"
        >
          of 50
        </InputGroupText>
      </InputGroup>
    );
  }
}
