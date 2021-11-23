import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { ChartUsedDiskSpace } from "./ChartUsedDiskSpace";
import MetricsI18n from "../Metrics-i18n.json";

export default {
  title: "Metrics/Components/ChartUsedDiskSpace",
  component: ChartUsedDiskSpace,
  args: {
    timeDuration: 5,
  },
  parameters: {
    i18n: MetricsI18n,
  },
} as ComponentMeta<typeof ChartUsedDiskSpace>;

const Template: ComponentStory<typeof ChartUsedDiskSpace> = (args) => (
  <ChartUsedDiskSpace {...args} />
);

export const UnderLimits = Template.bind({});
UnderLimits.args = {
  metrics: {
    "1636546066048": 74297344789,
    "1636546166048": 74502144789,
    "1636546266048": 119756096789,
    "1636546366048": 119948608789,
    "1636546466048": 75231232789,
  },
};

export const OverLimits = Template.bind({});
OverLimits.args = {
  metrics: {
    "1636546066048": 74297344789,
    "1636546166048": 74502144789,
    "1636546266048": 2197560967890,
    "1636546366048": 119948608789,
    "1636546466048": 75231232789,
  },
};
