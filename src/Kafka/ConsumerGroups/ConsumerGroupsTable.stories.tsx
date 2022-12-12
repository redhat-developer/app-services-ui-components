import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { ConsumerGroup } from "./types";
import { ConsumerGroupsTable } from "./ConsumerGroupsTable";

const consumers: ConsumerGroup[] = [
  {
    consumerGroupId: "consumer-123",
    activeMembers: 1,
    partitionsWithLag: 2,
    state: "CompletingRebalance",
  },
  {
    consumerGroupId: "consumer-233",
    activeMembers: 2,
    partitionsWithLag: 3,
    state: "Stable",
  },
];

export default {
  component: ConsumerGroupsTable,
  args: {
    consumers: consumers,
    consumerName: [],
  },
} as ComponentMeta<typeof ConsumerGroupsTable>;

const Template: ComponentStory<typeof ConsumerGroupsTable> = (args) => (
  <ConsumerGroupsTable {...args} />
);

export const DefaultConsumerGroupTable = Template.bind({});
DefaultConsumerGroupTable.args = {};

export const NoConsumers = Template.bind({});
NoConsumers.args = {
  consumers: [],
  consumerName: [],
};
