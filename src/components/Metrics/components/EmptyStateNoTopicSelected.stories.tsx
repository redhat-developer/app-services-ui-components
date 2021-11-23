import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoTopicSelected } from "./EmptyStateNoTopicSelected";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Empty states/No topic selected",
  component: EmptyStateNoTopicSelected,
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof EmptyStateNoTopicSelected>;

const Template: ComponentStory<typeof EmptyStateNoTopicSelected> = () => (
  <EmptyStateNoTopicSelected />
);

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "No topic selected";
