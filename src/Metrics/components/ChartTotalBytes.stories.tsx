import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChartTotalBytes } from "./ChartTotalBytes";
import MetricsI18n from "../Metrics-i18n.json";
import { DurationOptions } from "../types";
import { makeMetrics } from "../makeMetrics";

export default {
  title: "Components/Metrics/ChartTotalBytes",
  component: ChartTotalBytes,
  args: {
    incomingTopicsData: makeMetrics(DurationOptions.Last12hours, 1, 4, 10 ** 7),
    outgoingTopicsData: makeMetrics(DurationOptions.Last12hours, 4, 8, 10 ** 7),
    duration: DurationOptions.Last12hours,
    isLoading: false,
    emptyState: <div>this is the empty state</div>,
  },
  parameters: {
    i18n: MetricsI18n,
    backgrounds: {
      default: "Background color 100",
    },
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

export const SampleData = Template.bind({});
SampleData.args = {};

export const NoData = Template.bind({});
NoData.args = {
  incomingTopicsData: {},
  outgoingTopicsData: {},
};

export const NoIncomingData = Template.bind({});
NoIncomingData.args = {
  incomingTopicsData: {},
};

export const NoOutgoingData = Template.bind({});
NoOutgoingData.args = {
  outgoingTopicsData: {},
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
