import type React from "react";
import { useState } from "react";
import { Dropdown, DropdownItem, DropdownToggle } from "@patternfly/react-core";
import type { DropdownProps } from "@patternfly/react-core/dist/js";
import type { IDropdownOption } from "../../Kafka";

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

export const DropdownWithToggle: React.FC<IDropdownWithToggleProps> = ({
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

  const onSelect: DropdownProps["onSelect"] = (e) => {
    if (e && e.currentTarget.textContent) {
      const value: string = e.currentTarget.textContent;
      if (onSelectOption && value) {
        onSelectOption(value.toLowerCase(), name);
      }
      setIsOpen((isOpen) => !isOpen);
    }
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
