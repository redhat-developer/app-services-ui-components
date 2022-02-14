import { ComponentStory, ComponentMeta } from "@storybook/react";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";

export default {
  component: EmptyStateMetricsUnavailable,
  args: {},
} as ComponentMeta<typeof EmptyStateMetricsUnavailable>;

const Template: ComponentStory<typeof EmptyStateMetricsUnavailable> = (
  args
) => <EmptyStateMetricsUnavailable {...args} />;

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "Metrics unavailable";
