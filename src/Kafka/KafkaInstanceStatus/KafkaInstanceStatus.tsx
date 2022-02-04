import React, { VoidFunctionComponent } from "react";
import { StatusLabel, StatusPopover, StatusPopoverProps } from "./components";

import { KafkaStatus, KafkaToPopoverMapping } from "./types";

export type KafkaInstanceStatusProps = {
  status: KafkaStatus;
} & Omit<StatusPopoverProps, "status" | "children">;

/**
 * A component to show the status of a Kafka instance combining the
 * `StatusPopover` with the `StatusLabel`, with automatic handling of which
 * statuses should have a companion popover.
 */
export const KafkaInstanceStatus: VoidFunctionComponent<
  KafkaInstanceStatusProps
> = ({ status, ...props }) => {
  const popoverStatus = KafkaToPopoverMapping[status];

  return popoverStatus ? (
    <StatusPopover status={popoverStatus} {...props}>
      <StatusLabel value={status} withPopover={true} />
    </StatusPopover>
  ) : (
    <StatusLabel value={status} />
  );
};
