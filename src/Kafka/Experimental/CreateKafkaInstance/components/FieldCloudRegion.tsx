import { FormGroup } from "@patternfly/react-core";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { CloudRegionProps, CloudRegionSelect } from "./CloudRegionsSelect";

export type FieldCloudRegionProps = {
  validity: "valid" | "required";
} & Omit<CloudRegionProps, "validated" | "placeholderText">;
export const FieldCloudRegion: VoidFunctionComponent<FieldCloudRegionProps> = ({
  value,
  regions,
  onChange,
  isDisabled,
  validity,
}) => {
  const { t } = useTranslation("create-kafka-instance-exp");

  const allRegionsUnavailable =
    regions.length > 0 &&
    regions.every(({ isDisabled }) => isDisabled === true);

  const disableControl =
    isDisabled || allRegionsUnavailable || regions.length === 0;

  const validation =
    validity !== "valid" || allRegionsUnavailable ? "error" : "default";

  const someRegionsUnavailable = regions.some(
    ({ isDisabled }) => isDisabled === true
  );

  const placeholder = allRegionsUnavailable
    ? t("regions_temporarily_unavailable")
    : t("select_region");

  const helperTextInvalid = (() => {
    switch (true) {
      case allRegionsUnavailable:
        return (
          <div className="pf-c-form__helper-text pf-m-error">
            {t("all_region_unavailable_helper_text")}
          </div>
        );
      case someRegionsUnavailable:
        return (
          <div className="pf-c-form__helper-text pf-m-warning">
            {t("some_region_unavailable_helper_text")}
          </div>
        );
      default:
        return (
          <div className="pf-c-form__helper-text pf-m-error">
            {t("common:required")}
          </div>
        );
    }
  })();

  return (
    <FormGroup
      data-testid="cloudRegion"
      label={t("cloud_region")}
      fieldId="form-cloud-region-option"
      isRequired
      validated={validation}
      helperTextInvalid={helperTextInvalid}
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
