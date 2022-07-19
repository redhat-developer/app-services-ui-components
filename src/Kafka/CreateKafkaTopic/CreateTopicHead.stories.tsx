import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { CreateTopicHead } from "./CreateTopicHead";

export default {
  component: CreateTopicHead,
  args: {
    instanceName: "resource name",
    isModalOpen: true,
    disableFocusTrap: true,
  },
} as ComponentMeta<typeof CreateTopicHead>;

const Template: ComponentStory<typeof CreateTopicHead> = (args) => (
  <CreateTopicHead {...args} />
);

export const Story = Template.bind({});
Story.args = {};
