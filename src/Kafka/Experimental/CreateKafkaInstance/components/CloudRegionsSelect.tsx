import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  SelectProps,
  Select,
  SelectVariant,
  SelectOption,
} from "@patternfly/react-core";
import { Region, RegionInfo } from "../machines";

export type CloudRegionProps = {
  value: Region | undefined;
  regions: RegionInfo[];
  isDisabled?: boolean;
  onChange: (region: string) => void;
  validated?: SelectProps["validated"];
  placeholderText: SelectProps["placeholderText"];
};

export const CloudRegionSelect: FunctionComponent<CloudRegionProps> = ({
  value,
  regions,
  isDisabled,
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

  const clearSelection = () => {
    setIsOpen(false);
    onChange("");
  };

  const makeRegionOptions = regions?.map(
    ({ id, displayName, isDisabled }, index) => (
      <SelectOption
        isDisabled={isDisabled}
        key={index}
        value={id}
        {...(isDisabled && {
          description: t("create-kafka-instance-exp:temporarily_unavailable"),
        })}
      >
        {displayName}
      </SelectOption>
    )
  );

  // makeRegionOptions.unshift(
  //   <SelectOption
  //     key="placeholder"
  //     value={t("create-kafka-instance:select_region")}
  //     isPlaceholder
  //   >
  //     {t("create-kafka-instance:select_region")}
  //   </SelectOption>
  // );

  return (
    <Select
      id="form-cloud-region-option"
      toggleId="form-cloud-region-option"
      name="form-cloud-region-option"
      variant={SelectVariant.single}
      onToggle={onToggle}
      onSelect={onSelect}
      validated={validated}
      onClear={clearSelection}
      selections={value}
      isOpen={isOpen}
      isDisabled={isDisabled}
      aria-labelledby="form-cloud-region-option"
      placeholderText={placeholderText}
    >
      {makeRegionOptions}
    </Select>
  );
};
