import { FormGroup, Popover, ValidatedOptions } from "@patternfly/react-core";
import HelpIcon from "@patternfly/react-icons/dist/js/icons/help-icon";
import React from "react";

export type FormGroupWithPopoverProps = {
  children: React.ReactNode;
  labelHead: string;
  fieldId: string;
  fieldLabel?: string;
  labelBody: string;
  buttonAriaLabel: string;
  validated?: ValidatedOptions;
  helperText?: string;
  helperTextInvalid?: string;
  isRequired?: boolean;
};

export const FormGroupWithPopover: React.FC<FormGroupWithPopoverProps> = ({
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
  const preventButtonSubmit = (event: { preventDefault: () => any }) =>
    event.preventDefault();

  return (
    <FormGroup
      fieldId={fieldId}
      label={fieldLabel}
      validated={validated}
      helperText={helperText}
      helperTextInvalid={helperTextInvalid}
      isRequired={isRequired}
      labelIcon={
        <Popover
          headerContent={<div>{labelHead}</div>}
          bodyContent={<div>{labelBody}</div>}
        >
          <button
            aria-label={buttonAriaLabel}
            onClick={preventButtonSubmit}
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
