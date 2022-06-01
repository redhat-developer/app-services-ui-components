import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { makeMetrics } from "../makeMetrics";
import { DurationOptions } from "../types";
import { ChartLogSizePerPartition } from "./ChartLogSizePerPartition";

export default {
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
    topic: "foo",
    duration: DurationOptions.Last12hours,
    isLoading: false,
    emptyState: <div>this is the empty state</div>,
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof ChartLogSizePerPartition>;

const Template: ComponentStory<typeof ChartLogSizePerPartition> = (args) => (
  <ChartLogSizePerPartition {...args} />
);

export const SampleData = Template.bind({});
SampleData.args = {};

export const NoData = Template.bind({});
NoData.args = {
  partitions: {},
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
