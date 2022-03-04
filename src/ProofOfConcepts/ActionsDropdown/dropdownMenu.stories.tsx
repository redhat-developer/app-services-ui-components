import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { DropdownMenu } from "./dropdownMenu";

export default {
  title: "PoCs/DropdownMenu",
  component: DropdownMenu,
  args: {},
} as ComponentMeta<typeof DropdownMenu>;

const Template: ComponentStory<typeof DropdownMenu> = (args) => (
  <DropdownMenu {...args} />
);

export const Story = Template.bind({});
Story.args = {};
