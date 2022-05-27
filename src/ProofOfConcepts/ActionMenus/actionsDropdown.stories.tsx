import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ActionsTable } from "./kebabDropdown";
import { ActionsDropdown } from "./actionsDropdown";
import { AllActionsDropdown } from "./allActions";

export default {
  title: "Proof Of Concepts/Action Menus/Action Menus",
  component: ActionsDropdown,
  args: {},
} as ComponentMeta<typeof ActionsDropdown>;

const Template: ComponentStory<typeof ActionsDropdown> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 400 }}>
    <ActionsDropdown {...args} />
  </div>
);
export const KafkaInstanceResourceLevelMenu = Template.bind({});
KafkaInstanceResourceLevelMenu.args = {};

const Template2: ComponentStory<typeof ActionsTable> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 400 }}>
    <ActionsTable {...args} />
  </div>
);
export const KafkaInstanceTableMenu = Template2.bind({});
KafkaInstanceTableMenu.args = {};

const Template3: ComponentStory<typeof AllActionsDropdown> = (args) => (
  <div style={{ paddingTop: 25, paddingLeft: 25, height: 600 }}>
    <AllActionsDropdown {...args} />
  </div>
);
export const AllActions = Template3.bind({});
AllActions.args = {};
