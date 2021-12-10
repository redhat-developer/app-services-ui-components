import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoTopics } from "./EmptyStateNoTopics";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Empty States/Metrics/No topics",
  component: EmptyStateNoTopics,
  args: {},
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof EmptyStateNoTopics>;

const Template: ComponentStory<typeof EmptyStateNoTopics> = (
  { onCreateTopic },
  { parameters }
) => (
  <EmptyStateNoTopics
    onCreateTopic={parameters.noAction === true ? undefined : onCreateTopic}
  />
);

export const WithCTA = Template.bind({});
WithCTA.args = {
  onCreateTopic: () => false,
};

export const WithNoCTA = Template.bind({});
WithNoCTA.args = {};
WithNoCTA.parameters = {
  noAction: true,
};
