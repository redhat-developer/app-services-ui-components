import { useCallback, useRef, useState, VoidFunctionComponent } from "react";
import { StatusLabel, StatusPopover, StatusPopoverProps } from "./components";

import { KafkaStatus, KafkaToPopoverMapping } from "./types";
import { differenceInMinutes } from "date-fns";
import { useInterval } from "../../utils";

export type KafkaInstanceStatusProps = {
  status: KafkaStatus;
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
      {popoverStatus && (
        <StatusPopover
          status={popoverStatus}
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
