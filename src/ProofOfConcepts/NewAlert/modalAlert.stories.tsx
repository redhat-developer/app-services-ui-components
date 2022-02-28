import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { TimeAlert } from "./modalAlert";

export default {
  title: "pocs/timeAlert",
  component: TimeAlert,
  args: {},
} as ComponentMeta<typeof TimeAlert>;

const Template: ComponentStory<typeof TimeAlert> = (args) => (
  <TimeAlert {...args} />
);

export const Story = Template.bind({});
Story.args = {};
