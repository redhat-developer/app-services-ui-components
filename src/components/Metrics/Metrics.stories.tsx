import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Metrics } from "./Metrics";
import MetricsI18n from "./Metrics-i18n.json";

export default {
  title: "Metrics/Metrics",
  component: Metrics,
  args: {
    getDiskSpaceMetrics: () =>
      Promise.resolve({
        metrics: {},
      }),
    getTopicsMetrics: () =>
      Promise.resolve({
        kafkaTopics: [],
        metricsTopics: [],
        bytesIncoming: {},
        bytesOutgoing: {},
        bytesPerPartition: {},
      }),
  },
  parameters: {
    i18n: MetricsI18n,
    xstate: true,
    // this option is passed to the devTools instance to use a different inspector
    inspectUrl: "https://stately.ai/viz?inspect",
  },
} as ComponentMeta<typeof Metrics>;

const Template: ComponentStory<typeof Metrics> = (args) => (
  <Metrics {...args} />
);

export const ApiError = Template.bind({});
ApiError.args = {};
ApiError.storyName = "Kafka just created";

export const ApiEmpty = Template.bind({});
ApiEmpty.args = {};
ApiEmpty.storyName = "Kafka exists but no topics created";

export const TopicsJustCreated = Template.bind({});
TopicsJustCreated.args = {};
TopicsJustCreated.storyName = "Topics just created";

export const Story4 = Template.bind({});
Story4.args = {};
Story4.storyName = "Kafka and topics exist and are in use";

export const Story5 = Template.bind({});
Story5.args = {};
Story5.storyName = "Limits have been reached ";
