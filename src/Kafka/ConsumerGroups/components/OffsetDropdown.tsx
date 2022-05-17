import { Dropdown, DropdownItem, DropdownToggle } from "@patternfly/react-core";
import { FunctionComponent, SyntheticEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { OffsetValue } from "../types";

export type OffsetDropdownProps = {
  value: OffsetValue;
  onChange: (value: OffsetValue) => void;
};

export const OffsetDropdown: FunctionComponent<OffsetDropdownProps> = ({
  onChange,
  value,
}) => {
  const { t } = useTranslation("kafka");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const offsetValueOption: { [key in OffsetValue]: string } = {
    absolute: t("consumerGroup.offset.absolute"),
    latest: t("consumerGroup.offset.latest"),
    earliest: t("consumerGroup.offset.earliest"),
    timestamp: t("consumerGroup.offset.timestamp"),
  };

  const onSelect = (
    _: SyntheticEvent<HTMLDivElement, Event> | undefined,
    value: OffsetValue
  ) => {
    onChange(value as OffsetValue);
    setIsOpen((prevState) => !prevState);
  };

  const dropDownItems = () => {
    return Object.entries(offsetValueOption).map(([value, label]) => (
      <DropdownItem key={value} value={value}>
        {label}
      </DropdownItem>
    ));
  };

  return (
    <Dropdown
      onSelect={onSelect}
      dropdownItems={dropDownItems()}
      isOpen={isOpen}
      id="offset-dropdown"
      aria-label="offset-select-dropdown"
      menuAppendTo={"parent"}
      toggle={
        <DropdownToggle id="offset-dropdowntoggle" onToggle={onToggle}>
          {value}
        </DropdownToggle>
      }
    />
  );
};
