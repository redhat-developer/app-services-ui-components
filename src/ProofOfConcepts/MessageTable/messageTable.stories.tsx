import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { Table } from "./messageTable";

export default {
  title: "Proof Of Concepts/Message Browsing Table",
  component: Table,
  args: {},
} as ComponentMeta<typeof Table>;

const Template: ComponentStory<typeof Table> = (args) => <Table {...args} />;

export const Story = Template.bind({});
Story.args = {};
