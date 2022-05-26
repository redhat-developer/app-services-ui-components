import { Dropdown, DropdownItem, DropdownToggle } from "@patternfly/react-core";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onSelect = (
    event?: SyntheticEvent<HTMLDivElement, Event> | undefined
  ) => {
    const eventTarget = event?.target as HTMLElement;
    const value = eventTarget.innerText;
    onChange(value?.toLowerCase());
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
        <DropdownToggle data-testid="topic-dropdowntoggle" onToggle={onToggle}>
          {topics.length === 1
            ? topics.map((topic) => topic)
            : value
            ? value
            : t("common:select")}
        </DropdownToggle>
      }
    ></Dropdown>
  );
};
