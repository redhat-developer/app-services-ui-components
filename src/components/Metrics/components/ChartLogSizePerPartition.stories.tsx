import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChartLogSizePerPartition } from "./ChartLogSizePerPartition";
import MetricsI18n from "../Metrics-i18n.json";
import { makeMetrics } from "../Metrics.stories";
import { DurationOptions } from "../types";

export default {
  title: "Metrics/Components/ChartLogSizePerPartition",
  component: ChartLogSizePerPartition,
  args: {
    partitions: {
      "dolor partition 1": makeMetrics(
        DurationOptions.Last12hours,
        0,
        999 * 10 ** 4,
        1
      ),
      "dolor partition 2": makeMetrics(
        DurationOptions.Last12hours,
        0,
        999 * 10 ** 5,
        1
      ),
      "dolor partition 3": makeMetrics(
        DurationOptions.Last12hours,
        0,
        999 * 10 ** 6,
        1
      ),
    },
    duration: DurationOptions.Last12hours,
  },
  argTypes: {
    duration: {
      type: null,
    },
  },
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof ChartLogSizePerPartition>;

const Template: ComponentStory<typeof ChartLogSizePerPartition> = (args) => (
  <ChartLogSizePerPartition {...args} />
);

export const Story = Template.bind({});
Story.args = {};
