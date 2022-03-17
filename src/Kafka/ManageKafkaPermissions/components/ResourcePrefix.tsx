import { FormGroup, TextInput, ValidatedOptions } from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export type ResourcePrefixProps = {
  value: string | undefined;
  onChangeValue: (value: string | undefined) => void;
  invalid: boolean;
};

export const ResourcePrefix: React.VFC<ResourcePrefixProps> = ({
  value,
  onChangeValue,
  invalid,
}) => {
  const { t } = useTranslation(["manage-kafka-permissions"]);

  const onPrefixValueChange = (value: string | undefined) => {
    onChangeValue(value);
  };

  return (
    <FormGroup
      validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
      helperTextInvalid={t("common:required")}
      fieldId={"resource-prefix-input"}
    >
      <TextInput
        placeholder={t("resourcePrefix.placeholder_text")}
        validated={invalid ? ValidatedOptions.error : ValidatedOptions.default}
        value={value}
        type="text"
        onChange={onPrefixValueChange}
        aria-label="Prefix value text input"
        style={{ maxWidth: 200 }}
      />
    </FormGroup>
  );
};
