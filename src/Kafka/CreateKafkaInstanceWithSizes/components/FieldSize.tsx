import {
  Grid,
  GridItem,
  Skeleton,
  Slider,
  SliderProps,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FormGroupWithPopover } from "../../../shared";
import { Size } from "../types";
import { FieldSizeHelperText } from "./FieldSizeHelperText";
import { FieldSizeHelperTextOverQuota } from "./FieldSizeHelperTextOverQuota";
import { FieldSizeHelperTextTrial } from "./FieldSizeHelperTextTrial";

export type FieldSizeProps = {
  value: number;
  sizes: Size[] | undefined;
  remainingQuota: number;
  isDisabled: boolean;
  isLoading: boolean;
  isError: boolean;
  validity: "valid" | "required" | "over-quota" | "trial";
  onChange: (size: Size) => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
};
export const FieldSize: VoidFunctionComponent<FieldSizeProps> = ({
  value,
  sizes,
  remainingQuota,
  isDisabled,
  isLoading,
  isError,
  validity,
  onChange,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
}) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");

  const isRequired = validity !== "trial";

  const helperTextTrial = (
    <FieldSizeHelperTextTrial onClick={onLearnMoreAboutSizes} />
  );

  if (isLoading || isError) {
    return (
      <FormGroupWithPopover
        labelHead={t("common:size")}
        fieldId="streaming-size"
        fieldLabel={t("common:size")}
        labelBody={t("size_help_content")}
        buttonAriaLabel={t("size_field_aria")}
        isRequired={isRequired}
        helperText={
          <Grid sm={6} lg={12} hasGutter data-testid={"size-loading"}>
            <GridItem>
              <Skeleton width={"50%"} fontSize={"3xl"} />
            </GridItem>
            <GridItem>
              <Skeleton width={"40%"} fontSize={"sm"} />
            </GridItem>
          </Grid>
        }
        validated={isError ? "error" : "default"}
        helperTextInvalid={t("sizes_error")}
      />
    );
  }

  if (sizes === undefined) {
    return (
      <FormGroupWithPopover
        labelHead={t("common:size")}
        fieldId="streaming-size"
        fieldLabel={t("common:size")}
        labelBody={t("size_help_content")}
        buttonAriaLabel={t("size_field_aria")}
        isRequired={isRequired}
        helperText={validity === "trial" ? helperTextTrial : t("sizes_missing")}
      >
        <div data-testid={"size-slider"} />
      </FormGroupWithPopover>
    );
  }

  const valueIndex =
    validity !== "trial" ? sizes.findIndex((size) => size.quota === value) : -1;

  const steps: SliderProps["customSteps"] = sizes.map((s, index) => ({
    value: index,
    label: `${s.quota}`,
  }));

  const helperText = (
    <FieldSizeHelperText
      remainingQuota={remainingQuota}
      isPreview={sizes[valueIndex]?.status === "preview"}
      isUnavailable={sizes[valueIndex]?.isDisabled}
    />
  );
  const helperTextOverQuota = (
    <FieldSizeHelperTextOverQuota
      remainingQuota={remainingQuota}
      onClick={onLearnHowToAddStreamingUnits}
    />
  );

  const handleChange = (index: number) => {
    onChange(sizes[index]);
  };

  const validation =
    (validity !== "valid" || remainingQuota < value) &&
    validity !== "trial" &&
    validity !== "required"
      ? "error"
      : "default";

  return (
    <FormGroupWithPopover
      labelHead={t("common:size")}
      fieldId="streaming-size"
      fieldLabel={t("common:size")}
      labelBody={t("size_help_content")}
      buttonAriaLabel={t("size_field_aria")}
      isRequired={isRequired}
      validated={validation}
      helperText={validity !== "trial" ? helperText : helperTextTrial}
      helperTextInvalid={
        validity === "over-quota" ? helperTextOverQuota : helperText
      }
    >
      <div className="pf-c-input-group pf-u-w-50">
        <Slider
          data-testid={"size-slider"}
          max={steps.length - 1}
          value={valueIndex}
          showTicks={true}
          customSteps={steps}
          className="pf-u-w-100"
          isDisabled={isDisabled || validity === "trial"}
          onChange={handleChange}
          aria-describedby="streaming-size"
        />
        <span
          className="pf-c-input-group__text pf-m-plain pf-u-text-nowrap"
          id="streaming-size"
        >
          {t("streaming_unit")}
        </span>
      </div>
    </FormGroupWithPopover>
  );
};
