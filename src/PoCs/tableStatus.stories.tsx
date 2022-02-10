import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { StatusLabel } from './tableStatus';

export default {
  title: 'pocs/StatusLabel',
  component: StatusLabel,
  args: {
    instanceName: "string",
  },
} as ComponentMeta<typeof StatusLabel>;

const Template: ComponentStory<typeof StatusLabel> = (args) => (
  <StatusLabel {...args} />
);

export const Ready = Template.bind({});
Ready.args = {
  value: "ready",
};


export const Creating = Template.bind({});
Creating.args = {
  value: "creating",
};

export const CreatingOver15Minutes = Template.bind({});
CreatingOver15Minutes.args = {
  value: "creatingWarning",
};

export const CreatingOver30Minutes = Template.bind({});
CreatingOver30Minutes.args = {
  value: "creatingError",
};

export const Deleting = Template.bind({});
Deleting.args = {
  value: "deleting",
};

export const Failed = Template.bind({});
Failed.args = {
  value: "failed",
};