import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { DataSciencePage } from './DataSciencePage'

export default {
  title: "Features/DataSciencePage",
  component: DataSciencePage,
  args: {},
} as ComponentMeta<typeof DataSciencePage>;

const Template: ComponentStory<typeof DataSciencePage> = (args) => (
  <DataSciencePage {...args} />
);

export const DataScience = Template.bind({});