import { ComponentMeta, ComponentStory } from "@storybook/react";
import { PFChips } from "./PFChip";

export default {
  component: PFChips,
  args: {},
  parameters: {},
} as ComponentMeta<typeof PFChips>;

const Template: ComponentStory<typeof PFChips> = (args, { parameters }) => (
  <PFChips {...args} />
);

export const SecondChipGroups = Template.bind({});

SecondChipGroups.parameters = {
  backgrounds: { default: "--pf-global--BackgroundColor--200" },
};
