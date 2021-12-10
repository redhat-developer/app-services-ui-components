import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { EmptyStateNoMetricsDataForSelection } from "./EmptyStateNoMetricsDataForSelection";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Empty States/Metrics/No metrics data for the selected options",
  component: EmptyStateNoMetricsDataForSelection,
  args: {},
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof EmptyStateNoMetricsDataForSelection>;

const Template: ComponentStory<typeof EmptyStateNoMetricsDataForSelection> = (
  args
) => <EmptyStateNoMetricsDataForSelection {...args} />;

export const Story = Template.bind({});
Story.args = {};
Story.storyName = "No metrics data for the selected options";
