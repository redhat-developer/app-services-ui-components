import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ActionsDropdown } from "./actionsDropdown";
import { ActionsDropdownExtra } from "./actionsDropdownExtra";
import { ActionsDropdownNoHeader } from "./actionsDropdownNoHeader";

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

const Template2: ComponentStory<typeof ActionsDropdownExtra> = (args) => (
  <ActionsDropdownExtra {...args} />
);

export const Story2 = Template2.bind({});
Story2.args = {};

const Template3: ComponentStory<typeof ActionsDropdownNoHeader> = (args) => (
  <ActionsDropdownNoHeader {...args} />
);

export const Story3 = Template3.bind({});
Story3.args = {};
