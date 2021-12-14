import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoTopics } from "./EmptyStateNoTopics";

export default {
  title: "Empty States/Metrics/No topics",
  component: EmptyStateNoTopics,
  args: {},
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
