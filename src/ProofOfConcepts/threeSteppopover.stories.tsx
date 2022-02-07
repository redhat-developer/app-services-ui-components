import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { KafkaStatusPopover, KafkaStatusPopoverBody } from "./threeStepPopover";
import {
  KafkaStatusPopover2,
  KafkaStatusPopoverBody2,
} from "./threeStepWarning";
import { KafkaStatusPopover3, KafkaStatusPopoverBody3 } from "./threeStepError";

export default {
  component: KafkaStatusPopover,
  subcomponents: { KafkaStatusPopoverBody },
  args: {
    children: <a>Creating</a>,
    shouldStartOpen: true,
  },
} as ComponentMeta<typeof KafkaStatusPopover>;

const Template: ComponentStory<typeof KafkaStatusPopover> = (args) => (
  <div style={{ paddingTop: 280, height: 600 }}>
    <KafkaStatusPopover {...args} />
  </div>
);

export const Pending = Template.bind({});
Pending.args = {
  currentState: "pending",
};
Pending.parameters = {
  docs: {
    description: {
      story:
        "A user has just selected to create a Kafka Instance. The creation of their instance is pending.",
    },
  },
};

export const Provisioning = Template.bind({});
Provisioning.args = {
  currentState: "provisioning",
};
Provisioning.parameters = {
  docs: {
    description: {
      story:
        "The progress stepper is on the second step in the creation process. “Pending” is complete and “Provisioning” is in progress. Creation of the instance has begun.",
    },
  },
};

export const Preparing = Template.bind({});
Preparing.args = {
  currentState: "preparing",
};
Preparing.parameters = {
  docs: {
    description: {
      story:
        "Provisioning” is complete and the ”Preparing” step of the instance is in progress. This is the final step in the creation process. Once this step is complete the instance can be used. The popover will no longer be available.",
    },
  },
};

const newTemplate: ComponentStory<typeof KafkaStatusPopover2> = (args) => (
  <div style={{ paddingTop: 280, height: 600 }}>
    <KafkaStatusPopover2 {...args} />
  </div>
);
export const warning = newTemplate.bind({});
warning.args = {
  currentState: "pending",
};
warning.parameters = {
  docs: {
    description: {
      story:
        "Instance creation is in progress and started more than 15 minutes ago. A warning is given as the instance’s creation is taking longer than expected.",
    },
  },
};
const newestTemplate: ComponentStory<typeof KafkaStatusPopover3> = (args) => (
  <div style={{ paddingTop: 280, height: 600 }}>
    <KafkaStatusPopover3 {...args} />
  </div>
);

export const error = newestTemplate.bind({});
error.args = {
  currentState: "pending",
};
error.parameters = {
  docs: {
    description: {
      story:
        "Instance creation is in progress and started more than 30 minutes ago. An error is given because the instance’s creation is taking significantly longer than expected. If the user is on a subscription they are invited to open a support case at this point.",
    },
  },
};
