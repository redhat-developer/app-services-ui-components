import {
  Button,
  ButtonVariant,
  Slider,
  SliderProps,
} from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FormGroupWithPopover } from "../../../../shared";
import { Size } from "../machines";

export type FieldSizeProps = {
  value: number;
  sizes: Size[];
  remainingStreamingUnits: number;
  isDisabled: boolean;
  validity: "valid" | "required" | "over-quota" | "trial";
  onChange: (size: Size) => void;
  onLearnHowToAddStreamingUnits: () => void;
  onLearnMoreAboutSizes: () => void;
};
export const FieldSize: VoidFunctionComponent<FieldSizeProps> = ({
  value,
  sizes,
  remainingStreamingUnits,
  isDisabled,
  validity,
  onChange,
  onLearnHowToAddStreamingUnits,
  onLearnMoreAboutSizes,
}) => {
  const { t } = useTranslation("create-kafka-instance-exp");

  const valueIndex = sizes.findIndex((size) => size.streamingUnits === value);
  const steps: SliderProps["customSteps"] = sizes.map((s, index) => ({
    value: index,
    label: `${s.streamingUnits}`,
  }));

  const handleChange = (index: number) => {
    onChange(sizes[index]);
  };

  const validation =
    (validity !== "valid" || remainingStreamingUnits < value) &&
    validity !== "trial"
      ? "error"
      : "default";

  const helperTextTrial = (
    <div className="pf-c-form__helper-text" aria-live={"polite"}>
      <div>{t("trial_kafka_size_description")}</div>
      <Button
        className="pf-c-form__helper-text"
        variant={ButtonVariant.link}
        isInline
        onClick={onLearnMoreAboutSizes}
      >
        {t("learn_about_sizes")}
      </Button>
    </div>
  );

  const helperTextOverQuota = (
    <div className="pf-c-form__helper-text pf-m-error" aria-live={"polite"}>
      <div>
        {t("standard_kafka_streaming_unit", {
          count: remainingStreamingUnits,
        })}
      </div>
      <Button
        className="pf-c-form__helper-text"
        variant={ButtonVariant.link}
        isInline
        onClick={onLearnHowToAddStreamingUnits}
      >
        {t("standard_kafka_size_description")}
      </Button>
    </div>
  );

  return (
    <FormGroupWithPopover
      labelHead={t("common:size")}
      fieldId="streaming-size"
      fieldLabel={t("common:size")}
      labelBody={t("size_help_content")}
      buttonAriaLabel={t("size_field_aria")}
      isRequired={true}
      validated={validation}
      helperText={
        validity !== "trial"
          ? t("standard_kafka_streaming_unit", {
              count: remainingStreamingUnits,
            })
          : helperTextTrial
      }
      helperTextInvalid={
        validity === "over-quota" ? helperTextOverQuota : undefined
      }
    >
      <div className="pf-c-input-group pf-u-w-50">
        <Slider
          max={steps.length - 1}
          value={valueIndex}
          showTicks={true}
          customSteps={steps}
          label={t("streaming_unit")}
          className="pf-u-w-100"
          isDisabled={isDisabled || validity === "trial"}
          onChange={handleChange}
          aria-describedby="streaming-size"
        />
        <span
          className="pf-c-input-group__text pf-m-plain pf-u-text-nowrap"
          id="plain-example"
        >
          {t("streaming_unit")}
        </span>
      </div>
    </FormGroupWithPopover>
  );
};
