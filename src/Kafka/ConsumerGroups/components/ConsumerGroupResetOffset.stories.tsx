import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
  ConsumerGroupResetOffset,
  ConsumerRow,
} from "./ConsumerGroupResetOffset";

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
    topic: "test-topic",
    partition: 1,
    offset: 3,
    logEndOffset: 1,
    lag: 0,
    selected: true,
  },
];

export default {
  component: ConsumerGroupResetOffset,
  args: {
    groupId: "console",
    topics: ["test-topic", "test-value"],
    consumers: consumer,
    isDisconnected: true,
    customOffsetValue: "2",
  },
  argTypes: {
    isModalOpen: {
      control: {
        type: null,
      },
    },
  },
} as ComponentMeta<typeof ConsumerGroupResetOffset>;

const Template: ComponentStory<typeof ConsumerGroupResetOffset> = (args) => (
  <ConsumerGroupResetOffset {...args} />
);

export const ResetOffset = Template.bind({});

export const ResetOffsetErrorMessage = Template.bind({});
ResetOffsetErrorMessage.args = {
  isDisconnected: false,
};
