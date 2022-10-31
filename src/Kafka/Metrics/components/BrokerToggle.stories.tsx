import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { BrokerToggle } from "./BrokerToggle";

export default {
  component: BrokerToggle,
  args: {
    value: "perBroker",
  },
} as ComponentMeta<typeof BrokerToggle>;

const Template: ComponentStory<typeof BrokerToggle> = (args) => (
  <BrokerToggle {...args} />
);

export const Total = Template.bind({});
Total.args = {
  value: "total",
};

export const PerBroker = Template.bind({});
PerBroker.args = {
  value: "perBroker",
};
