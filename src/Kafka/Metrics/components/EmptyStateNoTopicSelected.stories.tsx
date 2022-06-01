import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { EmptyStateNoTopicSelected } from "./EmptyStateNoTopicSelected";

export default {
  component: EmptyStateNoTopicSelected,
} as ComponentMeta<typeof EmptyStateNoTopicSelected>;

const Template: ComponentStory<typeof EmptyStateNoTopicSelected> = () => (
  <EmptyStateNoTopicSelected />
);

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "No topic selected";
