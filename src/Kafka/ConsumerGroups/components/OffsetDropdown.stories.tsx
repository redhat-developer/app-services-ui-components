import { ComponentStory, ComponentMeta } from "@storybook/react";
import { OffsetDropdown } from "./OffsetDropdown";

export default {
  component: OffsetDropdown,
  args: {
    value: "latest",
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof OffsetDropdown>;

const Template: ComponentStory<typeof OffsetDropdown> = (args) => (
  <OffsetDropdown {...args} />
);

export const OffsetDropdownSelect = Template.bind({});
OffsetDropdownSelect.args = {};
