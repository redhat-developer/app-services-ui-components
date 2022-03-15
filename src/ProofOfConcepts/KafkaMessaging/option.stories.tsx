import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Option } from "./option";

export default {
  title: "PoCs/Selectors",
  component: Option,
  args: {},
} as ComponentMeta<typeof Option>;

const Template: ComponentStory<typeof Option> = (args) => <Option {...args} />;

export const Story2 = Template.bind({});
Story2.args = {};
