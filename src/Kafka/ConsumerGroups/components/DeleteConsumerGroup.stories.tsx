import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { DeleteConsumerGroup } from "./DeleteConsumerGroup";

export default {
  component: DeleteConsumerGroup,
  args: {
    isModalOpen: true,
    consumerName: "console-745",
  },
} as ComponentMeta<typeof DeleteConsumerGroup>;

const Template: ComponentStory<typeof DeleteConsumerGroup> = (args, { id }) => (
  <DeleteConsumerGroup
    {...args}
    appendTo={() =>
      document.getElementById(`story--${id}`) ||
      document.getElementById("root") ||
      document.body
    }
    disableFocusTrap={true}
  />
);

export const AllowConsumerGroupDeletion = Template.bind({});
AllowConsumerGroupDeletion.args = {
  state: "Empty",
};

export const DenyConsumerGroupDeletion = Template.bind({});
DenyConsumerGroupDeletion.args = {
  state: "Stable",
};
