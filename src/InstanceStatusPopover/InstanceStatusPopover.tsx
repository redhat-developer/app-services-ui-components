import React, {
  FunctionComponent,
  useState,
  VoidFunctionComponent,
} from "react";
import { useTranslation } from "react-i18next";

import {
  Popover,
  Stack,
  StackItem,
  PopoverProps,
} from "@patternfly/react-core";
import {
  InstanceStatusProgressStepper,
  InstanceStatus,
  Step,
} from "./InstanceStatusProgressStepper";

type InstanceStatusPopoverContentProps = {
  currentStatus: InstanceStatus;
  steps: Step[];
  isVertical?: boolean;
  description: React.ReactElement;
};

export type InstanceStatusPopoverProps = {
  isOpen?: boolean;
} & InstanceStatusPopoverContentProps &
  PopoverProps;

export const InstanceStatusPopover: FunctionComponent<
  InstanceStatusPopoverProps
> = ({
  isOpen = false,
  currentStatus,
  children,
  steps,
  enableFlip = false,
  position = "right",
  isVertical,
  description,
  headerContent,
}) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  return (
    <Popover
      headerContent={headerContent}
      bodyContent={
        <InstanceStatusPopoverContent
          currentStatus={currentStatus}
          steps={steps}
          isVertical={isVertical}
          description={description}
        />
      }
      isVisible={isVisible}
      shouldOpen={() => setIsVisible(true)}
      shouldClose={() => setIsVisible(false)}
      position={position}
      enableFlip={enableFlip}
    >
      {children}
    </Popover>
  );
};

const InstanceStatusPopoverContent: VoidFunctionComponent<
  InstanceStatusPopoverContentProps
> = ({ currentStatus, steps, isVertical = false, description }) => {
  const { t } = useTranslation();

  const statusOrders = [
    InstanceStatus.pending,
    InstanceStatus.provisioning,
    InstanceStatus.preparing,
    InstanceStatus.ready,
  ];

  const currentStep = statusOrders.findIndex((s) => s === currentStatus);

  return (
    <div>
      <Stack hasGutter>
        <StackItem>{description}</StackItem>
        <StackItem>
          {t("common:progress_stepper_current_step", {
            currentStep,
            total: statusOrders.length - 1,
          })}
        </StackItem>
        <StackItem>
          <InstanceStatusProgressStepper
            currentStatus={currentStatus}
            steps={steps}
            isVertical={isVertical}
          />
        </StackItem>
      </Stack>
    </div>
  );
};
