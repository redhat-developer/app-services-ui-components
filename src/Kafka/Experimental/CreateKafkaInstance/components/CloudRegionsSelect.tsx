import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  FormSelect,
  FormSelectOption,
  SelectProps,
} from "@patternfly/react-core";
import { Region, RegionInfo } from "../machines";

export type CloudRegionProps = {
  value: Region | undefined;
  regions: RegionInfo[];
  isDisabled?: boolean;
  onChange: (region: Region) => void;
  validated?: SelectProps["validated"];
};

export const CloudRegionSelect: FunctionComponent<CloudRegionProps> = ({
  value,
  regions: regionsProp,
  isDisabled,
  validated,
  onChange,
}) => {
  const { t } = useTranslation();

  const noRegions = [
    {
      id: "",
      displayName: t("create-kafka-instance:no_regions_available"),
      isDisabled: true,
    },
  ];
  const regions = regionsProp.length === 0 ? noRegions : regionsProp;

  return (
    <FormSelect
      validated={validated}
      value={value}
      onChange={onChange}
      id="form-cloud-region-option"
      name="cloud-region"
      isDisabled={isDisabled}
    >
      {[
        <FormSelectOption
          value=""
          key="placeholder"
          label={t("create-kafka-instance:select_region")}
        />,
        regions.map(({ id, displayName, isDisabled }, index) => {
          return (
            <FormSelectOption
              key={index}
              value={id}
              label={displayName}
              isDisabled={isDisabled}
            />
          );
        }),
      ]}
    </FormSelect>
  );
};
