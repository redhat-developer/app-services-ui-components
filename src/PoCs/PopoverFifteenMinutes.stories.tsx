import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { KafkaStatusPopover, KafkaStatusPopoverBody, } from './PopoverFifteenMinutes';

export default {
  title: 'PoCs/KafkaStatusPopover',
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

export const OverFifteenMinutes = Template.bind({});
OverFifteenMinutes.args = {
  currentState: "pending",
}; 
