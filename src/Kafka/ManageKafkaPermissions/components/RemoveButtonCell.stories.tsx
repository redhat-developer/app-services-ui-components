import { ComponentStory, ComponentMeta } from "@storybook/react";
import { RemoveButtonCell } from "./RemoveButtonCell";

export default {
  component: RemoveButtonCell,
  args: {},
} as ComponentMeta<typeof RemoveButtonCell>;

const Template: ComponentStory<typeof RemoveButtonCell> = (args) => (
  <RemoveButtonCell {...args} />
);

export const RemoveButton = Template.bind({});
