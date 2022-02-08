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
  args: {},
} as ComponentMeta<typeof OnTime>;

const Template: ComponentStory<typeof OnTime> = (args) => (
  <OnTime {...args} />
);
export const Creating = Template.bind({});
Creating.args = {};



const Template2: ComponentStory<typeof Warning> = (args) => (
    <Warning {...args} />
);
export const CreatingWithWarning = Template2.bind({});
CreatingWithWarning .args = {};
CreatingWithWarning .parameters = {
  docs: {
    description: {
        story: 'The instance creation is taking longer than fifteen minutes. This is significantly longer than expected. A warning plain inline alert displays below the "Creating" status in the table.'
    },
  },
};



const Template3: ComponentStory<typeof Error> = (args) => (
    <Error {...args} />
);
export const CreatingWithError = Template3.bind({});
CreatingWithError.args = {};
CreatingWithError.parameters = {
  docs: {
    description: {
        story: 'The instance creation is taking longer than thirty minutes. This is significantly longer than expected. An error plain inline alert displays below the "Creating" status in the table.'
    },
  },
};



const Template4: ComponentStory<typeof ReadyForUse> = (args) => (
    <ReadyForUse {...args} />
);
export const Ready = Template4.bind({});
Ready.args = {};
Ready.parameters = {
  docs: {
    description: {
        story: 'The Kafka instance is ready for use.'
    },
  },
};



const Template5: ComponentStory<typeof InstanceDeletion> = (args) => (
    <InstanceDeletion {...args} />
);
export const Deleting = Template5.bind({});
Deleting.args = {};
Deleting.parameters = {
  docs: {
    description: {
        story: 'The Kafka instance is in the process of being deleted.'
    },
  },
};


const Template6: ComponentStory<typeof InstanceCreationFailed> = (args) => (
  <InstanceCreationFailed {...args} />
);
export const Failed = Template6.bind({});
Failed.args = {};
Failed.parameters = {
docs: {
  description: {
      story: 'The Kafka instance has failed to create.'
  },
},
}; 