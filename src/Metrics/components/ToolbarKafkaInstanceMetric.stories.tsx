import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ToolbarKafkaInstanceMetric } from "./ToolbarKafkaInstanceMetric";

export default {
  title: "Components/Metrics/ToolbarKafkaInstanceMetric",
  component: ToolbarKafkaInstanceMetric,
  controls: {},
  args: {
    title: "Sample title",
    topicList: ["lorem", "dolor", "ipsum"],
    isDisabled: false,
  },
} as ComponentMeta<typeof ToolbarKafkaInstanceMetric>;

const Template: ComponentStory<typeof ToolbarKafkaInstanceMetric> = (args) => (
  <ToolbarKafkaInstanceMetric {...args} />
);

export const Example = Template.bind({});
Example.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const Refreshing = Template.bind({});
Refreshing.args = {
  isRefreshing: true,
};
