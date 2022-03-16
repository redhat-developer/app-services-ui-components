import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { PartitionSelector } from "./partitionSelector";

export default {
  title: "PoCs/Selectors",
  component: PartitionSelector,
  args: {},
} as ComponentMeta<typeof PartitionSelector>;

const Template: ComponentStory<typeof PartitionSelector> = (args) => (
  <PartitionSelector {...args} />
);

export const Partition = Template.bind({});
Partition.args = {};
