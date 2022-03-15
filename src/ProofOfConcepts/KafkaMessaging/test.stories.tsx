import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Test } from "./test";

export default {
  title: "PoCs/Selectors",
  component: Test,
  args: {},
} as ComponentMeta<typeof Test>;

const Template: ComponentStory<typeof Test> = (args) => <Test {...args} />;

export const Story2 = Template.bind({});
Story2.args = {};
