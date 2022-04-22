import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ActionsTable } from "./kebabDropdown";
import { ActionsDropdown } from "./actionsDropdown";
import { AllActionsDropdown } from "./allActions";
import { ActionsDescriptors } from "./allActionsDescriptors";
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

const Template3: ComponentStory<typeof AllActionsDropdown> = (args) => (
  <AllActionsDropdown {...args} />
);
export const AllActions = Template3.bind({});
AllActions.args = {};

const Template4: ComponentStory<typeof ActionsDescriptors> = (args) => (
  <ActionsDescriptors {...args} />
);
export const ActionDescriptors = Template4.bind({});
ActionDescriptors.args = {};
