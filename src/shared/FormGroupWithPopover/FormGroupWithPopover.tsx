import { FormGroup, Popover } from "@patternfly/react-core";
import HelpIcon from "@patternfly/react-icons/dist/js/icons/help-icon";
import { FC, ReactNode } from "react";
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
