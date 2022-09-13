import {
  FormGroup,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
} from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { AZ } from "../../types";

export type FieldAZProps = {
  value: AZ | undefined;
  validity: "valid" | "required";
  options: AZ | "all";
  isDisabled: boolean;
  onChange: (value: AZ) => void;
};
export const FieldAZ: VoidFunctionComponent<FieldAZProps> = ({
  value,
  options,
  validity,
  isDisabled,
  onChange,
}) => {
  const { t } = useTranslation("create-kafka-instance");
  const validated = validity !== "valid" ? "error" : "default";
  const disableAZTooltip = options === "all" || isDisabled;
  const enabledZone = options === "multi" ? "multi" : "single";
  const trigger = disableAZTooltip ? "manual" : undefined;
  return (
    <FormGroup
      label={t("availability_zones")}
      fieldId="availability-zones"
      validated={validated}
      helperTextInvalid={t("common:required")}
      data-testid={"az"}
    >
      <ToggleGroup aria-label={t("availability_zone_selection")}>
        <Tooltip
          content={t("availability_zones_tooltip_message", {
            enabledZone,
          })}
          trigger={trigger}
        >
          <ToggleGroupItem
            text={t("az.single")}
            value={"single"}
            isDisabled={isDisabled || options === "multi"}
            buttonId="single"
            isSelected={value === "single"}
            onChange={() => onChange("single")}
          />
        </Tooltip>

        <Tooltip
          trigger={trigger}
          content={t("availability_zones_tooltip_message", {
            enabledZone,
          })}
        >
          <ToggleGroupItem
            text={t("az.multi")}
            value="multi"
            buttonId="multi"
            isDisabled={isDisabled || options === "single"}
            isSelected={value === "multi"}
            onChange={() => onChange("multi")}
          />
        </Tooltip>
      </ToggleGroup>
    </FormGroup>
  );
};
