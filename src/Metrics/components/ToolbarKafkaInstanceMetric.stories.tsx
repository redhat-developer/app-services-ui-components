import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ToolbarKafkaInstanceMetric } from "./ToolbarKafkaInstanceMetric";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Components/Metrics/ToolbarKafkaInstanceMetric",
  component: ToolbarKafkaInstanceMetric,
  controls: {},
  args: {
    title: "Sample title",
    topicList: ["lorem", "dolor", "ipsum"],
    isDisabled: false,
  },
  parameters: {
    i18n: MetricsI18n,
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
