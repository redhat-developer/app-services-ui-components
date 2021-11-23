import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { FilterByTopic } from "./FilterByTopic";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Components/FilterByTopic",
  component: FilterByTopic,
  args: {
    selectedTopic: undefined,
    topicList: ["lorem", "dolor", "ipsum"],
    disableToolbar: false,
  },
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof FilterByTopic>;

const Template: ComponentStory<typeof FilterByTopic> = (args) => (
  <FilterByTopic {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disableToolbar: true,
};

export const NoTopics = Template.bind({});
NoTopics.args = {
  topicList: undefined,
};

export const MultipleTopicsWithCommonWords = Template.bind({});
MultipleTopicsWithCommonWords.args = {
  topicList: ["lorem dolor", "lorem ipsum", "lorem foo", "dolor", "ipsum"],
};
