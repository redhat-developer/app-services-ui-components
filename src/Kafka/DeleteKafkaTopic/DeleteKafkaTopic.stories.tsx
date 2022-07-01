import type { ComponentStory, ComponentMeta } from "@storybook/react";

import { DeleteKafkaTopic } from "./DeleteKafkaTopic";

export default {
  component: DeleteKafkaTopic,
  args: {
    instanceName: "resource name",
    isModalOpen: true,
    disableFocusTrap: true,
  },
} as ComponentMeta<typeof DeleteKafkaTopic>;

const Template: ComponentStory<typeof DeleteKafkaTopic> = (args) => (
  <DeleteKafkaTopic {...args} />
);

export const Story = Template.bind({});
Story.args = {};
