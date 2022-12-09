import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { KafkaTopic } from "./types";
import { KafkaTopics } from "./KafkaTopics";

const topics: KafkaTopic[] = [
  {
    topic_name: "foo",
    partitions: 1,
    retention_size: "-1",
    retention_time: "	86400000 ms",
  },
  {
    topic_name: "bar",
    partitions: 3,
    retention_size: "1099511600000 bytes",
    retention_time: "1500000",
  },
  {
    topic_name: "buzz",
    partitions: 2,
    retention_size: "80000 bytes",
    retention_time: "-1",
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
