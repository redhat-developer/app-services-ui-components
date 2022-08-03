import { FormGroup } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { CloudProvidersTilesProps } from "./CloudProviderTiles";
import { CloudProvidersTiles } from "./CloudProviderTiles";

export type FieldCloudProviderProps = {
  isValid: boolean;
} & Omit<CloudProvidersTilesProps, "validated">;
export const FieldCloudProvider: VoidFunctionComponent<
  FieldCloudProviderProps
> = ({ value, providers, onChange, isDisabled, isValid }) => {
  const { t } = useTranslation("create-kafka-instance");

  const validated = !isValid ? "error" : "default";

  return (
    <FormGroup
      label={t("cloud_provider")}
      fieldId="form-cloud-provider-option"
      validated={validated}
      helperTextInvalid={t("common:required")}
      isRequired
    >
      <CloudProvidersTiles
        providers={providers}
        value={value}
        onChange={onChange}
        isDisabled={isDisabled}
        validated={validated}
      />
    </FormGroup>
  );
};
