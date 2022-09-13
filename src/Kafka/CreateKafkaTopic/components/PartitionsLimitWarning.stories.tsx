import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { PartitionLimitWarning } from "./PartitionLimitWarning";

export default {
  component: PartitionLimitWarning,
  args: {
    isModalOpen: true,
  },
} as ComponentMeta<typeof PartitionLimitWarning>;

const Template: ComponentStory<typeof PartitionLimitWarning> = (args) => (
  <PartitionLimitWarning {...args} />
);

export const EmptyState = Template.bind({});
EmptyState.args = {};
EmptyState.parameters = {
  docs: {
    description: {
      story: `A modal when creating a toic that has reached or exceeded available number of partitions`,
    },
  },
};
