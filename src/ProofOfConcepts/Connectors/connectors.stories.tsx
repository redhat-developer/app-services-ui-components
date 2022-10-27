import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ListHorizontalRules } from "./connectors";

export default {
  title: "PoC/Connectors",
  component: ListHorizontalRules,
  args: {},
} as ComponentMeta<typeof ListHorizontalRules>;

const Template: ComponentStory<typeof ListHorizontalRules> = (args) => (
  <ListHorizontalRules {...args} />
);

export const Story = Template.bind({});
Story.args = {};
