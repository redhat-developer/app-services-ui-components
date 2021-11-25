import { Popover } from "@patternfly/react-core";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/js/icons/outlined-question-circle-icon";
import React, { VoidFunctionComponent } from "react";

type ChartPopoverProps = {
  title: string;
  description: string;
};

export const ChartPopover: VoidFunctionComponent<ChartPopoverProps> = ({
  title,
  description,
}) => {
  return (
    <Popover
      aria-label="Basic popover"
      headerContent={<div>{title}</div>}
      bodyContent={<div>{description}</div>}
    >
      <OutlinedQuestionCircleIcon />
    </Popover>
  );
};
