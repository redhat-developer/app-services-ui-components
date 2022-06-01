import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ToolbarTopicsMetrics } from "./ToolbarTopicsMetrics";

export default {
  component: ToolbarTopicsMetrics,
  controls: {},
  args: {
    topicList: ["lorem", "dolor", "ipsum"],
    isDisabled: false,
    isRefreshing: false,
  },
} as ComponentMeta<typeof ToolbarTopicsMetrics>;

const Template: ComponentStory<typeof ToolbarTopicsMetrics> = (args) => (
  <ToolbarTopicsMetrics {...args} />
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
