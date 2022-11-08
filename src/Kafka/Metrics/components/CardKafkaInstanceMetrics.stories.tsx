import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { makeMetrics } from "../makeMetrics";
import { DurationOptions } from "../types";
import { CardKafkaInstanceMetrics } from "./CardKafkaInstanceMetrics";

export default {
  component: CardKafkaInstanceMetrics,
  args: {
    usedDiskMetrics: {},
    connectionAttemptRateMetrics: {},
    clientConnectionsMetrics: {},
    bytesPerPartitions: {},
    duration: DurationOptions.Last12hours,
    metricsDataUnavailable: false,
    isInitialLoading: false,
    isLoading: false,
    isRefreshing: false,
    isJustCreated: false,
    diskSpaceLimit: 1000 * 1024 ** 3,
    connectionsLimit: 100,
    connectionRateLimit: 100,
    brokers: ["broker 1", "broker 2"],
    selectedBroker: "broker 1",
  },
} as ComponentMeta<typeof CardKafkaInstanceMetrics>;

const Template: ComponentStory<typeof CardKafkaInstanceMetrics> = (args) => (
  <CardKafkaInstanceMetrics {...args} />
);

export const InitialLoading = Template.bind({});
InitialLoading.args = {
  isInitialLoading: true,
};

export const LoadingData = Template.bind({});
LoadingData.args = {
  isLoading: true,
};

export const JustCreated = Template.bind({});
JustCreated.args = {
  isJustCreated: true,
};

export const SampleData = Template.bind({});
SampleData.args = {
  usedDiskMetrics: {
    total: makeMetrics(DurationOptions.Last12hours, 0, 999, 10 ** 9),
    "broker 1": makeMetrics(DurationOptions.Last12hours, 200, 999, 10 ** 9),
    "broker 2": makeMetrics(DurationOptions.Last12hours, 100, 999, 10 ** 9),
  },
  connectionAttemptRateMetrics: makeMetrics(
    DurationOptions.Last12hours,
    0,
    100,
    1
  ),
  clientConnectionsMetrics: makeMetrics(
    DurationOptions.Last12hours,
    50,
    250,
    1
  ),
};

export const OverLimits = Template.bind({});
OverLimits.args = {
  usedDiskMetrics: {
    total: makeMetrics(DurationOptions.Last12hours, 90, 1250, 10 ** 9),
    "broker 1": makeMetrics(DurationOptions.Last12hours, 200, 1400, 10 ** 9),
    "broker 2": makeMetrics(DurationOptions.Last12hours, 100, 3000, 10 ** 9),
  },
  connectionAttemptRateMetrics: makeMetrics(
    DurationOptions.Last12hours,
    20,
    120,
    1
  ),
  clientConnectionsMetrics: makeMetrics(
    DurationOptions.Last12hours,
    50,
    250,
    1
  ),
};
