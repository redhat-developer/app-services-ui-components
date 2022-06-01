import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ResourceTypeLabel } from "./ResourceTypeLabel";

export default {
  component: ResourceTypeLabel,
  args: {},
} as ComponentMeta<typeof ResourceTypeLabel>;

const Template: ComponentStory<typeof ResourceTypeLabel> = (args) => (
  <ResourceTypeLabel {...args} />
);

export const Group = Template.bind({});
Group.args = { variant: "GROUP" };

export const Cluster = Template.bind({});
Cluster.args = { variant: "CLUSTER" };

export const Topic = Template.bind({});
Topic.args = { variant: "TOPIC" };

export const TransactionalId = Template.bind({});
TransactionalId.args = { variant: "TRANSACTIONAL_ID" };
