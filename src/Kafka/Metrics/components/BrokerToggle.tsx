import { ToggleGroup, ToggleGroupItem } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { BrokerFilter } from "../types";

export type BrokerToggleProps = {
  value: BrokerFilter | undefined;
  onChange: (value: BrokerFilter) => void;
};

export const BrokerToggle: VoidFunctionComponent<BrokerToggleProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation("metrics");

  return (
    <ToggleGroup>
      <ToggleGroupItem
        text={t("broker_filter.total")}
        value="total"
        buttonId="total"
        isSelected={value === "total"}
        onChange={() => onChange("total")}
      />
      <ToggleGroupItem
        text={t("broker_filter.per_broker")}
        value="perBroker"
        buttonId="perBroker"
        isSelected={value === "perBroker"}
        onChange={() => onChange("perBroker")}
      />
    </ToggleGroup>
  );
};
