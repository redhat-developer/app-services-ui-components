import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { KafkaTopic } from "../types";
import { TopicsTable } from "./TopicsTable";

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
];

export default {
  component: TopicsTable,
  args: {
    getUrlFortopic: () => "",
    topics: topics,
    topicName: [],
  },
} as ComponentMeta<typeof TopicsTable>;

const Template: ComponentStory<typeof TopicsTable> = (args) => (
  <TopicsTable {...args} />
);

export const KafkaTopicsTable = Template.bind({});
KafkaTopicsTable.args = {};

export const NoTopics = Template.bind({});
NoTopics.args = {
  topics: [],
  topicName: ["boo", "foo"],
};
