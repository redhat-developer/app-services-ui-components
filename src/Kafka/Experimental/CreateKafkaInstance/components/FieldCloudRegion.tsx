import { FormGroup, HelperText, HelperTextItem } from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { CloudRegionProps, CloudRegionSelect } from "./CloudRegionsSelect";

export type FieldCloudRegionProps = {
  validity: "valid" | "region-unavailable" | "required";
} & Omit<CloudRegionProps, "validated" | "placeholderText">;
export const FieldCloudRegion: VoidFunctionComponent<FieldCloudRegionProps> = ({
  value,
  regions,
  onChange,
  isDisabled,
  validity,
}) => {
  const { t } = useTranslation("create-kafka-instance-exp");

  const allRegionsUnavailable = regions
    ? regions.every(({ isDisabled }) => isDisabled === true)
    : true;

  const disableControl =
    isDisabled || allRegionsUnavailable || regions?.length === 0;

  const someRegionsUnavailable =
    !allRegionsUnavailable &&
    regions?.some(({ isDisabled }) => isDisabled === true);

  const validation =
    validity !== "valid"
      ? value !== undefined
        ? "error"
        : "default"
      : "default";

  const placeholder =
    allRegionsUnavailable && regions
      ? t("regions_temporarily_unavailable")
      : t("select_region");

  const helperTextInvalid = allRegionsUnavailable
    ? t("all_region_unavailable_helper_text")
    : t("common:required");

  return (
    <FormGroup
      data-testid="cloudRegion"
      label={t("cloud_region")}
      fieldId="form-cloud-region-option"
      isRequired
      validated={validation}
      helperText={
        regions && (allRegionsUnavailable || someRegionsUnavailable) ? (
          <HelperText className={"pf-c-form__helper-text"}>
            <HelperTextItem variant="warning" hasIcon>
              {t("some_region_unavailable_helper_text")}
            </HelperTextItem>
          </HelperText>
        ) : undefined
      }
      helperTextInvalid={
        isDisabled ? undefined : validity === "region-unavailable" ? (
          <HelperText className={"pf-c-form__helper-text"}>
            <HelperTextItem variant="error" hasIcon>
              {t("form_errors.region_unavailable_message")}
            </HelperTextItem>
          </HelperText>
        ) : (
          helperTextInvalid
        )
      }
    >
      <CloudRegionSelect
        value={value}
        regions={regions}
        onChange={onChange}
        isDisabled={disableControl}
        validated={validation}
        placeholderText={placeholder}
      />
    </FormGroup>
  );
};
