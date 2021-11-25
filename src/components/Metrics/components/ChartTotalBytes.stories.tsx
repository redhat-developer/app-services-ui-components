import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChartTotalBytes } from "./ChartTotalBytes";
import MetricsI18n from "../Metrics-i18n.json";
import { DurationOptions } from "../types";
import { makeMetrics } from "../Metrics.stories";

export default {
  title: "Metrics/Components/ChartTotalBytes",
  component: ChartTotalBytes,
  args: {
    incomingTopicsData: makeMetrics(DurationOptions.Last12hours, 1, 4, 10 ** 7),
    outgoingTopicsData: makeMetrics(DurationOptions.Last12hours, 1, 4, 10 ** 7),
    duration: DurationOptions.Last12hours,
  },
  parameters: {
    i18n: MetricsI18n,
  },
  argTypes: {
    duration: {
      type: null,
    },
  },
} as ComponentMeta<typeof ChartTotalBytes>;

const Template: ComponentStory<typeof ChartTotalBytes> = (args) => (
  <ChartTotalBytes {...args} />
);

export const Story = Template.bind({});
Story.args = {};
