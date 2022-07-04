import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { NavigationModal } from "./navigationModal";

export default {
  title: "ProofOfConcepts/NavigationModal",
  component: NavigationModal,
  args: {},
} as ComponentMeta<typeof NavigationModal>;

const Template: ComponentStory<typeof NavigationModal> = (args) => (
  <NavigationModal {...args} />
);

export const Story = Template.bind({});
Story.args = {};
