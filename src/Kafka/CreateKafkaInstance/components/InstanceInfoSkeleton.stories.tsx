import { FlexItem } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { InstanceInfoSkeleton as InstanceInfoSkeletonComp } from "./InstanceInfoSkeleton";

export default {
  component: InstanceInfoSkeletonComp,
  args: {
    isTrial: false,
    trialDurationInHours: 123,
    ingress: 123,
    egress: 123,
    storage: 123,
    maxPartitions: 123,
    connections: 123,
    connectionRate: 123,
    messageSize: 123,
    streamingUnits: 1,
  },
} as ComponentMeta<typeof InstanceInfoSkeletonComp>;

const Template: ComponentStory<typeof InstanceInfoSkeletonComp> = (args) => (
  <FlexItem
    flex={{ default: "flex_1" }}
    className="mas--CreateKafkaInstance__sidebar"
  >
    <InstanceInfoSkeletonComp {...args} />
  </FlexItem>
);

export const InstanceInfoSkeleton = Template.bind({});
