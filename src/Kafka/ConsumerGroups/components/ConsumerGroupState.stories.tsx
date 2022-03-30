import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupStateLabel } from "./ConsumerGroupState";

export default {
  component: ConsumerGroupStateLabel,
  args: {
    state: "PreparingRebalance",
  },
} as ComponentMeta<typeof ConsumerGroupStateLabel>;

const Template: ComponentStory<typeof ConsumerGroupStateLabel> = (args) => (
  <ConsumerGroupStateLabel {...args} />
);

export const LabelForConsumerGroup = Template.bind({});
