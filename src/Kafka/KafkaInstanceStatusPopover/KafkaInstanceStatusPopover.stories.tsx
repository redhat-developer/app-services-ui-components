import { ComponentStory, ComponentMeta } from "@storybook/react";

import { KafkaInstanceStatusPopover } from "./KafkaInstanceStatusPopover";
import { InstanceStatus } from "./KafkaInstanceStatusProgressStepper";

export default {
  component: KafkaInstanceStatusPopover,
  args: {
    isOpen: true,
    isVertical: true,
  },
  followsDesignSystem: true,
  parameters: {
    docs: {
      description: {
        component: `
  Introduction/Background

  This is a popover that can be reached from the Kafka Instance table while the status of the instance in question is “Creating”.
  A Kafka instance usually takes a few minutes to create. The purpose of this popover is to give the user some insights into
  the creation process of their instance while they wait for it to be available to use.

  -The text at the top explains that the instance will be ready shortly & suggests that the user creates a service account while they wait.
   (Provides a link to the “Connections tab" where this is done).

  -The steps shown in the progress stepper are statuses that show in the api. They have been grouped together under the one overall
  “Creating status” in the table.There is some descriptive text accompanying each step too. When these steps are complete the instance will be ready for use

  -The popover is only available while instance creation is in progress.

  -After creation is complete the table displays the ready status and the popover is no longer available.

  Pending Status

  A user has just selected to create a Kafka Instance. The creation of their instance is pending

    `,
      },
    },
  },
} as ComponentMeta<typeof KafkaInstanceStatusPopover>;

const Template: ComponentStory<typeof KafkaInstanceStatusPopover> = (args) => (
  <div style={{ paddingTop: 280, height: 600 }}>
    <KafkaInstanceStatusPopover {...args}>
      <a>Creating</a>
    </KafkaInstanceStatusPopover>
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

export const StatusWithWarning = Template.bind({});
StatusWithWarning.args = {
  currentStatus: InstanceStatus.pending,
  showWarning: true,
};

StatusWithWarning.parameters = {
  docs: {
    description: {
      story:
        "Instance creation is in progress and started more than 15 minutes ago. A warning is given as the instance’s creation is taking longer than expected.",
    },
  },
};

export const StatusWithError = Template.bind({});
StatusWithError.args = {
  currentStatus: InstanceStatus.pending,
  showError: true,
};

StatusWithError.parameters = {
  docs: {
    description: {
      story:
        "Instance creation is in progress and started more than 30 minutes ago. An error is given because the instance’s creation is taking significantly longer than expected. If the user is on a subscription they are invited to open a support case at this point.",
    },
  },
};
