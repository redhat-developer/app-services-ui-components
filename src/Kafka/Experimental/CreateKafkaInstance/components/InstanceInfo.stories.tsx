import { FlexItem } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { InstanceInfo } from "./InstanceInfo";

export default {
  component: InstanceInfo,
  args: {
    isLoading: false,
    isTrial: false,
    trialDurationInHours: 123,
    ingresEgress: 123,
    storage: 123,
    maxPartitions: 123,
    connections: 123,
    connectionRate: 123,
    messageSize: 123,
    streamingUnits: 1,
  },
} as ComponentMeta<typeof InstanceInfo>;

const Template: ComponentStory<typeof InstanceInfo> = (args) => (
  <FlexItem
    flex={{ default: "flex_1" }}
    className="mas--CreateKafkaInstance__sidebar"
  >
    <InstanceInfo {...args} />
  </FlexItem>
);

export const QuotaInstance = Template.bind({});

export const TrialInstance = Template.bind({});
TrialInstance.args = {
  isTrial: true,
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
