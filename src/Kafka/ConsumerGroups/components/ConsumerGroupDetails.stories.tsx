import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupDetails } from "./ConsumerGroupDetails";
import { Consumer, ConsumerGroupStateEnum } from "../types";

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
  state: ConsumerGroupStateEnum.Stable,
  consumers: withoutConsumer,
};

export const ConsumerGroupWithActiveMembers = Template.bind({});
ConsumerGroupWithActiveMembers.args = {
  state: ConsumerGroupStateEnum.Stable,
  consumers: consumer,
};

export const ConsumerGroupDetailsAtTopicLevel = Template.bind({});
ConsumerGroupDetailsAtTopicLevel.args = {
  state: ConsumerGroupStateEnum.Stable,
  consumers: consumer,
  consumerGroupByTopic: true,
};

export const ConsumerGroupDetailsAtKafkaLevel = Template.bind({});
ConsumerGroupDetailsAtKafkaLevel.args = {
  state: ConsumerGroupStateEnum.Stable,
  consumers: consumer,
};
