import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { CardTopicsMetrics } from "./CardTopicsMetrics";
import { makeMetrics } from "../makeMetrics";
import { DurationOptions } from "../types";

export default {
  title: "Components/Metrics/CardTopicsMetrics",
  component: CardTopicsMetrics,
  args: {
    topics: [],
    incomingTopicsData: {},
    outgoingTopicsData: {},
    partitions: {},
    incomingMessageRate: {},
    duration: DurationOptions.Last12hours,
    backendUnavailable: false,
    isJustCreated: false,
    isInitialLoading: false,
    isLoading: false,
    isRefreshing: false,
    selectedTopic: undefined,
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
  isInitialLoading: true,
};

export const NoBackend = Template.bind({});
NoBackend.args = {
  backendUnavailable: true,
};

export const JustCreated = Template.bind({});
JustCreated.args = {
  isJustCreated: true,
};

export const NoTopics = Template.bind({});
NoTopics.args = {};

export const NoMetricsWithTopics = Template.bind({});
NoMetricsWithTopics.args = {
  topics: ["lorem"],
};

export const LoadingMetricsForSelectedTopic = Template.bind({});
LoadingMetricsForSelectedTopic.args = {
  topics: ["lorem", "dolor"],
  selectedTopic: "dolor",
  isLoading: true,
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

const sampleIncomingMessageRate = makeMetrics(
  DurationOptions.Last12hours,
  50,
  250,
  1
);

export const SampleData = Template.bind({});
SampleData.args = {
  topics: ["lorem", "dolor", "ipsum"],
  incomingTopicsData: sampleIncomingData,
  outgoingTopicsData: sampleOutgoingData,
  incomingMessageRate: sampleIncomingMessageRate,
};

export const LoadingSelectedTopic = Template.bind({});
LoadingSelectedTopic.args = {
  topics: ["lorem", "dolor", "ipsum"],
  selectedTopic: "dolor",
  isLoading: true,
};

export const SampleDataWithSelectedTopic = Template.bind({});
SampleDataWithSelectedTopic.args = {
  topics: ["lorem", "dolor", "ipsum"],
  selectedTopic: "lorem",
  incomingTopicsData: sampleIncomingData,
  outgoingTopicsData: sampleOutgoingData,
  incomingMessageRate: sampleIncomingMessageRate,
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
