import { Popover, ProgressStep, ProgressStepper, Button, Alert } from "@patternfly/react-core";
import React, {
  FunctionComponent,
  useState,
  VoidFunctionComponent,
} from "react";


type KafkaStatusPopoverProps = {
    shouldStartOpen?: boolean;
  } & KafkaStatusPopoverBodyProps;
  
  export const KafkaStatusPopover: FunctionComponent<KafkaStatusPopoverProps> = ({
    shouldStartOpen = false,
    currentState,
    children,
  }) => {
    const [isVisible, setIsVisible] = useState(shouldStartOpen);
  
    return (
      <Popover
        headerContent="Creating instance"
        bodyContent={<KafkaStatusPopoverBody currentState={currentState} />}
        isVisible={isVisible}
        shouldOpen={() => setIsVisible(true)}
        shouldClose={() => setIsVisible(false)}
      >
        {children}
      </Popover>
    );
  };
  
  type States = "pending" | "provisioning" | "preparing" | "ready";
  
  type KafkaStatusPopoverBodyProps = {
    currentState: States;
  };
  export const KafkaStatusPopoverBody: VoidFunctionComponent<
    KafkaStatusPopoverBodyProps
  > = ({ currentState }) => {
    const order: States[] = ["pending", "provisioning", "preparing", "ready"];
    const currentStep = order.findIndex((v) => v === currentState);
    console.log(currentStep);
    return (
      <div>
        <Alert variant="warning" isInline isPlain title="This is taking longer than expected." />
        <p>In the meantime you can create a Service account under the <a href="http://www.google.com/">Connections tab.</a> </p>
        <br></br>
        <p> {currentStep} of 4 steps completed</p>
        <ProgressStepper isVertical>
          <ProgressStep
            variant={currentStep === 0 ? "info" : "success"}
            isCurrent={currentState === "pending"}
            description="Passed quota check and awaiting creation."
            id="vertical-desc-step1"
            titleId="vertical-desc-step1-title"
            aria-label=""
          >
            Creation pending
          </ProgressStep>
          <ProgressStep
            variant={
              currentStep === 1 ? "info" : currentStep > 1 ? "success" : "default"
            }
            isCurrent={currentState === "provisioning"}
            description="Creating Kafka instance."
            id="vertical-desc-step2"
            titleId="vertical-desc-step2-title"
            aria-label=""
          >
            Provisioning
          </ProgressStep>
          <ProgressStep
            variant={
              currentStep === 2 ? "info" : currentStep > 2 ? "success" : "default"
            }
            isCurrent={currentState === "preparing"}
            description="Creating prerequisite resources."
            id="vertical-desc-step3"
            titleId="vertical-desc-step3-title"
            aria-label=""
          >
            Preparing
          </ProgressStep>
          <ProgressStep
            variant={
              currentStep === 3 ? "success" : "default"
            }
            isCurrent={currentState === "ready"}
            description="Kafka instace is ready for use."
            id="vertical-desc-step4"
            titleId="vertical-desc-step4-title"
            aria-label=""
          >
            Ready
          </ProgressStep>
        </ProgressStepper>
      </div>
    );
  }; 