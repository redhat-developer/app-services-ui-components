import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { within, fireEvent, findByTestId } from "@storybook/testing-library";
import { expect } from "@storybook/jest";
import { Metrics } from "./Metrics";
import MetricsI18n from "./Metrics-i18n.json";
import { makeMetrics } from "./makeMetrics";
import { DurationOptions } from ".";

export default {
  title: "Metrics/Metrics",
  component: Metrics,
  args: {},
  parameters: {
    i18n: MetricsI18n,
    xstate: true,
    // this option is passed to the devTools instance to use a different inspector
    inspectUrl: "https://stately.ai/viz?inspect",

    chromatic: { delay: 600 },
  },
  excludeStories: /makeMetrics/,
} as ComponentMeta<typeof Metrics>;

const Template: ComponentStory<typeof Metrics> = (args) => (
  <Metrics {...args} />
);

export const AllApiError = Template.bind({});
AllApiError.args = {
  getKafkaInstanceMetrics: () => Promise.reject(),
  getTopicsMetrics: () => Promise.reject(),
};
AllApiError.parameters = {
  chromatic: { delay: 3500 },
};

export const KafkaInstanceApiError = Template.bind({});
KafkaInstanceApiError.args = {
  getKafkaInstanceMetrics: () => Promise.reject(),
  getTopicsMetrics: () =>
    fakeApi({
      kafkaTopics: [],
      metricsTopics: [],
      bytesIncoming: {},
      bytesOutgoing: {},
      incomingMessageRate: {},
      bytesPerPartition: {},
    }),
};
KafkaInstanceApiError.parameters = {
  chromatic: { delay: 3500 },
};

export const TopicsApiError = Template.bind({});
TopicsApiError.args = {
  getKafkaInstanceMetrics: () =>
    fakeApi({
      usedDiskSpaceMetrics: {},
      clientConnectionsMetrics: {},
      connectionAttemptRateMetrics: {},
    }),
  getTopicsMetrics: () => Promise.reject(),
};
TopicsApiError.parameters = {
  chromatic: { delay: 3500 },
};

export const JustCreated = Template.bind({});
JustCreated.args = {
  getKafkaInstanceMetrics: () =>
    fakeApi({
      usedDiskSpaceMetrics: {},
      clientConnectionsMetrics: {},
      connectionAttemptRateMetrics: {},
    }),
  getTopicsMetrics: () =>
    fakeApi({
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
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: () =>
    fakeApi({
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
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: () =>
    fakeApi({
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
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: ({ duration }) =>
    fakeApi({
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
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
    }),
  getTopicsMetrics: ({ duration }) =>
    fakeApi({
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
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 900, 1100, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 60, 170, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 4, 130, 1),
    }),
  getTopicsMetrics: ({ duration }) =>
    fakeApi({
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

export const Story6 = Template.bind({});
Story6.args = {
  getKafkaInstanceMetrics: ({ duration }) =>
    // simulate no data past the 12h mark
    duration > DurationOptions.Last12hours
      ? fakeApi({
          usedDiskSpaceMetrics: {},
          clientConnectionsMetrics: {},
          connectionAttemptRateMetrics: {},
        })
      : fakeApi({
          usedDiskSpaceMetrics: makeMetrics(duration, 900, 1100, 10 ** 9),
          clientConnectionsMetrics: makeMetrics(duration, 60, 170, 1),
          connectionAttemptRateMetrics: makeMetrics(duration, 4, 130, 1),
        }),
  getTopicsMetrics: ({ duration }) =>
    fakeApi({
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
Story6.storyName = "Can interact with the Kafka instance controls";
Story6.play = async ({ canvasElement }) => {
  const card = within(
    await findByTestId(canvasElement, "metrics-kafka-instance")
  );
  const setDuration = async (duration: string) => {
    const timeSelector = await card.findByLabelText(
      "Filter Kafka instance metrics by time range"
    );
    await fireEvent.click(timeSelector);
    await fireEvent.click(await card.findByText(duration));
  };

  const expectTextCount = async (label: string, count = 3) => {
    const timeAxisValues = await card.findAllByText(label);
    expect(timeAxisValues).toHaveLength(count);
  };

  // default is last 1 hour
  await expectTextCount("09:55");

  // select last 5 minutes
  await setDuration("Last 5 minutes");
  await expectTextCount("10:41");

  // select last 24 hours
  await setDuration("Last 24 hours");
  await expectTextCount("No metrics data");

  // select last 12 hours
  await setDuration("Last 12 hours");
  await expectTextCount("00:45");
};

export const Story7 = Template.bind({});
Story7.args = {
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 900, 1100, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 60, 170, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 4, 130, 1),
    }),
  getTopicsMetrics: ({ duration, selectedTopic }) =>
    // simulate no data past the 12h mark
    duration > DurationOptions.Last12hours
      ? fakeApi({
          kafkaTopics: ["lorem", "dolor", "ipsum"],
          metricsTopics: [],
          bytesIncoming: {},
          bytesOutgoing: {},
          incomingMessageRate: {},
          bytesPerPartition: {},
        })
      : fakeApi({
          kafkaTopics: ["lorem", "dolor", "ipsum"],
          metricsTopics: ["lorem", "dolor", "ipsum", "sit"],
          bytesIncoming: makeMetrics(duration, 1, 4, 10 ** 7),
          bytesOutgoing: makeMetrics(duration, 3, 8, 10 ** 7),
          incomingMessageRate: makeMetrics(duration, 3, 8, 10),
          bytesPerPartition: {
            [`${selectedTopic} partition 1`]: makeMetrics(
              duration,
              0,
              2,
              10 ** 7
            ),
            [`${selectedTopic} partition 2`]: makeMetrics(
              duration,
              0,
              4,
              10 ** 7
            ),
            [`${selectedTopic} partition 3`]: makeMetrics(
              duration,
              0,
              6,
              10 ** 7
            ),
          },
        }),
};
Story7.storyName = "Can interact with the Topic metrics controls";
Story7.play = async ({ canvasElement }) => {
  const card = within(await findByTestId(canvasElement, "metrics-topics"));

  const setTopic = async (topic: string) => {
    const topicSelector = await card.findByLabelText(
      "Filter topic metrics by topic name"
    );
    await fireEvent.click(topicSelector);
    await fireEvent.click(topicSelector);
    await fireEvent.click(topicSelector);
    await fireEvent.click(await card.findByText(topic));
  };

  const setDuration = async (duration: string) => {
    const timeSelector = await card.findByLabelText(
      "Filter topic metrics by time range"
    );
    await fireEvent.click(timeSelector);
    await fireEvent.click(await card.findByText(duration));
  };

  const expectTextCount = async (label: string, count = 2) => {
    const timeAxisValues = await card.findAllByText(label, { exact: false });
    expect(timeAxisValues).toHaveLength(count);
  };

  await expectTextCount("Filter by Topic", 1);

  // default is last 1 hour
  await expectTextCount("09:55");

  // select last 5 minutes
  await setDuration("Last 5 minutes");
  await expectTextCount("10:41");

  // select last 24 hours
  await setDuration("Last 24 hours");
  await expectTextCount("No topic data");

  // select last 12 hours
  await setDuration("Last 12 hours");
  await expectTextCount("00:45");

  // select topic
  await setTopic("dolor");
  await expectTextCount("dolor partition", 3);
};

function fakeApi(response: unknown, waitLengthMs = 500): Promise<unknown> {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => resolve(response), waitLengthMs);
    return () => clearTimeout(timeout);
  });
}
