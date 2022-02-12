import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CardKpi } from "./CardKpi";

export default {
  component: CardKpi,
  args: {
    metric: "123",
    name: "KPI name",
    popover: "Lorem dolor ipsum",
    isLoading: false,
  },
} as ComponentMeta<typeof CardKpi>;

const Template: ComponentStory<typeof CardKpi> = (args) => (
  <CardKpi {...args} />
);

export const SampleKpi = Template.bind({});
SampleKpi.args = {};

export const NoKpi = Template.bind({});
NoKpi.args = {
  metric: undefined,
};

export const ZeroIsValidKpi = Template.bind({});
ZeroIsValidKpi.args = {
  metric: 0,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
