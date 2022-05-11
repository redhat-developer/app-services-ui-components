import {
  Button,
  ButtonVariant,
  HelperText,
  HelperTextItem,
  Skeleton,
  Slider,
  SliderProps,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FormGroupWithPopover } from "../../../shared";
import { Size } from "../types";

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
    <>
      <HelperText className={"pf-c-form__helper-text"}>
        <HelperTextItem>{t("trial_kafka_size_description")}</HelperTextItem>
      </HelperText>
      <HelperText>
        <HelperTextItem>
          <Button
            className="pf-c-form__helper-text"
            variant={ButtonVariant.link}
            isInline
            onClick={onLearnMoreAboutSizes}
          >
            {t("learn_about_sizes")}
          </Button>
        </HelperTextItem>
      </HelperText>
    </>
  );

  const helperTextOverQuota = (
    <>
      <HelperText className={"pf-c-form__helper-text"}>
        <HelperTextItem variant="error" hasIcon>
          {t("standard_kafka_streaming_unit", {
            count: remainingQuota,
          })}
        </HelperTextItem>
      </HelperText>
      <HelperText>
        <HelperTextItem>
          <Button
            className="pf-c-form__helper-text"
            variant={ButtonVariant.link}
            isInline
            onClick={onLearnHowToAddStreamingUnits}
          >
            {t("standard_kafka_size_description")}
          </Button>
        </HelperTextItem>
      </HelperText>
    </>
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
        helperText={<Skeleton width={"50%"} />}
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
      />
    );
  }
  const valueIndex =
    validity !== "trial" ? sizes.findIndex((size) => size.quota === value) : -1;
  const steps: SliderProps["customSteps"] = sizes.map((s, index) => ({
    value: index,
    label: `${s.quota}`,
  }));

  const handleChange = (index: number) => {
    onChange(sizes[index]);
  };

  const validation =
    (validity !== "valid" || remainingQuota < value) && validity !== "trial"
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
      helperText={
        validity !== "trial"
          ? t("standard_kafka_streaming_unit", {
              count: remainingQuota,
            })
          : helperTextTrial
      }
      helperTextInvalid={
        validity === "over-quota" ? helperTextOverQuota : undefined
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
