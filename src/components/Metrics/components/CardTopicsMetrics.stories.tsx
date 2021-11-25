import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CardTopicsMetrics } from "./CardTopicsMetrics";
import MetricsI18n from "../Metrics-i18n.json";
import { makeMetrics } from "../Metrics.stories";
import { DurationOptions } from "../types";

export default {
  title: "Metrics/Components/CardTopicsMetrics",
  component: CardTopicsMetrics,
  args: {
    topics: [],
    incomingTopicsData: {},
    outgoingTopicsData: {},
    partitions: {},
    duration: 15,
    backendUnavailable: false,
    metricsDataUnavailable: false,
    isLoading: false,
    isRefreshing: false,
    selectedTopic: undefined,
  },
  parameters: {
    i18n: MetricsI18n,
  },
  argTypes: {
    duration: {
      type: null,
    },
  },
} as ComponentMeta<typeof CardTopicsMetrics>;

const Template: ComponentStory<typeof CardTopicsMetrics> = (args) => (
  <CardTopicsMetrics {...args} />
);

export const InitialLoading = Template.bind({});
InitialLoading.args = {
  isLoading: true,
};

export const NoBackend = Template.bind({});
NoBackend.args = {
  backendUnavailable: true,
};

export const NoBackendWithTopics = Template.bind({});
NoBackendWithTopics.args = {
  topics: ["lorem"],
  backendUnavailable: true,
};

export const NoTopics = Template.bind({});
NoTopics.args = {};

export const NoMetricsWithTopics = Template.bind({});
NoMetricsWithTopics.args = {
  topics: ["lorem"],
  metricsDataUnavailable: true,
};

const sampleIncomingData = makeMetrics(
  DurationOptions.Last12hours,
  0,
  999 * 10 ** 7,
  1
);
const sampleOutgoingData = makeMetrics(
  DurationOptions.Last12hours,
  0,
  999 * 10 ** 8,
  1
);

export const SampleData = Template.bind({});
SampleData.args = {
  topics: ["lorem", "dolor", "ipsum"],
  incomingTopicsData: sampleIncomingData,
  outgoingTopicsData: sampleOutgoingData,
};

export const LoadingSelectedTopic = Template.bind({});
LoadingSelectedTopic.args = {
  topics: ["lorem", "dolor", "ipsum"],
  selectedTopic: "lorem",
  isLoading: true,
};

export const SampleDataWithSelectedTopic = Template.bind({});
SampleDataWithSelectedTopic.args = {
  topics: ["lorem", "dolor", "ipsum"],
  selectedTopic: "lorem",
  incomingTopicsData: sampleIncomingData,
  outgoingTopicsData: sampleOutgoingData,
  partitions: {
    "dolor partition 1": makeMetrics(
      DurationOptions.Last12hours,
      0,
      999 * 10 ** 4,
      1
    ),
    "dolor partition 2": makeMetrics(
      DurationOptions.Last12hours,
      0,
      999 * 10 ** 5,
      1
    ),
    "dolor partition 3": makeMetrics(
      DurationOptions.Last12hours,
      0,
      999 * 10 ** 6,
      1
    ),
  },
};
