import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { KafkaTopic } from "./types";
import { KafkaTopics } from "./KafkaTopics";

const topics: KafkaTopic[] = [
  {
    name: "foo",
    partitions: 1,
    "retention.bytes": "-1",
    "retention.ms": "	86400000 ms",
  },
  {
    name: "bar",
    partitions: 3,
    "retention.bytes": "1099511600000 bytes",
    "retention.ms": "1500000",
  },
  {
    name: "buzz",
    partitions: 2,
    "retention.bytes": "80000 bytes",
    "retention.ms": "-1",
  },
];

export default {
  component: KafkaTopics,
  args: {
    getUrlFortopic: () => "",
    topics: topics,
    topicName: [],
  },
} as ComponentMeta<typeof KafkaTopics>;

const Template: ComponentStory<typeof KafkaTopics> = (args) => (
  <KafkaTopics {...args} />
);

export const KafkaTopicsTable = Template.bind({});
KafkaTopicsTable.args = {};

export const NoTopics = Template.bind({});
NoTopics.args = {
  topics: [],
  topicName: ["boo", "foo"],
};

export const FirstLoadShowsSpinner = Template.bind({});
FirstLoadShowsSpinner.args = {
  topics: null,
};

export const kafkaTopicsTableLoadingSpinner = Template.bind({});
kafkaTopicsTableLoadingSpinner.args = {
  topics: undefined,
};
