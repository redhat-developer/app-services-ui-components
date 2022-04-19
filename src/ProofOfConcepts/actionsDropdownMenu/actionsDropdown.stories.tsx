import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ActionsTable } from "./kebabDropdown";
import { ActionsDropdown } from "./actionsDropdown";

export default {
  title: "Proof Of Concepts/Dropdown/ActionsDropdown ",
  component: ActionsDropdown,
  args: {},
} as ComponentMeta<typeof ActionsDropdown>;

const Template: ComponentStory<typeof ActionsDropdown> = (args) => (
  <ActionsDropdown {...args} />
);
export const ActionsMenu = Template.bind({});
ActionsMenu.args = {};

const Template2: ComponentStory<typeof ActionsTable> = (args) => (
  <ActionsTable {...args} />
);
export const KebabMenu = Template2.bind({});
KebabMenu.args = {};
