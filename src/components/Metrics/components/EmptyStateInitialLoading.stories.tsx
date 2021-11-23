import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateInitialLoading } from "./EmptyStateInitialLoading";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Empty states/Initial loading screen",
  component: EmptyStateInitialLoading,
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof EmptyStateInitialLoading>;

const Template: ComponentStory<typeof EmptyStateInitialLoading> = () => (
  <EmptyStateInitialLoading />
);

export const Story = Template.bind({});
Story.storyName = "Initial loading screen";
