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

export const ConsumerGroupTableAtDefault = Template.bind({});
ConsumerGroupTableAtDefault.args = {
  consumerGroup: ConsumerGroupTableValue,
};

export const ConsumerGroupTableAtKafkaLevel = Template.bind({});
ConsumerGroupTableAtKafkaLevel.args = {
  consumerGroup: ConsumerGroupTableValue,
};
ConsumerGroupTableAtKafkaLevel.parameters = {
  docs: {
    description: {
      story: `Kebab menu will be displayed at kafka level consumer group table `,
    },
  },
};

export const ConsumerGroupTableAtTopicLevel = Template.bind({});
ConsumerGroupTableAtTopicLevel.args = {
  consumerGroup: ConsumerGroupTableValue,
  consumerGroupByTopic: true,
};
ConsumerGroupTableAtTopicLevel.parameters = {
  docs: {
    description: {
      story: `Kebab menu will not be displayed at topic level consumer group table `,
    },
  },
};
