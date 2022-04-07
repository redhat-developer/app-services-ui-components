import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TopicPartitionsApproachingLimit } from "./ApproachingLimit";

export default {
  component: TopicPartitionsApproachingLimit,
  args: {},
  parameters: {},
} as ComponentMeta<typeof TopicPartitionsApproachingLimit>;

const Template: ComponentStory<typeof TopicPartitionsApproachingLimit> = (
  args,
  { parameters }
) => <TopicPartitionsApproachingLimit {...args} />;

export const ApproachingLimit = Template.bind({});
