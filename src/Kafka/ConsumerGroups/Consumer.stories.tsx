import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { fakeApi } from "../../shared/storiesHelpers";
import { Consumers } from "./Consumer";
import type { Consumer, ConsumerGroup } from "./types";

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
    state: "Empty",
  },
];

const consumer: Consumer[] = [
  {
    groupId: "test-topic",
    topic: "topic-1",
    partition: 1,
    offset: 2,
    logEndOffset: 2,
    lag: 1,
    memberId: "2",
  },
  {
    groupId: "test-topic",
    topic: "topic-2",
    partition: 2,
    offset: 3,
    logEndOffset: 4,
    lag: 2,
    memberId: "1",
  },
];

export default {
  component: Consumers,
  args: {
    getConsumer: sampleData,
    itemCount: 500,
    page: 2,
    perPage: 20,
    consumers: consumer,
  },
} as unknown as ComponentMeta<typeof Consumers>;

const Template: ComponentStory<typeof Consumers> = (args) => (
  <Consumers {...args} />
);

export const Default = Template.bind({});

export const InitialLoading = Template.bind({});
InitialLoading.args = {
  getConsumer: () => new Promise(() => false),
};

export const EmptyState = Template.bind({});
EmptyState.args = {
  getConsumer: () =>
    fakeApi<{ consumers: ConsumerGroup[] }>({
      consumers: [],
    }),
};

// export const InitialLoading = Template.bind({});
// InitialLoading.args = {
//   getConsumer: () => new Promise(() => false),
// };

// export const NoData = Template.bind({});
// NoData.args = {
//   getConsumer: () =>  fakeApi<{ consumer: ConsumerGroup[] }>(
//     { consumer: [] }, 500
//   )
// };

// export const EmptyState = Template.bind({});
// EmptyState.args = {
//   emptyState: true

// }

function sampleData() {
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
      state: "Empty",
    },
  ];

  return fakeApi<{ consumers: ConsumerGroup[] }>({
    consumers: consumers,
  });
}
