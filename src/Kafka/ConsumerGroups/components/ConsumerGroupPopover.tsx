import { Popover } from "@patternfly/react-core";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import { FunctionComponent } from "react";

type ConsumerGroupPopoverProps = {
  title: string;
  description: string;
};

export const ConsumerGroupPopover: FunctionComponent<
  ConsumerGroupPopoverProps
> = ({ title, description }) => {
  return (
    <Popover
      aria-label="Consumer groups popover"
      headerContent={<div>{title}</div>}
      bodyContent={<div>{description}</div>}
    >
      <OutlinedQuestionCircleIcon />
    </Popover>
  );
};
