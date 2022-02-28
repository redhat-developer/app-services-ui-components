import { ComponentMeta, ComponentStory } from "@storybook/react";

import { SolidLabel } from "./SolidLabel";
import { AclResourceType } from "../types";

export default {
  component: SolidLabel,
  args: {},
} as ComponentMeta<typeof SolidLabel>;

const Template: ComponentStory<typeof SolidLabel> = (args) => (
  <SolidLabel {...args} />
);

export const Group = Template.bind({});
Group.args = { variant: AclResourceType.Group };

export const Cluster = Template.bind({});
Cluster.args = { variant: AclResourceType.Cluster };

export const Topic = Template.bind({});
Topic.args = { variant: AclResourceType.Topic };

export const TransactionalId = Template.bind({});
TransactionalId.args = { variant: AclResourceType.TransactionalId };
