import { FormGroup, TextInput } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type FieldInstanceNameProps = {
  value: string;
  validity: "valid" | "required" | "taken" | "invalid";
  isDisabled: boolean;
  onChange: (value: string) => void;
};
export const FieldInstanceName: VoidFunctionComponent<
  FieldInstanceNameProps
> = ({ value, validity, isDisabled, onChange }) => {
  const { t } = useTranslation("create-kafka-instance");
  const validation = validity !== "valid" ? "error" : "default";

  return (
    <FormGroup
      label={t("instance_name")}
      helperText={t("create_instance_name_helper_text")}
      helperTextInvalid={
        validity === "taken"
          ? t("create_instance_name_helper_text_name_taken", { name: value })
          : validity === "invalid"
          ? t("create_instance_name_helper_text")
          : t("common:required")
      }
      isRequired
      validated={validation}
      fieldId="form-instance-name"
    >
      <TextInput
        id="form-instance-name"
        isRequired
        validated={validation}
        type="text"
        value={value}
        onChange={onChange}
        autoFocus={true}
        isDisabled={isDisabled}
      />
    </FormGroup>
  );
};
