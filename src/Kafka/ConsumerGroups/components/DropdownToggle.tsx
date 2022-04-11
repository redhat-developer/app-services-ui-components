import { FunctionComponent, SyntheticEvent, useState } from "react";
import { Dropdown, DropdownItem, DropdownToggle } from "@patternfly/react-core";

export interface IDropdownWithToggleProps {
  id: string;
  toggleId: string;
  value: string;
  name: string;
  items: IDropdownOption[];
  onSelectOption?: (value: string, name: string) => void;
  ariaLabel?: string;
  menuAppendTo?: HTMLElement | (() => HTMLElement) | "parent" | "inline";
  isLabelAndValueNotSame?: boolean;
}

export interface IDropdownOption {
  value?: string;
  label?: string;
  key?: string;
  isDisabled?: boolean;
}

export const DropdownWithToggle: FunctionComponent<
  IDropdownWithToggleProps
> = ({
  id,
  toggleId,
  items,
  value,
  ariaLabel,
  onSelectOption,
  name,
  menuAppendTo,
  isLabelAndValueNotSame,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onSelect = (
    event?: SyntheticEvent<HTMLDivElement, Event> | undefined
  ) => {
    const eventTarget = event?.target as HTMLElement;
    const value = eventTarget.innerText;
    if (onSelectOption && value) {
      onSelectOption(value.toLowerCase(), name);
    }
    setIsOpen((isOpen) => !isOpen);
  };

  const getItems = (options: IDropdownOption[]) => {
    const items = options.map((option) => {
      const { key, value, label } = option;

      return (
        <DropdownItem key={key} value={value}>
          {label || value}
        </DropdownItem>
      );
    });

    return items;
  };

  const getSelectedValue = () => {
    if (isLabelAndValueNotSame) {
      const filteredOption = items?.filter((item) => item.value === value)[0];
      return filteredOption?.label;
    }
    return value;
  };

  const dropdownToggle = (
    <DropdownToggle id={toggleId} onToggle={onToggle}>
      {getSelectedValue()}
    </DropdownToggle>
  );

  return (
    <Dropdown
      name={name}
      id={id}
      onSelect={onSelect}
      toggle={dropdownToggle}
      isOpen={isOpen}
      aria-label={ariaLabel}
      dropdownItems={getItems(items)}
      menuAppendTo={menuAppendTo}
    />
  );
};
