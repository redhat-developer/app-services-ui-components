import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ToolbarTopicsMetrics } from "./ToolbarTopicsMetrics";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Components/Metrics/ToolbarTopicsMetrics",
  component: ToolbarTopicsMetrics,
  controls: {},
  args: {
    title: "Sample title",
    topicList: ["lorem", "dolor", "ipsum"],
    isDisabled: false,
    isRefreshing: false,
  },
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof ToolbarTopicsMetrics>;

const Template: ComponentStory<typeof ToolbarTopicsMetrics> = (args) => (
  <ToolbarTopicsMetrics {...args} />
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
