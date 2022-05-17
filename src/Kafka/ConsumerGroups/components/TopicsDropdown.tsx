import { Dropdown, DropdownItem, DropdownToggle } from "@patternfly/react-core";
import { FunctionComponent, SyntheticEvent, useState } from "react";

export type TopicDropdown = {
  value: string;
  topics: string[];
  onChange: (topic: string) => void;
};

export const TopicDropdown: FunctionComponent<TopicDropdown> = ({
  topics,
  onChange,
  value,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onSelect = (
    event?: SyntheticEvent<HTMLDivElement, Event> | undefined
  ) => {
    const eventTarget = event?.target as HTMLElement;
    const value = eventTarget.innerText;
    onChange(value.toLowerCase());
    setIsOpen((prevState) => !prevState);
  };

  const dropDownItems = topics.map((topic) => (
    <DropdownItem key={topic}>{topic}</DropdownItem>
  ));

  return (
    <Dropdown
      id="topic-dropdown"
      aria-label="topic-select-dropdown"
      onSelect={onSelect}
      dropdownItems={dropDownItems}
      isOpen={isOpen}
      menuAppendTo={"parent"}
      toggle={
        <DropdownToggle id="topic-dropdowntoggle" onToggle={onToggle}>
          {value}
        </DropdownToggle>
      }
    ></Dropdown>
  );
};
