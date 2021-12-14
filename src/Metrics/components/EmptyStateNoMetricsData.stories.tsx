import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";

export default {
  title: "Empty States/Metrics/No metrics data",
  component: EmptyStateNoMetricsData,
  args: {},
} as ComponentMeta<typeof EmptyStateNoMetricsData>;

const Template: ComponentStory<typeof EmptyStateNoMetricsData> = (args) => (
  <EmptyStateNoMetricsData {...args} />
);

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "No metrics data";
