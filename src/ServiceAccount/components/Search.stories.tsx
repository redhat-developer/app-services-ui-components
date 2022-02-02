import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Search } from "./Search";

export default {
  title: "Components/ServiceAccount/ServiceAccountToolbar/Search",
  component: Search,
  args: {},
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Story = Template.bind({});
Story.args = {};
