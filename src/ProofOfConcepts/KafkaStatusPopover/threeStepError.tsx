import {
  Popover,
  ProgressStep,
  ProgressStepper,
  Button,
  Alert,
  Stack,
  StackItem,
} from "@patternfly/react-core";
import React, {
  FunctionComponent,
  useState,
  VoidFunctionComponent,
} from "react";

type KafkaStatusPopover3Props = {
  shouldStartOpen?: boolean;
} & KafkaStatusPopoverBody3Props;

export const KafkaStatusPopover3: FunctionComponent<
  KafkaStatusPopover3Props
> = ({ shouldStartOpen = false, currentState, children }) => {
  const [isVisible, setIsVisible] = useState(shouldStartOpen);

  return (
    <Popover
      headerContent="Creating instance"
      bodyContent={<KafkaStatusPopoverBody3 currentState={currentState} />}
      isVisible={isVisible}
      shouldOpen={() => setIsVisible(true)}
      shouldClose={() => setIsVisible(false)}
      position={"right"}
      enableFlip={false}
    >
      {children}
    </Popover>
  );
};

type States = "pending" | "provisioning" | "preparing" | "ready";

type KafkaStatusPopoverBody3Props = {
  currentState: States;
};
export const KafkaStatusPopoverBody3: VoidFunctionComponent<
  KafkaStatusPopoverBody3Props
> = ({ currentState }) => {
  const order: States[] = ["pending", "provisioning", "preparing", "ready"];
  const currentStep = order.findIndex((v) => v === currentState);
  console.log(currentStep);
  return (
    <div>
      <Stack hasGutter>
        <StackItem>
          <Alert
            variant="danger"
            isInline
            isPlain
            title="This is taking longer than expected."
          >
            <p>
              In the meantime, you can create a service account under the{" "}
              <a href="http://www.google.com/">Connections tab. </a>If your
              Kafka instance continues to take longer than expected,
              <a href="http://www.google.com/"> open a support case.</a>{" "}
            </p>
          </Alert>
        </StackItem>
        <StackItem>
          <p>{currentStep} of 3 steps completed</p>
        </StackItem>
        <StackItem>
          <ProgressStepper isVertical>
            <ProgressStep
              variant={currentStep === 0 ? "info" : "success"}
              isCurrent={currentState === "pending"}
              description="Passed quota check and awaiting creation"
              id="vertical-desc-step1"
              titleId="vertical-desc-step1-title"
              aria-label=""
            >
              Creation pending
            </ProgressStep>
            <ProgressStep
              variant={
                currentStep === 1
                  ? "info"
                  : currentStep > 1
                  ? "success"
                  : "default"
              }
              isCurrent={currentState === "provisioning"}
              description="Creating Kafka instance"
              id="vertical-desc-step2"
              titleId="vertical-desc-step2-title"
              aria-label=""
            >
              Provisioning
            </ProgressStep>
            <ProgressStep
              variant={
                currentStep === 2
                  ? "info"
                  : currentStep > 2
                  ? "success"
                  : "default"
              }
              isCurrent={currentState === "preparing"}
              description="Creating prerequisite resources"
              id="vertical-desc-step3"
              titleId="vertical-desc-step3-title"
              aria-label=""
            >
              Preparing
            </ProgressStep>
          </ProgressStepper>
        </StackItem>
      </Stack>
    </div>
  );
};
