import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupTable } from "./ConsumerGroupTable";
import { ConsumerGroup } from "../types";

const ConsumerGroupTableValue: ConsumerGroup[] = [
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
  component: ConsumerGroupTable,
} as ComponentMeta<typeof ConsumerGroupTable>;

const Template: ComponentStory<typeof ConsumerGroupTable> = (args) => (
  <ConsumerGroupTable {...args} />
);

export const DefaultConsumerGroupTable = Template.bind({});
DefaultConsumerGroupTable.args = {
  consumerGroup: ConsumerGroupTableValue,
};
