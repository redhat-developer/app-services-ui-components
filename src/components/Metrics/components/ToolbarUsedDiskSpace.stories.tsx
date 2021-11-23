import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ToolbarUsedDiskSpace } from "./ToolbarUsedDiskSpace";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Components/ToolbarUsedDiskSpace",
  component: ToolbarUsedDiskSpace,
  controls: {},
  args: {
    title: "Sample title",
    topicList: ["lorem", "dolor", "ipsum"],
    isDisabled: false,
  },
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof ToolbarUsedDiskSpace>;

const Template: ComponentStory<typeof ToolbarUsedDiskSpace> = (args) => (
  <ToolbarUsedDiskSpace {...args} />
);

export const Example = Template.bind({});
Example.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const Refreshing = Template.bind({});
Refreshing.args = {
  isRefreshing: true,
};
