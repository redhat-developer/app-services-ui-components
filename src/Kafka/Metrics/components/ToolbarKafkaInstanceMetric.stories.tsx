import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ToolbarKafkaInstanceMetric } from "./ToolbarKafkaInstanceMetric";

export default {
  component: ToolbarKafkaInstanceMetric,
  controls: {},
  args: {
    topicList: ["lorem", "dolor", "ipsum"],
    BrokerList: ["Broker1", "Broker2", "Broker3"],
    isDisabled: false,
  },
} as ComponentMeta<typeof ToolbarKafkaInstanceMetric>;

const Template: ComponentStory<typeof ToolbarKafkaInstanceMetric> = (args) => (
  <ToolbarKafkaInstanceMetric {...args} />
);

export const Example = Template.bind({});
Example.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};

export const Refreshing = Template.bind({});
Refreshing.args = {
  isRefreshing: true,
};
