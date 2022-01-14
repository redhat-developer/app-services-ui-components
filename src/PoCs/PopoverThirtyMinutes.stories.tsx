import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { KafkaStatusPopover, KafkaStatusPopoverBody, } from './PopoverThirtyMinutes';

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

export const OverThirtyMinutes = Template.bind({});
OverThirtyMinutes.args = {
  currentState: "pending",
};
OverThirtyMinutes.parameters = {
  docs: {
    description: {
      story: `
 This is error inline alert appears when the instance is taking more than thirty minutes to create.
 The messaging is also extended here to encourage the user to open a support case(this example assumes that the user is on a subscription).
      `,
    },
  },
};
 