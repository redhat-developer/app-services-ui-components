import { Popover, ProgressStep, ProgressStepper, Button } from "@patternfly/react-core";
import React, {
  FunctionComponent,
  useState,
  VoidFunctionComponent,
} from "react";

type KafkaStatusPopoverProps = {
  shouldStartOpen?: boolean;
} & KafkaStatusPopoverBodyProps;

/**
*<strong> Introduction/Background </strong>
*
*This is a popover that can be reached from the Kafka Instance table while the status of the instance in question is “Creating”. A Kafka instance usually takes a few minutes to create. The purpose of this popover is to give the user some insights into the creation process of their instance while they wait for it to be available to use. 
*
*  -The text at the top explains that the instance will be ready shortly & suggests that the user creates a service account while they wait. (Provides a link to the “Connections tab" where this is done).
*
*  -The steps shown in the progress stepper are statuses that show in the api. They have been grouped together under the one overall “Creating status” in the table.There is some descriptive text accompanying each step too. When these steps are complete the instance will be ready for use
*
*  -The popover is only available while instance creation is in progress.
*
*  -After creation is complete the table displays the ready status and the popover is no longer available.
*<br><br><br><br>
*<h3>Pending</h3>
*
*A user has just selected to create a Kafka Instance. The creation of their instance is pending.
*/
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
      position={'right'}
      enableFlip={false}
    >
      {children}
    </Popover>
  );
};

type States = "pending" | "provisioning" | "preparing" | "ready" ;

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
        <p>This will be ready shortly. In the meantime, you can create a service account under the <a href="http://www.google.com/">Connections tab.</a> </p>
        <br></br>
        <p>{currentStep} of 3 steps completed</p>
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
                currentStep === 1 ? "info" : currentStep > 1 ? "success" : "default"
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
                currentStep === 2 ? "info" : currentStep > 2 ? "success" : "default"
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
        </div>
    );
    };   