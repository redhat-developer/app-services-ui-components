import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { DeleteKafkaTopicActive } from "./DeleteKafkaTopicActive";

export default {
  component: DeleteKafkaTopicActive,
  args: {
    instanceName: "resource name",
    isModalOpen: true,
    disableFocusTrap: true,
  },
} as ComponentMeta<typeof DeleteKafkaTopicActive>;

const Template: ComponentStory<typeof DeleteKafkaTopicActive> = (args) => (
  <DeleteKafkaTopicActive {...args} />
);

export const Story = Template.bind({});
Story.args = {};
