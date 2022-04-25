import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ActionsTable } from "./kebabDropdown";
import { ActionsDropdown } from "./actionsDropdown";
import { AllActionsDropdown } from "./allActions";

export default {
  title: "Proof Of Concepts/Dropdown/ActionsDropdown ",
  component: ActionsDropdown,
  args: {},
} as ComponentMeta<typeof ActionsDropdown>;

const Template: ComponentStory<typeof ActionsDropdown> = (args) => (
  <ActionsDropdown {...args} />
);
export const KafkaInstanceActionsMenu = Template.bind({});
KafkaInstanceActionsMenu.args = {};

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
