import { ComponentStory, ComponentMeta } from "@storybook/react";
import sub from "date-fns/sub";
import React from "react";
import Prando from "prando";
import { Metrics } from "./Metrics";
import MetricsI18n from "./Metrics-i18n.json";
import { DurationOptions, TimeSeriesMetrics } from "./types";
import { timeIntervalsMapping } from "./consts";

export default {
  title: "Metrics/Metrics",
  component: Metrics,
  args: {},
  parameters: {
    i18n: MetricsI18n,
    xstate: true,
    // this option is passed to the devTools instance to use a different inspector
    inspectUrl: "https://stately.ai/viz?inspect",
  },
  excludeStories: /makeMetrics/,
} as ComponentMeta<typeof Metrics>;

const Template: ComponentStory<typeof Metrics> = (args) => (
  <Metrics {...args} />
);

export const ApiError = Template.bind({});
ApiError.args = {
  getDiskSpaceMetrics: () => Promise.reject(),
  getTopicsMetrics: () => Promise.reject(),
};
ApiError.storyName = "Api error";

export const JustCreated = Template.bind({});
JustCreated.args = {
  getDiskSpaceMetrics: () =>
    Promise.resolve({
      usedDiskSpaceMetrics: {},
      clientConnectionsMetrics: {},
      connectionAttemptRateMetrics: {},
    }),
  getTopicsMetrics: () =>
    Promise.resolve({
      kafkaTopics: [],
      metricsTopics: [],
      bytesIncoming: {},
      bytesOutgoing: {},
      incomingMessageRate: {},
      bytesPerPartition: {},
    }),
};
JustCreated.storyName = "Kafka just created";

export const NoTopics = Template.bind({});
NoTopics.args = {
  getDiskSpaceMetrics: ({ duration }) =>
    Promise.resolve({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: () =>
    Promise.resolve({
      kafkaTopics: [],
      metricsTopics: [],
      bytesIncoming: {},
      bytesOutgoing: {},
      incomingMessageRate: {},
      bytesPerPartition: {},
    }),
};
NoTopics.storyName = "Kafka exists but no topics created";

export const TopicsJustCreated = Template.bind({});
TopicsJustCreated.args = {
  getDiskSpaceMetrics: ({ duration }) =>
    Promise.resolve({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: () =>
    Promise.resolve({
      kafkaTopics: ["lorem"],
      metricsTopics: [],
      bytesIncoming: {},
      bytesOutgoing: {},
      incomingMessageRate: {},
      bytesPerPartition: {},
    }),
};
TopicsJustCreated.storyName = "Topics just created (no metrics)";

export const TopicsRecentlyCreated = Template.bind({});
TopicsRecentlyCreated.args = {
  getDiskSpaceMetrics: ({ duration }) =>
    Promise.resolve({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: ({ duration }) =>
    Promise.resolve({
      kafkaTopics: ["lorem"],
      metricsTopics: ["lorem"],
      bytesIncoming: makeMetrics(duration, 0, 2, 10 ** 7, 3),
      bytesOutgoing: makeMetrics(duration, 2, 10, 10 ** 7, 3),
      incomingMessageRate: makeMetrics(duration, 2, 10, 10, 3),
      bytesPerPartition: {
        "lorem partition 1": makeMetrics(duration, 0, 2, 10 ** 7, 3),
        "lorem partition 2": makeMetrics(duration, 0, 4, 10 ** 7, 3),
        "lorem partition 3": makeMetrics(duration, 0, 6, 10 ** 7, 3),
      },
    }),
};
TopicsRecentlyCreated.storyName = "Topics recently created (partial metrics)";

export const Story4 = Template.bind({});
Story4.args = {
  getDiskSpaceMetrics: ({ duration }) =>
    Promise.resolve({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: ({ duration }) =>
    Promise.resolve({
      kafkaTopics: ["lorem"],
      metricsTopics: ["lorem"],
      bytesIncoming: makeMetrics(duration, 0, 2, 10 ** 7),
      bytesOutgoing: makeMetrics(duration, 2, 10, 10 ** 7),
      incomingMessageRate: makeMetrics(duration, 2, 10, 10),
      bytesPerPartition: {
        "lorem partition 1": makeMetrics(duration, 0, 2, 10 ** 7),
        "lorem partition 2": makeMetrics(duration, 0, 4, 10 ** 7),
        "lorem partition 3": makeMetrics(duration, 0, 6, 10 ** 7),
      },
    }),
};
Story4.storyName = "Kafka and topics exist and are in use";

export const Story5 = Template.bind({});
Story5.args = {
  getDiskSpaceMetrics: ({ duration }) =>
    Promise.resolve({
      usedDiskSpaceMetrics: makeMetrics(duration, 900, 1100, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: ({ duration }) =>
    Promise.resolve({
      kafkaTopics: ["lorem"],
      metricsTopics: ["lorem"],
      bytesIncoming: makeMetrics(duration, 1, 4, 10 ** 7),
      bytesOutgoing: makeMetrics(duration, 3, 8, 10 ** 7),
      incomingMessageRate: makeMetrics(duration, 3, 8, 10),
      bytesPerPartition: {
        "lorem partition 1": makeMetrics(duration, 0, 2, 10 ** 7),
        "lorem partition 2": makeMetrics(duration, 0, 4, 10 ** 7),
        "lorem partition 3": makeMetrics(duration, 0, 6, 10 ** 7),
      },
    }),
};
Story5.storyName = "Limits have been reached ";

const now = new Date(2012, 1, 29, 11, 45, 5, 123);
export function makeMetrics(
  duration: DurationOptions,
  min: number,
  max: number,
  exp: number,
  offset = 0
): TimeSeriesMetrics {
  const rng = new Prando(duration + min + max); // make the number deterministing to make visual regression testing on Chromatic work
  const ticks = timeIntervalsMapping[duration].ticks;
  const entries = new Array(ticks - offset).fill(now).map((d, index) => [
    sub(new Date(d), {
      seconds: timeIntervalsMapping[duration].interval * (index + offset),
    }).getTime(),
    rng.nextInt(min * exp, max * exp),
  ]);
  const metrics = Object.fromEntries(entries);
  return metrics;
}
