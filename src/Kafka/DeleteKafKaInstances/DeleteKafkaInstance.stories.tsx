import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { DeleteKafkaInstance } from "./DeleteKafkaInstance";

export default {
  component: DeleteKafkaInstance,
  args: {
    instanceName: "resource name",
    isModalOpen: true,
    disableFocusTrap: true,
  },
} as ComponentMeta<typeof DeleteKafkaInstance>;

const Template: ComponentStory<typeof DeleteKafkaInstance> = (args) => (
  <DeleteKafkaInstance {...args} />
);

export const Story = Template.bind({});
Story.args = {};
