import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { KafkaStatusPopover2, KafkaStatusPopoverBody2, } from './threeStepWarning';

export default {
  title: 'ThreeSteps/KafkaStatusPopoverWarning',
  component: KafkaStatusPopover2,
  subcomponents: { KafkaStatusPopoverBody2 },
  args: {
    children: <a>Creating</a>,
    shouldStartOpen: true,
  }, 
} as ComponentMeta<typeof KafkaStatusPopover2>;

const Template: ComponentStory<typeof KafkaStatusPopover2> = (args) => (
    <div style={{ paddingTop: 280, height: 600 }}>
        <KafkaStatusPopover2 {...args} />
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


