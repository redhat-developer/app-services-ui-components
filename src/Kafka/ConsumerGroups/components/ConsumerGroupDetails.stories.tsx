import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupDetails } from "./ConsumerGroupDetails";
import { Consumer } from "../types";

const consumer: Consumer[] = [
  {
    groupId: "1",
    topic: "test-topic",
    partition: 0,
    offset: 4,
    logEndOffset: 1,
    lag: 0,
    memberId: "123456789",
  },
  {
    groupId: "2",
    topic: "test-topic",
    partition: 1,
    offset: 3,
    logEndOffset: 1,
    lag: 0,
  },
];

const withoutConsumer: Consumer[] = [];

export default {
  component: ConsumerGroupDetails,
  args: {},
} as ComponentMeta<typeof ConsumerGroupDetails>;

const Template: ComponentStory<typeof ConsumerGroupDetails> = (args) => (
  <ConsumerGroupDetails {...args} />
);

export const ConsumerGroupWithNoActiveMembers = Template.bind({});
ConsumerGroupWithNoActiveMembers.args = {
  state: "CompletingRebalance",
  consumers: withoutConsumer,
  activeMembers: 1,
  partitionsWithLag: 2,
};

export const ConsumerGroupWithActiveMembers = Template.bind({});
ConsumerGroupWithActiveMembers.args = {
  state: "CompletingRebalance",
  consumers: consumer,
  activeMembers: 2,
  partitionsWithLag: 1,
};

export const ConsumerGroupDetailsAtTopicLevel = Template.bind({});
ConsumerGroupDetailsAtTopicLevel.args = {
  state: "Unknown",
  consumers: consumer,
  consumerGroupByTopic: true,
  activeMembers: 2,
  partitionsWithLag: 2,
};

export const ConsumerGroupDetailsAtKafkaLevel = Template.bind({});
ConsumerGroupDetailsAtKafkaLevel.args = {
  state: "Stable",
  consumers: consumer,
  activeMembers: 0,
  partitionsWithLag: 1,
};
