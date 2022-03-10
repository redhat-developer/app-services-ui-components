import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Selector } from "./partitionSelector";

export default {
  title: "PoCs/Selector",
  component: Selector,
  args: {},
} as ComponentMeta<typeof Selector>;

const Template: ComponentStory<typeof Selector> = (args) => (
  <Selector {...args} />
);

export const Story = Template.bind({});
Story.args = {};
