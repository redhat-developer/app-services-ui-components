import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { OnTime } from './underfifteen';
import { Warning } from './overfifteen';
import { Error } from './overthirty';
import { ReadyForUse } from './ready';
import { InstanceDeletion } from './deleting';
import { InstanceCreationFailed } from './failed';

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
WarningCreation.parameters = {
  docs: {
    description: {
        story: 'The instance creation is taking longer than fifteen minutes. This is significantly longer than expected. A warning plain inline alert displays below the "Creating" status in the table.'
    },
  },
};



const Template3: ComponentStory<typeof Error> = (args) => (
    <Error {...args} />
);
export const ErrorCreation = Template3.bind({});
ErrorCreation.args = {};
ErrorCreation.parameters = {
  docs: {
    description: {
        story: 'The instance creation is taking longer than thirty minutes. This is significantly longer than expected. An error plain inline alert displays below the "Creating" status in the table.'
    },
  },
};



const Template4: ComponentStory<typeof ReadyForUse> = (args) => (
    <ReadyForUse {...args} />
);
export const InstanceReady = Template4.bind({});
InstanceReady.args = {};
InstanceReady.parameters = {
  docs: {
    description: {
        story: 'The Kafka instance is ready for use.'
    },
  },
};



const Template5: ComponentStory<typeof InstanceDeletion> = (args) => (
    <InstanceDeletion {...args} />
);
export const DeletingInstance = Template5.bind({});
DeletingInstance.args = {};
DeletingInstance.parameters = {
  docs: {
    description: {
        story: 'The Kafka instance is in the process of being deleted.'
    },
  },
};


const Template6: ComponentStory<typeof InstanceCreationFailed> = (args) => (
  <InstanceCreationFailed {...args} />
);
export const InstanceFailed = Template6.bind({});
InstanceFailed.args = {};
InstanceFailed.parameters = {
docs: {
  description: {
      story: 'The Kafka instance has failed to create.'
  },
},
};