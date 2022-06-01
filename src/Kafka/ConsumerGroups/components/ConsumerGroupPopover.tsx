import { Popover } from "@patternfly/react-core";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";

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
