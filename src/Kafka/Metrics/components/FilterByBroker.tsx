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

type FilterByBrokerProps = {
  selectedBroker: string | undefined;
  brokerList: string[];
  onSetSelectedBroker: (value: string | undefined) => void;
  disableToolbar: boolean;
};

export const FilterByBroker: VoidFunctionComponent<FilterByBrokerProps> = ({
  selectedBroker,
  brokerList,
  onSetSelectedBroker,
  disableToolbar,
}) => {
  const { t } = useTranslation("metrics");

  const [isBrokerSelectOpen, setIsBrokerSelectOpen] = useState<boolean>(false);

  const onBrokerToggle = (isBrokerSelectOpen: boolean) => {
    setIsBrokerSelectOpen(isBrokerSelectOpen);
  };

  const onBrokerSelect: SelectProps["onSelect"] = (_, broker) => {
    broker !== t("all_brokers")
      ? onSetSelectedBroker(broker as string)
      : onSetSelectedBroker(undefined);
    setIsBrokerSelectOpen(false);
  };

  const brokerOptions = (brokerList: string[]) => [
    <SelectOption key={"broker-filter-0"} value={t("all_brokers")} />,
    <SelectGroup label="Filter by broker" key="broker-filter-group">
      {brokerList.map((broker, index) => (
        <SelectOption
          key={`broker-filter-${index + 1}`}
          value={broker}
          title={broker}
        />
      ))}
    </SelectGroup>,
  ];

  const isDisabled = disableToolbar || brokerList.length === 0;

  return (
    <ToolbarItem>
      <Select
        variant={SelectVariant.single}
        isOpen={isBrokerSelectOpen}
        onToggle={onBrokerToggle}
        onSelect={onBrokerSelect}
        selections={selectedBroker || t("all_brokers")}
        position="left"
        placeholderText={t("all_brokers")}
        aria-label={t("filter-by-broker")}
        isDisabled={isDisabled}
      >
        {brokerOptions(brokerList)}
      </Select>
    </ToolbarItem>
  );
};
