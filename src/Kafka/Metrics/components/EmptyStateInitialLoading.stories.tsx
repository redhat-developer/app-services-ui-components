import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { EmptyStateInitialLoading } from "./EmptyStateInitialLoading";

export default {
  component: EmptyStateInitialLoading,
} as ComponentMeta<typeof EmptyStateInitialLoading>;

const Template: ComponentStory<typeof EmptyStateInitialLoading> = () => (
  <EmptyStateInitialLoading />
);

export const Story = Template.bind({});
Story.storyName = "Initial loading screen";
