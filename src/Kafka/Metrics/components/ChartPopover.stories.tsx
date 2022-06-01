import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ChartPopover } from "./ChartPopover";

export default {
  component: ChartPopover,
  args: {
    description: "lorem dolor ipsum",
  },
} as ComponentMeta<typeof ChartPopover>;

const Template: ComponentStory<typeof ChartPopover> = (args) => (
  <ChartPopover {...args} />
);

export const Sample = Template.bind({});
Sample.args = {};
