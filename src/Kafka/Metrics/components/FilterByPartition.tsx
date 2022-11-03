import type { SelectProps } from "@patternfly/react-core";
import { SelectGroup } from "@patternfly/react-core";
import {
  Select,
  SelectOption,
  SelectVariant,
  ToolbarItem,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type FilterByPartitionProps = {
  selectedpartition: string | undefined;
  partitionList: string[];
  onSetSelectedPartition: (value: string | undefined) => void;
};

export const FilterByPartition: VoidFunctionComponent<
  FilterByPartitionProps
> = ({ selectedpartition, partitionList, onSetSelectedPartition }) => {
  const { t } = useTranslation("metrics");

  const [ispartitionSelectOpen, setIspartitionSelectOpen] =
    useState<boolean>(false);

  const onBrokerToggle = (ispartitionSelectOpen: boolean) => {
    setIspartitionSelectOpen(ispartitionSelectOpen);
  };

  const onBrokerSelect: SelectProps["onSelect"] = (_, partition) => {
    partition !== t("top_partitions")
      ? onSetSelectedPartition(partition as string)
      : onSetSelectedPartition(undefined);
    setIspartitionSelectOpen(false);
  };

  const partitionOptions = (brokerList: string[]) => [
    <SelectOption key={"partition-filter-0"} value={t("top_partitions")} />,
    <SelectGroup label="Filter by partition" key="partitions-filter-group">
      {brokerList.map((broker, index) => (
        <SelectOption
          key={`broker-filter-${index + 1}`}
          value={broker}
          title={broker}
        />
      ))}
    </SelectGroup>,
  ];

  return (
    <ToolbarItem>
      <Select
        variant={SelectVariant.single}
        isOpen={ispartitionSelectOpen}
        onToggle={onBrokerToggle}
        onSelect={onBrokerSelect}
        selections={selectedpartition || t("top_partitions")}
        position="left"
        placeholderText={t("top_partitions")}
        aria-label={t("filter-by-partitions")}
      >
        {partitionOptions(partitionList)}
      </Select>
    </ToolbarItem>
  );
};
