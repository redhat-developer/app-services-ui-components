import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateInitialLoading } from "./EmptyStateInitialLoading";

export default {
  title: "Empty States/Metrics/Initial loading screen",
  component: EmptyStateInitialLoading,
} as ComponentMeta<typeof EmptyStateInitialLoading>;

const Template: ComponentStory<typeof EmptyStateInitialLoading> = () => (
  <EmptyStateInitialLoading />
);

export const Story = Template.bind({});
Story.storyName = "Initial loading screen";
