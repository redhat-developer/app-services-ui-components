import type { SelectProps } from "@patternfly/react-core";
import {
  Select,
  SelectOption,
  SelectVariant,
  ToolbarItem,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { PartitionSelect } from "../types";

type FilterByPartitionProps = {
  partitionValue: PartitionSelect;
  onSetSelectedPartition: (value: PartitionSelect) => void;
};

export const FilterByPartition: VoidFunctionComponent<
  FilterByPartitionProps
> = ({ partitionValue, onSetSelectedPartition }) => {
  const { t } = useTranslation("metrics");

  const [ispartitionSelectOpen, setIspartitionSelectOpen] =
    useState<boolean>(false);

  const onBrokerToggle = (ispartitionSelectOpen: boolean) => {
    setIspartitionSelectOpen(ispartitionSelectOpen);
  };

  const partitionSelectOption: { [key in PartitionSelect]: string } = {
    Top10: t("top10_partitions"),
    Top20: t("top20_partitions"),
  };

  const onBrokerSelect: SelectProps["onSelect"] = (_, partition) => {
    onSetSelectedPartition(partition as PartitionSelect);
    setIspartitionSelectOpen(false);
  };

  const partitionOptions = () => {
    return Object.entries(partitionSelectOption).map(([value, label]) => (
      <SelectOption key={value} value={value}>
        {label}
      </SelectOption>
    ));
  };

  return (
    <ToolbarItem>
      <Select
        variant={SelectVariant.single}
        isOpen={ispartitionSelectOpen}
        onToggle={onBrokerToggle}
        onSelect={onBrokerSelect}
        selections={partitionValue}
        position="left"
        placeholderText={t("top10_partitions")}
        aria-label={t("filter-by-partitions")}
      >
        {partitionOptions()}
      </Select>
    </ToolbarItem>
  );
};
