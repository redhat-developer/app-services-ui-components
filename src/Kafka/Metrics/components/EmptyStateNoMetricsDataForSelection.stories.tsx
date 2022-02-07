import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoMetricsDataForSelection } from "./EmptyStateNoMetricsDataForSelection";

export default {
  component: EmptyStateNoMetricsDataForSelection,
  args: {},
} as ComponentMeta<typeof EmptyStateNoMetricsDataForSelection>;

const Template: ComponentStory<typeof EmptyStateNoMetricsDataForSelection> = (
  args
) => <EmptyStateNoMetricsDataForSelection {...args} />;

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "No metrics data for the selected options";
