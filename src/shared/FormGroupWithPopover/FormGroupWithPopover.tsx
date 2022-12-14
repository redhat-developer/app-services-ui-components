import { FormGroup, Popover } from "@patternfly/react-core";
import { HelpIcon } from "@patternfly/react-icons";
import type { FC, ReactNode } from "react";
import { useTranslation } from "react-i18next";

export type FormGroupWithPopoverProps = {
  labelHead: string;
  fieldId: string;
  fieldLabel?: string;
  labelBody: string;
  buttonAriaLabel: string;
  validated?: "success" | "warning" | "error" | "default";
  helperText?: ReactNode;
  helperTextInvalid?: ReactNode;
  isRequired?: boolean;
  handleKeyPress?: boolean;
};

export const FormGroupWithPopover: FC<FormGroupWithPopoverProps> = ({
  children,
  labelHead,
  fieldId,
  fieldLabel,
  labelBody,
  buttonAriaLabel,
  validated,
  helperText,
  helperTextInvalid,
  isRequired,
  handleKeyPress,
}) => {
  const { t } = useTranslation("common");

  return (
    <FormGroup
      fieldId={fieldId}
      label={fieldLabel}
      validated={validated}
      helperText={helperText}
      helperTextInvalid={helperTextInvalid || t("required")}
      isRequired={isRequired}
      onKeyPress={(event) => {
        handleKeyPress
          ? event.key === "Enter" && event.preventDefault()
          : undefined;
      }}
      labelIcon={
        <Popover
          headerContent={<div>{labelHead}</div>}
          bodyContent={<div>{labelBody}</div>}
        >
          <button
            aria-label={buttonAriaLabel}
            onClick={(event) => {
              event.preventDefault();
            }}
            className="pf-c-form__group-label-help"
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
    >
      {children}
    </FormGroup>
  );
};
