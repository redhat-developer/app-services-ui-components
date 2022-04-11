import { ComponentStory, ComponentMeta } from "@storybook/react";
import { DropdownWithToggle, IDropdownOption } from "./DropdownToggle";

const offsetOptions: IDropdownOption[] = [
  {
    key: "Absolute",
    value: "Absolute",
    isDisabled: false,
  },
  {
    key: "Latest",
    value: "Latest",
    isDisabled: false,
  },
  {
    key: "Earliest",
    value: "Earliest",
    isDisabled: false,
  },
];

export default {
  component: DropdownWithToggle,
  args: {
    items: offsetOptions,
    id: "offset-dropdown",
    toggleId: "offset-dropdowntoggle",
    ariaLabel: "offset-select-dropdown",
    name: "offset-dropdown",
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof DropdownWithToggle>;

const Template: ComponentStory<typeof DropdownWithToggle> = (args) => (
  <DropdownWithToggle {...args} />
);

export const Dropdown = Template.bind({});
