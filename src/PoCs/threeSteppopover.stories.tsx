import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { KafkaStatusPopover, KafkaStatusPopoverBody, } from './threeStepPopover';

export default {
  title: 'ThreeSteps/KafkaStatusPopover',
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
      story: 'A user has just selected to create a Kafka Instance. The creation of their instance is pending.',
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
        story: 'The progress stepper is on the second step in the creation process. “Pending” is complete and “Provisioning” is in progress. Creation of the instance has begun.'
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
      story: 'Provisioning” is complete and the ”Preparing” step of the instance is in progress. This is the final step in the creation process. Once this step is complete the instance can be used. The popover will no longer be available.',
    },
  },
};

