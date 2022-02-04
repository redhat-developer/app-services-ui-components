import React, { useCallback, useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

import { Popover, PopoverProps } from "@patternfly/react-core";
import { PopoverContent, PopoverContentProps } from "./PopoverContent";
import { PopoverStatus } from "../../types";
import { useInterval } from "../../../../utils";
import { differenceInMinutes } from "date-fns";

export type StatusPopoverProps = {
  status: PopoverStatus;
  createdAt: Date;
  initialOpen?: boolean;
  children: PopoverProps["children"];
  onClickConnectionTabLink: PopoverContentProps["onClickConnectionTabLink"];
  onClickSupportLink: PopoverContentProps["onClickSupportLink"];
  warningAfterMinutes?: number;
  errorAfterMinutes?: number;
};

/**
 * ## Introduction
 *
 * This is a popover that can be reached from the Kafka Instance table while the status of the instance in question is “Creating”.
 * A Kafka instance usually takes a few minutes to create. The purpose of this popover is to give the user some insights into
 * the creation process of their instance while they wait for it to be available to use.
 *
 * - The text at the top explains that the instance will be ready shortly & suggests that the user creates a service account while they wait.
 *  (Provides a link to the “Connections tab" where this is done).
 *
 * - The steps shown in the progress stepper are statuses that show in the api. They have been grouped together under the one overall
 * “Creating status” in the table.There is some descriptive text accompanying each step too. When these steps are complete the instance will be ready for use
 *
 * - The popover is only available while instance creation is in progress.
 * - After creation is complete the table displays the ready status and the popover is no longer available.
 *
 */
export const StatusPopover: VoidFunctionComponent<StatusPopoverProps> = ({
  initialOpen = false,
  status,
  createdAt,
  onClickConnectionTabLink,
  onClickSupportLink,
  warningAfterMinutes = 15,
  errorAfterMinutes = 30,
  children,
}) => {
  const { t } = useTranslation("create-kafka-instance");

  const [isVisible, setIsVisible] = useState(initialOpen);
  const onClose = () => setIsVisible(false);
  const [alert, setAlert] = useState<"warning" | "error" | false>(false);

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

  const handleClickConnectionTabLink = useCallback(() => {
    onClose();
    onClickConnectionTabLink();
  }, [onClickConnectionTabLink]);

  const handleClickSupportLink = useCallback(() => {
    onClose();
    onClickSupportLink();
  }, [onClickSupportLink]);

  return (
    <Popover
      headerContent={t("kafka_status_popover.title")}
      bodyContent={
        <PopoverContent
          currentStatus={status}
          showWarning={alert === "warning"}
          showError={alert === "error"}
          onClickConnectionTabLink={handleClickConnectionTabLink}
          onClickSupportLink={handleClickSupportLink}
        />
      }
      isVisible={isVisible}
      shouldOpen={() => setIsVisible(true)}
      shouldClose={() => setIsVisible(false)}
      position={"right"}
      enableFlip={true}
    >
      {children}
    </Popover>
  );
};
