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
    <div style={{ paddingTop: 280 }}>
        <KafkaStatusPopover {...args} />
    </div>
);

export const Pending = Template.bind({});
Pending.args = {
  currentState: "pending",
};

export const Provisioning = Template.bind({});
Provisioning.args = {
  currentState: "provisioning",
};

export const Preparing = Template.bind({});
Preparing.args = {
  currentState: "preparing",
};


