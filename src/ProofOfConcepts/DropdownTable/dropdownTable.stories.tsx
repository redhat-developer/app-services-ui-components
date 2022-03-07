import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { DropdownTable } from "./dropdownTable";

export default {
  title: "Proof Of Concepts/DropdownTable",
  component: DropdownTable,
  args: {},
} as ComponentMeta<typeof DropdownTable>;

const Template: ComponentStory<typeof DropdownTable> = (args) => (
  <DropdownTable {...args} />
);

export const Story = Template.bind({});
Story.args = {};
