import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { SuspendPopover } from "./SuspendPopover";

export default {
  component: SuspendPopover,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof SuspendPopover>;

const Template: ComponentStory<typeof SuspendPopover> = (args) => (
  <SuspendPopover {...args} />
);

export const Popover = Template.bind({});
