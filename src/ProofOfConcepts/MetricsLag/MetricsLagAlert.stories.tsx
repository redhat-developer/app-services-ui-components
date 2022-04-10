import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MetricsLagAlert } from "./MetricsLagAlert";

export default {
  component: MetricsLagAlert,
  args: {},
  parameters: {},
} as ComponentMeta<typeof MetricsLagAlert>;

const Template: ComponentStory<typeof MetricsLagAlert> = (
  args,
  { parameters }
) => <MetricsLagAlert {...args} />;

export const LagMessage = Template.bind({});