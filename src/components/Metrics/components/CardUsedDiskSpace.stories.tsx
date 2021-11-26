import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CardUsedDiskSpace } from "./CardUsedDiskSpace";
import MetricsI18n from "../Metrics-i18n.json";
import { DurationOptions } from "../types";
import { makeMetrics } from "../Metrics.stories";

export default {
  title: "Metrics/Components/CardUsedDiskSpace",
  component: CardUsedDiskSpace,
  args: {
    usedDiskMetrics: {},
    clientConnectionsMetrics: {},
    connectionAttemptRateMetrics: {},
    duration: DurationOptions.Last12hours,
    metricsDataUnavailable: false,
    isLoading: false,
    isRefreshing: false,
  },
  parameters: {
    i18n: MetricsI18n,
  },
  argTypes: {
    duration: {
      type: null,
    },
  },
} as ComponentMeta<typeof CardUsedDiskSpace>;

const Template: ComponentStory<typeof CardUsedDiskSpace> = (args) => (
  <CardUsedDiskSpace {...args} />
);

export const InitialLoading = Template.bind({});
InitialLoading.args = {
  isLoading: true,
};

export const NoMetrics = Template.bind({});
NoMetrics.args = {
  metricsDataUnavailable: true,
};

export const SampleData = Template.bind({});
SampleData.args = {
  usedDiskMetrics: makeMetrics(
    DurationOptions.Last12hours,
    0,
    999 * 10 ** 9,
    1
  ),
  clientConnectionsMetrics: makeMetrics(
    DurationOptions.Last12hours,
    0,
    100,
    1
  ),
  connectionAttemptRateMetrics: makeMetrics(
    DurationOptions.Last12hours,
    0,
    100,
    1
  ),
};

export const OverLimits = Template.bind({});
OverLimits.args = {
  usedDiskMetrics: makeMetrics(DurationOptions.Last12hours, 90, 1250, 10 ** 9),
  clientConnectionsMetrics: makeMetrics(
    DurationOptions.Last12hours,
    20,
    120,
    1
  ),
  connectionAttemptRateMetrics: makeMetrics(
    DurationOptions.Last12hours,
    20,
    120,
    1
  ),
};
