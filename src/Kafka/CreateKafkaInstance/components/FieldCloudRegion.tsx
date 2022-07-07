import { FormGroup, HelperText, HelperTextItem } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { CloudRegionProps } from "./CloudRegionsSelect";
import { CloudRegionSelect } from "./CloudRegionsSelect";

export type FieldCloudRegionProps = {
  validity: "valid" | "region-unavailable" | "required";
} & Omit<CloudRegionProps, "validated" | "placeholderText">;
export const FieldCloudRegion: VoidFunctionComponent<FieldCloudRegionProps> = ({
  value,
  regions,
  onChange,
  isDisabled,
  isSizeUnavailable,
  validity,
}) => {
  const { t } = useTranslation("create-kafka-instance-with-sizes");

  const allRegionsUnavailable = regions
    ? regions.every(({ isDisabled }) => isDisabled === true) ||
      regions.length === 0
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

  const helperTextInvalid = isDisabled ? undefined : validity ===
    "region-unavailable" ? (
    <HelperText className={"pf-c-form__helper-text"}>
      <HelperTextItem variant="error" hasIcon>
        {t("form_errors.region_unavailable_message")}
      </HelperTextItem>
    </HelperText>
  ) : allRegionsUnavailable ? (
    t("all_region_unavailable_helper_text")
  ) : (
    t("common:required")
  );

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
            <HelperTextItem
              variant={someRegionsUnavailable ? "warning" : "error"}
              hasIcon
            >
              {someRegionsUnavailable
                ? t("some_region_unavailable_helper_text")
                : t("all_region_unavailable_helper_text")}
            </HelperTextItem>
          </HelperText>
        ) : undefined
      }
      helperTextInvalid={helperTextInvalid}
    >
      <CloudRegionSelect
        value={value}
        regions={regions}
        onChange={onChange}
        isDisabled={disableControl}
        isSizeUnavailable={isSizeUnavailable}
        validated={validation}
        placeholderText={placeholder}
      />
    </FormGroup>
  );
};
