import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoTopics } from "./EmptyStateNoTopics";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Empty states/No topics",
  component: EmptyStateNoTopics,
  args: {},
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof EmptyStateNoTopics>;

const Template: ComponentStory<typeof EmptyStateNoTopics> = (args) => (
  <EmptyStateNoTopics {...args} />
);

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "No topics";
