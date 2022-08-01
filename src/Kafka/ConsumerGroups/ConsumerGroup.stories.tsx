import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroups } from "./ConsumerGroups";
import type { ConsumerGroup } from "./types";

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
  component: ConsumerGroups,
  args: {
    consumerGroup: ConsumerGroupTableValue,
    itemCount: 500,
    page: 2,
    perPage: 20,
  },
} as ComponentMeta<typeof ConsumerGroups>;

const Template: ComponentStory<typeof ConsumerGroups> = (args) => (
  <ConsumerGroups {...args} />
);

export const Default = Template.bind({});

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
export const EmptyState = Template.bind({});
EmptyState.args = {
  emptyState: true,
};
