import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import { makeMetrics } from "../makeMetrics";
import { DurationOptions } from "../types";

export default {
  component: ChartLinearWithOptionalLimit,
  args: {
    metrics: {},
    duration: DurationOptions.Last12hours,
    chartName: "Sample name",
    isLoading: false,
    emptyState: <div>this is the empty state</div>,
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
  argTypes: {
    duration: {
      type: null,
    },
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

export const PartialData = Template.bind({});
PartialData.args = {
  metrics: makeMetrics(DurationOptions.Last12hours, 0, 999, 1, 3),
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

export const CustomLabels = Template.bind({});
CustomLabels.args = {
  metrics: makeMetrics(DurationOptions.Last12hours, 1000, 2000, 1),
  xLabel: "Custom X label",
  yLabel: "Custom Y label",
};

export const NoData = Template.bind({});
NoData.args = {
  metrics: {},
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
