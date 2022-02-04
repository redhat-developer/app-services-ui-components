import React from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { StatusPopover } from "./StatusPopover";
import { sub } from "date-fns";

export default {
  component: StatusPopover,
  args: {
    createdAt: new Date(),
  },
  followsDesignSystem: true,
} as ComponentMeta<typeof StatusPopover>;

const Template: ComponentStory<typeof StatusPopover> = (args, { viewMode }) => {
  const inDocs = viewMode === "docs";
  return (
    <div style={{ textAlign: "center", paddingTop: inDocs ? 0 : 250 }}>
      <StatusPopover initialOpen={args.initialOpen || !inDocs} {...args}>
        <a>Click me</a>
      </StatusPopover>
    </div>
  );
};

export const Example = Template.bind({});
Example.args = {
  status: "provisioning",
};

export const PendingStatus = Template.bind({});
PendingStatus.args = {
  status: "pending",
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
  status: "provisioning",
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
  status: "preparing",
};

PreparingStatus.parameters = {
  docs: {
    description: {
      story:
        "Provisioning” is complete and the ”Preparing” step of the instance is in progress. This is the final step in the creation process. Once this step is complete the instance can be used. The popover will no longer be available.",
    },
  },
};

export const MoreThan15Minutes = Template.bind({});
MoreThan15Minutes.args = {
  status: "provisioning",
  createdAt: sub(new Date(), { minutes: 19 }),
};

MoreThan15Minutes.parameters = {
  docs: {
    description: {
      story:
        "Instance creation is in progress and started more than 15 minutes ago. A warning is given as the instance’s creation is taking longer than expected.",
    },
  },
};

export const MoreThan30Minutes = Template.bind({});
MoreThan30Minutes.args = {
  status: "provisioning",
  createdAt: sub(new Date(), { minutes: 38 }),
};

MoreThan30Minutes.parameters = {
  docs: {
    description: {
      story:
        "Instance creation is in progress and started more than 30 minutes ago. An error is given because the instance’s creation is taking significantly longer than expected. If the user is on a subscription they are invited to open a support case at this point.",
    },
  },
};
