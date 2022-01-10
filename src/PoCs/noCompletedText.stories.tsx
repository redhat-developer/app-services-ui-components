import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import {
    KafkaStatusPopover,
    KafkaStatusPopoverBody,
  } from './noCompletedText';

export default {
  title: 'LessText/KafkaStatusPopover',
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

export const Story = Template.bind({});
Story.args = {};
