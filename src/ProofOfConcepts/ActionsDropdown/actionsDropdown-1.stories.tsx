import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ActionsDropdown } from "./actionsDropdown-1";

export default {
  title: "PoCs/ActionsDropdown",
  component: ActionsDropdown,
  args: {},
} as ComponentMeta<typeof ActionsDropdown>;

const Template: ComponentStory<typeof ActionsDropdown> = (args) => (
  <ActionsDropdown {...args} />
);

export const Story = Template.bind({});
Story.args = {};
