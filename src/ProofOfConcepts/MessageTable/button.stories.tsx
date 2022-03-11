import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Button } from "./button";

export default {
  title: "PoCs/Button",
  component: Button,
  args: {},
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Story = Template.bind({});
Story.args = {};
