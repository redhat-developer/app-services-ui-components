import { VFC } from "react";
import { useTranslation, Trans } from "react-i18next";

import {
  Button,
  Form,
  FormGroup,
  TextInput,
  ToggleGroup,
  ToggleGroupItem,
  Tooltip,
  Slider,
  Text,
  TextVariants,
  ButtonVariant,
} from "@patternfly/react-core";
import { CloudRegionSelect } from "./CloudRegionsSelect";
import { CloudProvidersTiles } from "./CloudProviderTiles";
import { FormGroupWithPopover } from "../../../../shared/FormGroupWithPopover";
import { StandardKafkaFormProps } from "./StandardKafkaForm";

export type TrialKafkaFormProps = Omit<
  StandardKafkaFormProps,
  | "streamingUnits"
  | "remainingStreamingUnits"
  | "allowedStreamingUnits"
  | "sizeValidation"
> & {
  onClickLearnMoreAboutRegions: () => void;
};

export const TrialKafkaForm: VFC<TrialKafkaFormProps> = ({
  FORM_ID,
  isNameTaken,
  isNameInvalid,
  nameValidation,
  name,
  disableControls,
  providerValidation,
  availableProviders,
  provider,
  regionValidation,
  regions,
  region,
  azValidation,
  azOptions,
  az,
  disableAZTooltip,
  isDisabledSize,
  size,
  setSize,
  setRegion,
  setAZ,
  setProvider,
  setName,
  onSubmit,
  instanceAvailability,
  onClickLearnMoreAboutRegions,
}) => {
  const { t } = useTranslation("create-kafka-instance-exp");

  const allRegionsUnavailable =
    regions?.every(({ isDisabled }) => isDisabled === true) ||
    (regions && regions?.length <= 0);

  const someRegionsUnavailable =
    regions && regions?.some(({ isDisabled }) => isDisabled === true);

  const HelperText = () => {
    const ErrorMessage = () => {
      switch (true) {
        case allRegionsUnavailable &&
          regionValidation === "error" &&
          !disableControls:
          return (
            <div className="pf-c-form__helper-text pf-m-error">
              {t("trial_all_region_unavailable_helper_text")}
            </div>
          );
        case someRegionsUnavailable &&
          regionValidation === "warning" &&
          !disableControls:
          return (
            <div className="pf-c-form__helper-text pf-m-warning">
              {t("trial_some_region_unavailable_helper_text")}
            </div>
          );
        case regionValidation === "error" && !disableControls:
          return (
            <div className="pf-c-form__helper-text pf-m-error">
              {t("common:required")}
            </div>
          );
        default:
          return <></>;
      }
    };

    return (
      <>
        {instanceAvailability && (
          <>
            <ErrorMessage />
            <div className="pf-c-form__helper-text">
              <Trans
                ns={["create-kafka-instance-exp"]}
                i18nKey={t("cloud_region_description")}
                components={[
                  <Button
                    key="btn-learn-more"
                    variant={ButtonVariant.link}
                    onClick={onClickLearnMoreAboutRegions}
                    isInline
                  />,
                ]}
              />
            </div>
          </>
        )}
      </>
    );
  };

  return (
    <Form onSubmit={onSubmit} id={FORM_ID}>
      <FormGroup
        label={t("instance_name")}
        helperText={t("create_instance_name_helper_text")}
        helperTextInvalid={
          isNameTaken
            ? t("create_instance_name_helper_text_name_taken", { name })
            : isNameInvalid
            ? t("create_instance_name_helper_text")
            : t("common:required")
        }
        isRequired
        validated={nameValidation}
        fieldId="form-instance-name"
      >
        <TextInput
          id="form-instance-name"
          isRequired
          validated={nameValidation}
          type="text"
          value={name || ""}
          onChange={setName}
          autoFocus={true}
          isDisabled={disableControls}
        />
      </FormGroup>
      <FormGroup
        label={t("cloud_provider")}
        fieldId="form-cloud-provider-option"
        validated={providerValidation}
        helperTextInvalid={t("common:required")}
        isRequired
      >
        <CloudProvidersTiles
          providers={availableProviders}
          value={provider}
          onChange={setProvider}
          isDisabled={disableControls}
          validated={providerValidation}
        />
      </FormGroup>
      <FormGroup
        data-testid="cloudRegion"
        label={t("cloud_region")}
        fieldId="form-cloud-region-option"
        isRequired
        validated={regionValidation}
        helperTextInvalid={<HelperText />}
        helperText={<HelperText />}
      >
        <CloudRegionSelect
          value={region}
          regions={regions || []}
          onChange={setRegion}
          isDisabled={disableControls}
          validated={regionValidation}
          placeholderText={
            allRegionsUnavailable
              ? t("regions_temporarily_unavailable")
              : t("select_region")
          }
        />
      </FormGroup>
      <FormGroup
        label={t("availability_zones")}
        fieldId="availability-zones"
        validated={azValidation}
        helperTextInvalid={t("common:required")}
        data-testid={"az"}
      >
        <ToggleGroup aria-label={t("availability_zone_selection")}>
          <Tooltip
            content={t("availability_zones_tooltip_message", {
              enabledZone: azOptions?.multi ? "multi" : "single",
            })}
            trigger={disableAZTooltip ? "manual" : undefined}
          >
            <ToggleGroupItem
              text={t("az.single")}
              value={"single"}
              isDisabled={disableControls || azOptions?.single !== true}
              buttonId="single"
              isSelected={az === "single"}
              onChange={() => setAZ("single")}
            />
          </Tooltip>

          <Tooltip
            trigger={disableAZTooltip ? "manual" : undefined}
            content={t("availability_zones_tooltip_message", {
              enabledZone: azOptions?.multi ? "multi" : "single",
            })}
          >
            <ToggleGroupItem
              text={t("az.multi")}
              value="multi"
              buttonId="multi"
              isDisabled={disableControls || azOptions?.multi !== true}
              isSelected={az === "multi"}
              onChange={() => setAZ("multi")}
            />
          </Tooltip>
        </ToggleGroup>
      </FormGroup>
      <FormGroupWithPopover
        labelHead={t("common:size")}
        fieldId="streaming-size"
        fieldLabel={t("common:size")}
        labelBody={t("size_help_content")}
        buttonAriaLabel={t("size_field_aria")}
      >
        <div className="pf-c-input-group pf-u-w-50">
          <Slider
            min={1}
            max={2}
            value={isDisabledSize ? -1 : size}
            showTicks={true}
            label={t("streaming_unit")}
            className="pf-u-w-100"
            isDisabled={isDisabledSize}
            onChange={setSize}
            aria-describedby="streaming-size"
          />
          <span
            className="pf-c-input-group__text pf-m-plain pf-u-text-nowrap"
            id="plain-example"
          >
            {t("streaming_unit")}
          </span>
        </div>
        {instanceAvailability && (
          <>
            <Text component={TextVariants.p} className="pf-c-form__helper-text">
              {t("trial_kafka_size_description")}
            </Text>
            <Button
              className="pf-c-form__helper-text"
              variant={ButtonVariant.link}
              isInline
            >
              {t("learn_about_sizes")}
            </Button>
          </>
        )}
      </FormGroupWithPopover>
    </Form>
  );
};
