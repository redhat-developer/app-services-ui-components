import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import {
  KafkaStatusPopover,
  KafkaStatusPopoverBody,
} from "./KafkaStatusPopover";

export default {
  title: "PoCs/KafkaStatusPopover",
  component: KafkaStatusPopover,
  subcomponents: { KafkaStatusPopoverBody },
  args: {
    children: <a>Creating</a>,
    shouldStartOpen: true,
  }, 
  parameters: {
    previewHeight: 1600,
    chromatic: { disableSnapshot: true },
    docs: {},
  },
} as ComponentMeta<typeof KafkaStatusPopover>;

const Template: ComponentStory<typeof KafkaStatusPopover> = (args) => (
  <div style={{ paddingTop: 280, height: 600  } }> 
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
      story: `
This is the first step to create a Kafka instance. 
      `,
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
      story: `
This is the second step in the creation process. In this example provisioning is in progress. 
      `,
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
      story: `
This is the final step in the creation process. 
After this is complete the instance will be ready for use and the popover will close and no longer be available from the table.
      `,
    },
  },
};

export const Ready = Template.bind({});
Ready.args = {
  currentState: "ready",
};
Ready.parameters = {
  docs: {
    description: {
      story: `
Need to look into the design for the ready state...
      `,
    },
  },
}; 