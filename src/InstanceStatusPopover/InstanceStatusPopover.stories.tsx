import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { InstanceStatusPopover } from "./InstanceStatusPopover";
import { InstanceStatus } from "./InstanceStatusProgressStepper";

export default {
  title: "Components/InstanceStatusPopover",
  component: InstanceStatusPopover,
} as ComponentMeta<typeof InstanceStatusPopover>;

const steps = [
  {
    id: "pending",
    title: "Creation pending",
    titleId: "pending",
    status: InstanceStatus.pending,
    description: "Acceptance is pending",
    "aria-label": "Passed quota check and awaiting creation",
  },
  {
    id: "provisioning",
    title: "Provisioning",
    titleId: "provisioning",
    status: InstanceStatus.provisioning,
    description: "Instance is provisioning",
    "aria-label": "Creating Kafka instance",
  },
  {
    id: "preparing",
    title: "Preparing",
    titleId: "preparing",
    status: InstanceStatus.preparing,
    description: "Instance is being prepared for use",
    "aria-label": "Creating prerequisite resources",
  },
];

const description = (
  <p>
    This will be ready shortly. In the meantime, you can create a service
    account under the <a href="#">Connections tab.</a>
  </p>
);

const Template: ComponentStory<typeof InstanceStatusPopover> = (args) => (
  <div style={{ paddingTop: 280, height: 600 }}>
    <InstanceStatusPopover
      isOpen={true}
      steps={steps}
      isVertical={true}
      description={description}
      headerContent="Creating instance"
      {...args}
    >
      <a>Creating</a>
    </InstanceStatusPopover>
  </div>
);

export const PendingStatus = Template.bind({});
PendingStatus.args = {
  currentStatus: InstanceStatus.pending,
};

PendingStatus.parameters = {
  docs: {
    description: {
      story:
        "A user has just selected to create a Kafka Instance. The creation of their instance is pending.",
    },
  },
};

export const ProvisioningStatus = Template.bind({});
ProvisioningStatus.args = {
  currentStatus: InstanceStatus.provisioning,
};

ProvisioningStatus.parameters = {
  docs: {
    description: {
      story:
        "The progress stepper is on the second step in the creation process. “Pending” is complete and “Provisioning” is in progress. Creation of the instance has begun.",
    },
  },
};

export const PreparingStatus = Template.bind({});
PreparingStatus.args = {
  currentStatus: InstanceStatus.preparing,
};

PreparingStatus.parameters = {
  docs: {
    description: {
      story:
        "Provisioning” is complete and the ”Preparing” step of the instance is in progress. This is the final step in the creation process. Once this step is complete the instance can be used. The popover will no longer be available.",
    },
  },
};
