 import { ComponentStory, ComponentMeta } from '@storybook/react';
 import React from 'react';

 import { JelloTs } from './button';

 export default {
   title: 'POC/JelloTs',
   component: JelloTs,
   args: {

   },
 } as ComponentMeta<typeof JelloTs>;

  const Template: ComponentStory<typeof JelloTs> = (args) => (
   <JelloTs {...args} />
 );

 export const Story = Template.bind({});
 Story.args = {};
