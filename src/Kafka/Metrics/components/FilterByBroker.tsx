import type {
  SelectProps} from "@patternfly/react-core";
import {
  Select,
  SelectGroup,
  SelectOption,
  SelectVariant,
  ToolbarItem,
} from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type FilterByBrokerProps = {
  selectedBroker: string | undefined;
  BrokerList: string[];
  onSetSelectedBroker: (value: string | undefined) => void;
};

export const FilterByBroker: VoidFunctionComponent<FilterByBrokerProps> = ({
  selectedBroker,
  BrokerList = [],
  onSetSelectedBroker,
}) => {
  const { t } = useTranslation("metrics");

  const [isBrokerSelectOpen, setIsBrokerSelectOpen] = useState<boolean>(false);

  const [selectKey, setSelectKey] = useState(Math.random());

  useEffect(() => setSelectKey(Math.random()), [BrokerList]);

  const onBrokerToggle = (isBrokerSelectOpen: boolean) => {
    setIsBrokerSelectOpen(isBrokerSelectOpen);
  };
  const BrokerOptions = (BrokerList: string[]) => [
    <SelectOption key={"Broker-filter-0"} value={t("all_brokers")} />,
    <SelectGroup label="Filter by broker" key="broker-filter-group">
      {BrokerList.map((broker, index) => (
        <SelectOption
          key={`broker-filter-${index + 1}`}
          value={broker}
          title={broker}
        />
      ))}
    </SelectGroup>,
  ];

  const onBrokerFilter = (_: unknown, textInput: string) => {
    const filteredTopics =
      BrokerList.filter((broker) => broker.indexOf(textInput) != -1) || [];
    return BrokerOptions(filteredTopics);
  };

  const onBrokerSelect: SelectProps["onSelect"] = (_, selection) => {
    selection !== t("all_brokers")
      ? onSetSelectedBroker(selection as string)
      : onSetSelectedBroker(undefined);
    setIsBrokerSelectOpen(false);
  };

  return (
    <ToolbarItem>
      <Select
        key={selectKey}
        variant={SelectVariant.single}
        isOpen={isBrokerSelectOpen}
        onToggle={onBrokerToggle}
        onSelect={onBrokerSelect}
        selections={selectedBroker || t("all_brokers")}
        position="left"
        placeholderText={
          <>
            <FilterIcon /> {t("all_brokers")}
          </>
        }
        isGrouped
        hasInlineFilter
        onFilter={onBrokerFilter}
        aria-labelledby={"filter-by-broker"}
      >
        {BrokerOptions(BrokerList)}
      </Select>
    </ToolbarItem>
  );
};
