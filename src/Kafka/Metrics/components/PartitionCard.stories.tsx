import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PartitionCard } from "./PartitionCard";

export default {
  component: PartitionCard,
  args: {
    metric: 100,
    isLoading: false,
  },
} as ComponentMeta<typeof PartitionCard>;

const Template: ComponentStory<typeof PartitionCard> = (args) => (
  <PartitionCard {...args} />
);

export const TopicPartitionCard = Template.bind({});
TopicPartitionCard.args = {};

export const TopicPartitionsLimitReached = Template.bind({});
TopicPartitionsLimitReached.args = {
  metric: 1000,
};

export const TopicPartitionsLimitApproaching = Template.bind({});
TopicPartitionsLimitApproaching.args = {
  metric: 960,
};
