import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Empty states/No metrics data",
  component: EmptyStateNoMetricsData,
  args: {},
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof EmptyStateNoMetricsData>;

const Template: ComponentStory<typeof EmptyStateNoMetricsData> = (args) => (
  <EmptyStateNoMetricsData {...args} />
);

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "No metrics data";
