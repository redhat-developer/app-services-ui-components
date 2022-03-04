import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { KebabTable } from './kebabTable';

export default {
  title: 'Proof Of Concepts/KebabTable',
  component: KebabTable,
  args: {

  },
} as ComponentMeta<typeof KebabTable>;

const Template: ComponentStory<typeof KebabTable> = (args) => (
  <KebabTable {...args} />
);

export const Story = Template.bind({});
Story.args = {};
