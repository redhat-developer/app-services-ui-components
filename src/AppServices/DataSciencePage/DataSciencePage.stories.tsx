import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { DataSciencePage } from "./DataSciencePage";

export default {
  component: DataSciencePage,
  args: {},
} as ComponentMeta<typeof DataSciencePage>;

const Template: ComponentStory<typeof DataSciencePage> = (args) => (
  <DataSciencePage {...args} />
);

export const Example = Template.bind({});
