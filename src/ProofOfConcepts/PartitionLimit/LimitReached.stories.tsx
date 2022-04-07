import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TopicPartitionsLimitReached } from "./LimitReached";

export default {
  component: TopicPartitionsLimitReached,
  args: {},
  parameters: {},
} as ComponentMeta<typeof TopicPartitionsLimitReached>;

const Template: ComponentStory<typeof TopicPartitionsLimitReached> = (
  args,
  { parameters }
) => <TopicPartitionsLimitReached {...args} />;

export const LimitReached = Template.bind({});
