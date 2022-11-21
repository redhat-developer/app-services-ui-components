import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { makeMetrics } from "../makeMetrics";
import { DurationOptions } from "../types";
import { StackChartPartitionSizePerBroker } from "./PartitionStackChartPerBroker";

export default {
  component: StackChartPartitionSizePerBroker,
  args: {
    metrics: {},
    duration: DurationOptions.Last12hours,
    selectedPartition: "Top20",
    partitions: {
      "topic1/0": makeMetrics(DurationOptions.Last12hours, 0, 32, 10 ** 7),
      "topic1/1": makeMetrics(DurationOptions.Last12hours, 0, 31, 10 ** 7),
      "topic1/2": makeMetrics(DurationOptions.Last12hours, 0, 28, 10 ** 7),
      "topic2/3": makeMetrics(DurationOptions.Last12hours, 0, 25, 10 ** 7),
      "topic2/4": makeMetrics(DurationOptions.Last12hours, 0, 22, 10 ** 7),
      "topic2/5": makeMetrics(DurationOptions.Last12hours, 0, 21, 10 ** 7),
      "topic3/6": makeMetrics(DurationOptions.Last12hours, 0, 19, 10 ** 7),
      "topic3/7": makeMetrics(DurationOptions.Last12hours, 0, 17, 10 ** 7),
      "topic3/8": makeMetrics(DurationOptions.Last12hours, 0, 16, 10 ** 7),
      "topic4/9": makeMetrics(DurationOptions.Last12hours, 0, 14, 10 ** 7),
      "topic4/10": makeMetrics(DurationOptions.Last12hours, 0, 11, 10 ** 7),
      "topic4/11": makeMetrics(DurationOptions.Last12hours, 0, 10, 10 ** 7),
      "topic4/12": makeMetrics(DurationOptions.Last12hours, 0, 9, 10 ** 7),
      "topic4/13": makeMetrics(DurationOptions.Last12hours, 0, 8, 10 ** 7),
      "topic1/14": makeMetrics(DurationOptions.Last12hours, 0, 7, 10 ** 7),
      "topic2/15": makeMetrics(DurationOptions.Last12hours, 0, 7, 10 ** 7),
      "topic3/16": makeMetrics(DurationOptions.Last12hours, 0, 6, 10 ** 7),
      "topic4/17": makeMetrics(DurationOptions.Last12hours, 0, 5, 10 ** 7),
      "topic5/18": makeMetrics(DurationOptions.Last12hours, 0, 4, 10 ** 7),
      "topic5/19": makeMetrics(DurationOptions.Last12hours, 0, 3, 10 ** 7),
      "topic5/20": makeMetrics(DurationOptions.Last12hours, 0, 2, 10 ** 7),
    },
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof StackChartPartitionSizePerBroker>;

const Template: ComponentStory<typeof StackChartPartitionSizePerBroker> = (
  args
) => <StackChartPartitionSizePerBroker {...args} />;

export const StackChart = Template.bind({});
