import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { OffsetSelect } from "./OffsetSelect";

export default {
  component: OffsetSelect,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof OffsetSelect>;

const Template: ComponentStory<typeof OffsetSelect> = (args) => (
  <OffsetSelect {...args} />
);

export const OffsetDropdownSelect = Template.bind({});
OffsetDropdownSelect.args = {};
