import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Empty states/Metrics unavailable",
  component: EmptyStateMetricsUnavailable,
  args: {},
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof EmptyStateMetricsUnavailable>;

const Template: ComponentStory<typeof EmptyStateMetricsUnavailable> = (
  args
) => <EmptyStateMetricsUnavailable {...args} />;

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "Metrics unavailable";
