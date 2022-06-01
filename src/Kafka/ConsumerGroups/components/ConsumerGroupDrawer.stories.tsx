import type { ComponentStory, ComponentMeta } from "@storybook/react";
import type { Consumer } from "../types";
import { ConsumerGroupDrawer } from "./ConsumerGroupDrawer";

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
    memberId: "1234232",
  },
  {
    groupId: "3",
    topic: "test-topic",
    partition: 1,
    offset: 2,
    logEndOffset: 1,
    lag: 1,
  },
];

export default {
  component: ConsumerGroupDrawer,
  args: {
    isExpanded: true,
  },
} as ComponentMeta<typeof ConsumerGroupDrawer>;

const Template: ComponentStory<typeof ConsumerGroupDrawer> = (args) => (
  <ConsumerGroupDrawer {...args} />
);

export const ConsumerGroupDrawerDetails = Template.bind({});
ConsumerGroupDrawerDetails.args = {
  state: "CompletingRebalance",
  consumers: consumer,
  activeMembers: 1,
  partitionsWithLag: 2,
  groupId: "consumer-123",
};
