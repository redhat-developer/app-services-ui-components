import { Popover, FormGroup, TextInput } from "@patternfly/react-core";
import React from "react";
import { HelpIcon } from "@patternfly/react-icons";
import "./TextWithLabelPopover.css";

export interface TextWithLabelPopoverProps {
  fieldId: string;
  fieldLabel: string;
  fieldValue?: string;
  popoverHeader: string;
  popoverBody: string;
  btnAriaLabel: string;
  showUnlimited?: boolean;
}

export const TextWithLabelPopover: React.FC<TextWithLabelPopoverProps> = ({
  fieldId,
  fieldLabel,
  btnAriaLabel,
  fieldValue,
  popoverBody,
  popoverHeader,
  showUnlimited,
}) => {
  let displayText = "-";

  if (
    showUnlimited === true &&
    fieldValue !== undefined &&
    parseInt(fieldValue) < 0
  ) {
    displayText = "Unlimited";
  } else if (fieldValue) {
    displayText = fieldValue;
  }

  return (
    <FormGroup
      fieldId={fieldId}
      label={fieldLabel}
      className="kafka-ui-form-group--readonly"
      labelIcon={
        <Popover
          headerContent={<div>{popoverHeader}</div>}
          bodyContent={<div>{popoverBody}</div>}
        >
          <button
            aria-label={btnAriaLabel}
            onClick={(event) => event.preventDefault()}
            className="pf-c-form__group-label-help"
          >
            <HelpIcon noVerticalAlign />
          </button>
        </Popover>
      }
    >
      <TextInput
        isReadOnly
        type="text"
        id={fieldId}
        name={fieldId}
        value={displayText}
      />
    </FormGroup>
  );
};
