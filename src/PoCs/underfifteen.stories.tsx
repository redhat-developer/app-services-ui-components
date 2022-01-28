import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { OnTime } from './underfifteen';
import { Warning } from './overfifteen';
import { Error } from './overthirty';
import { ReadyForUse } from './ready';
import { InstanceDeletion } from './deleting';

export default {
  title: 'PoCs/StatusComponent',
  component: OnTime,
  args: {

  },
} as ComponentMeta<typeof OnTime>;

const Template: ComponentStory<typeof OnTime> = (args) => (
  <OnTime {...args} />
);
export const OnTimeCreation = Template.bind({});
OnTimeCreation.args = {};



const Template2: ComponentStory<typeof Warning> = (args) => (
    <Warning {...args} />
);
export const WarningCreation = Template2.bind({});
WarningCreation.args = {};



const Template3: ComponentStory<typeof Error> = (args) => (
    <Error {...args} />
);
export const ErrorCreation = Template3.bind({});
ErrorCreation.args = {};



const Template4: ComponentStory<typeof ReadyForUse> = (args) => (
    <ReadyForUse {...args} />
);
export const InstanceReady = Template4.bind({});
InstanceReady.args = {};



const Template5: ComponentStory<typeof InstanceDeletion> = (args) => (
    <InstanceDeletion {...args} />
);
export const DeletingInstance = Template5.bind({});
DeletingInstance.args = {};