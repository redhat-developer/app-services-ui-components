import React from "react";

import {
  ProgressStep,
  ProgressStepper,
  ProgressStepProps,
} from "@patternfly/react-core";

export enum InstanceStatus {
  "pending" = "pending",
  "provisioning" = "provisioning",
  "preparing" = "preparing",
  "ready" = "ready",
}

export type Step = ProgressStepProps & {
  status: InstanceStatus;
};

type InstanceStatusProgressStepperProps = {
  currentStatus: InstanceStatus;
  steps: Step[];
  isVertical?: boolean;
};

const InstanceStatusProgressStepper: React.VFC<
  InstanceStatusProgressStepperProps
> = ({ isVertical, currentStatus, steps }) => {
  const statusOrders: InstanceStatus[] = [
    InstanceStatus.pending,
    InstanceStatus.provisioning,
    InstanceStatus.preparing,
    InstanceStatus.ready,
  ];

  const currentStep = statusOrders.findIndex((s) => s === currentStatus);

  return (
    <ProgressStepper isVertical={isVertical}>
      {Array.isArray(steps) &&
        steps?.map(
          (
            {
              id,
              titleId,
              description,
              title,
              "aria-label": ariaLabel,
              status,
            },
            index
          ) => (
            <ProgressStep
              id={id}
              key={`${id}'-'${index}`}
              variant={
                (currentStep === index && "info") ||
                (currentStep > index && "success") ||
                "default"
              }
              isCurrent={currentStatus === status}
              description={description}
              titleId={titleId}
              aria-label={ariaLabel}
            >
              {title}
            </ProgressStep>
          )
        )}
    </ProgressStepper>
  );
};

export { InstanceStatusProgressStepper };
