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
  parameters: {
    previewHeight: 1600,
    chromatic: { disableSnapshot: true },
    docs: {},
  },
} as ComponentMeta<typeof KafkaStatusPopover>;

const Template: ComponentStory<typeof KafkaStatusPopover> = (args) => (
  <div style={{ paddingTop: 280, height: 600 }}>
    <KafkaStatusPopover {...args} />
  </div>
);

export const OverFifteenMinutes = Template.bind({});
OverFifteenMinutes.args = {
  currentState: "pending",
}; 
OverFifteenMinutes.parameters = {
  docs: {
    description: {
      story: `
This is for a situation when the instance creation is taking longer than fifteen minutes. 
A plain inline alert in a warning variation is added to the popover. 
This can happen on any step of the progress stepper once the overall time since creation started is longer than fifteen minutes.
      `,
    },
  },
};
