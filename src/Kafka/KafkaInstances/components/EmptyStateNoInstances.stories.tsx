import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateNoInstances as EmptyStateNoInstancesComp } from "./EmptyStateNoInstances";

export default {
  component: EmptyStateNoInstancesComp,
  args: {},
} as ComponentMeta<typeof EmptyStateNoInstancesComp>;

const Template: ComponentStory<typeof EmptyStateNoInstancesComp> = (args) => (
  <EmptyStateNoInstancesComp {...args} />
);

export const EmptyStateNoInstances = Template.bind({});
EmptyStateNoInstances.args = {};
