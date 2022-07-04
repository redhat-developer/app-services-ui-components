import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { SmallModal } from "./tAndCModal";

export default {
  title: "PoC/SmallModal",
  component: SmallModal,
  args: {},
} as ComponentMeta<typeof SmallModal>;

const Template: ComponentStory<typeof SmallModal> = (args) => (
  <SmallModal {...args} />
);

export const Story = Template.bind({});
Story.args = {};
