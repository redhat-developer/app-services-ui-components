import { Modal } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DeleteConsumerGroup } from "./DeleteConsumerGroup";

export default {
  component: DeleteConsumerGroup,
  args: {
    isModalOpen: true,
    state: "Stable",
    consumerName: "console-745",
  },
} as ComponentMeta<typeof DeleteConsumerGroup>;

const Template: ComponentStory<typeof DeleteConsumerGroup> = (args) => (
  <DeleteConsumerGroup {...args} />
);

export const DeleteModalWhenConsumerStateIsStable = Template.bind({});

export const DeleteModalWhenConsumerStateIsNotStable = Template.bind({});
DeleteModalWhenConsumerStateIsNotStable.args = {
  state: "Empty",
};
