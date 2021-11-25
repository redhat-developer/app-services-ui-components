import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import MetricsI18n from "../Metrics-i18n.json";
import { makeMetrics } from "../Metrics.stories";
import { DurationOptions } from "../types";

export default {
  title: "Metrics/Components/ChartLinearWithOptionalLimit",
  component: ChartLinearWithOptionalLimit,
  args: {
    duration: DurationOptions.Last12hours,
    chartName: "Sample name",
  },
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof ChartLinearWithOptionalLimit>;

const Template: ComponentStory<typeof ChartLinearWithOptionalLimit> = (
  args
) => <ChartLinearWithOptionalLimit {...args} />;

export const UnderLimits = Template.bind({});
UnderLimits.args = {
  metrics: makeMetrics(DurationOptions.Last12hours, 0, 999, 1),
  usageLimit: 1500,
};

export const OverLimits = Template.bind({});
OverLimits.args = {
  metrics: makeMetrics(DurationOptions.Last12hours, 1000, 2000, 1),
  usageLimit: 1500,
};

export const NoLimit = Template.bind({});
NoLimit.args = {
  metrics: makeMetrics(DurationOptions.Last12hours, 1000, 2000, 1),
};
