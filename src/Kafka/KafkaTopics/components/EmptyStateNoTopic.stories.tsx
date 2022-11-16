import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateNoTopic } from "./EmptyStateNoTopic";

export default {
  component: EmptyStateNoTopic,
  args: {},
} as ComponentMeta<typeof EmptyStateNoTopic>;

const Template: ComponentStory<typeof EmptyStateNoTopic> = (args) => (
  <EmptyStateNoTopic {...args} />
);

export const EmptyStateNoTopics = Template.bind({});
EmptyStateNoTopics.args = {};
