import {
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
} from "@patternfly/react-core";
import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import { OffsetValue } from "../types";

export type OffsetSelectProps = {
  value: OffsetValue;
  onChange: (value: OffsetValue) => void;
};

export const OffsetSelect: FunctionComponent<OffsetSelectProps> = ({
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

  const onSelect: SelectProps["onSelect"] = (_, selection) => {
    onChange(selection as OffsetValue);
    setIsOpen(false);
  };

  const makeOptions = () => {
    return Object.entries(offsetValueOption).map(([value, label]) => (
      <SelectOption key={value} value={value}>
        {label}
      </SelectOption>
    ));
  };

  return (
    <Select
      aira-label={t("consumerGroup.reset_offset_new_offset_label")}
      toggleAriaLabel={t("consumerGroup.reset_offset_new_offset_label")}
      id={"topic-select"}
      onToggle={onToggle}
      onSelect={onSelect}
      variant={SelectVariant.single}
      isOpen={isOpen}
      placeholderText={t("common:select")}
      width={200}
      selections={value}
      menuAppendTo={"parent"}
    >
      {makeOptions()}
    </Select>
  );
};
