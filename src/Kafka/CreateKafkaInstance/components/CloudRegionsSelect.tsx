import type { SelectProps } from "@patternfly/react-core";
import { Select, SelectOption, SelectVariant } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import type { Region, RegionInfo } from "../types";

export type CloudRegionProps = {
  value: Region | undefined;
  regions: RegionInfo[] | undefined;
  isDisabled: boolean;
  isSizeUnavailable: boolean;
  onChange: (region: string) => void;
  validated?: SelectProps["validated"];
  placeholderText: SelectProps["placeholderText"];
};

export const CloudRegionSelect: FunctionComponent<CloudRegionProps> = ({
  value,
  regions,
  isDisabled,
  isSizeUnavailable,
  validated,
  onChange,
  placeholderText,
}) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onToggle = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const onSelect: SelectProps["onSelect"] = (_, value) => {
    setIsOpen((prevState) => !prevState);
    onChange(value as string);
  };

  const makeRegionOptions = regions?.map(
    ({ id, displayName, isDisabled }, index) => (
      <SelectOption
        isDisabled={isDisabled}
        disabled={isDisabled}
        key={index}
        value={id}
        description={
          isDisabled
            ? t("create-kafka-instance-with-sizes:temporarily_unavailable")
            : undefined
        }
      >
        {displayName}
      </SelectOption>
    )
  );

  return (
    <Select
      id="form-cloud-region-option"
      toggleId="form-cloud-region-option"
      name="form-cloud-region-option"
      variant={SelectVariant.single}
      onToggle={onToggle}
      onSelect={onSelect}
      validated={validated}
      selections={value}
      isOpen={isOpen}
      isDisabled={isDisabled}
      aria-describedby={
        isSizeUnavailable
          ? "instance-size-unavailable"
          : "form-cloud-region-option"
      }
      placeholderText={placeholderText}
    >
      {makeRegionOptions}
    </Select>
  );
};
