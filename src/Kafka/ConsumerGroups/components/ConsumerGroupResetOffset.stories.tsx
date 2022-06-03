import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupResetOffset } from "./ConsumerGroupResetOffset";
import type { ConsumerRow } from "./ConsumerGroupResetOffset";

const consumer: ConsumerRow[] = [
  {
    groupId: "1",
    topic: "test-topic",
    partition: 0,
    offset: 4,
    logEndOffset: 1,
    lag: 0,
    memberId: "123456789",
    selected: true,
  },
  {
    groupId: "2",
    topic: "test",
    partition: 1,
    offset: 3,
    logEndOffset: 1,
    lag: 0,
    selected: false,
  },
];

const getTopics = () => {
  const topics = consumer.map((consumer) => consumer.topic);

  const distinctTopics = [...new Set(topics)];
  return distinctTopics;
};

export default {
  component: ConsumerGroupResetOffset,
  args: {
    isDisconnected: true,
    groupId: "console",
    topics: getTopics(),
    consumers: consumer,
  },
} as ComponentMeta<typeof ConsumerGroupResetOffset>;

const Template: ComponentStory<typeof ConsumerGroupResetOffset> = (args) => (
  <ConsumerGroupResetOffset {...args} />
);

export const ResetOffsetWhenTopicisNotSelected = Template.bind({});
ResetOffsetWhenTopicisNotSelected.args = {
  isModalOpen: true,
};

export const ResetOffsetWhenTopicIsSelected = Template.bind({});
ResetOffsetWhenTopicIsSelected.args = {
  isModalOpen: true,
  selectedTopic: "test-topic",
  selectedOffset: "latest",
};

export const ResetOffsetWhenOffsetIsAbsolute = Template.bind({});
ResetOffsetWhenOffsetIsAbsolute.args = {
  isModalOpen: true,
  selectedTopic: "test-topic",
  selectedOffset: "absolute",
  customOffsetValue: "2",
};

export const ResetOffsetWhenAllFieldsSelected = Template.bind({});
ResetOffsetWhenAllFieldsSelected.args = {
  isModalOpen: true,
  selectedTopic: "test-topic",
  selectedOffset: "absolute",
  customOffsetValue: "2",
  confirmCheckboxChecked: true,
};

export const ResetOffsetErrorMessage = Template.bind({});
ResetOffsetErrorMessage.args = {
  isDisconnected: false,
  isModalOpen: true,
};
