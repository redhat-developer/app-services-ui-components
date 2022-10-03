import { differenceInMinutes } from "date-fns";
import type { VoidFunctionComponent } from "react";
import { useCallback, useRef, useState } from "react";
import { useInterval } from "../../utils";
import type { Status } from "../types";
import type { StatusPopoverProps } from "./components";
import { StatusLabel, StatusPopover, SuspendPopover } from "./components";
import { KafkaToPopoverMapping } from "./types";

export type KafkaInstanceStatusProps = {
  status: Status;
  createdAt: Date;
  warningAfterMinutes?: number;
  errorAfterMinutes?: number;
} & Pick<StatusPopoverProps, "onClickConnectionTabLink" | "onClickSupportLink">;

/**
 * A component to show the status of a Kafka instance combining the
 * `StatusPopover` with the `StatusLabel`, with automatic handling of which
 * statuses should have a companion popover.
 */
export const KafkaInstanceStatus: VoidFunctionComponent<
  KafkaInstanceStatusProps
> = ({
  status,
  createdAt,
  warningAfterMinutes = 15,
  errorAfterMinutes = 30,
  onClickConnectionTabLink,
  onClickSupportLink,
}) => {
  const popoverStatus = KafkaToPopoverMapping[status];
  const [alert, setAlert] = useState<"warning" | "error" | false>(false);
  const labelRef = useRef<HTMLButtonElement>(null);

  const checkCreatedAt = useCallback(() => {
    const elapsed = differenceInMinutes(new Date(), createdAt);
    if (elapsed > errorAfterMinutes) {
      setAlert("error");
    } else if (elapsed > warningAfterMinutes) {
      setAlert("warning");
    } else {
      setAlert(false);
    }
  }, [createdAt, errorAfterMinutes, warningAfterMinutes]);

  useInterval(checkCreatedAt, 5000);
  const showWarning = alert === "warning";
  const showError = alert === "error";
  return (
    <>
      {popoverStatus === "suspended" ? (
        <SuspendPopover reference={labelRef} />
      ) : (
        <StatusPopover
          status={popoverStatus || "preparing"}
          showWarning={showWarning}
          showError={showError}
          onClickConnectionTabLink={onClickConnectionTabLink}
          onClickSupportLink={onClickSupportLink}
          reference={labelRef}
        />
      )}
      <StatusLabel
        value={status}
        showWarning={showWarning}
        showError={showError}
        withPopover={popoverStatus !== undefined}
        ref={labelRef}
      />
    </>
  );
};
