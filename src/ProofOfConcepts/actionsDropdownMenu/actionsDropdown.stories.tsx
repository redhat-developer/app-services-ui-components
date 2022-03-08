import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ActionsDropdown } from "./actionsDropdown";

export default {
  title: "Proof Of Concepts/ActionsDropdown ",
  component: ActionsDropdown,
  args: {},
} as ComponentMeta<typeof ActionsDropdown>;

const Template: ComponentStory<typeof ActionsDropdown> = (args) => (
  <ActionsDropdown {...args} />
);

export const Story = Template.bind({});
Story.args = {};
