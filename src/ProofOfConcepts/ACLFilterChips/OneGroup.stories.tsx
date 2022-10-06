import { ComponentMeta, ComponentStory } from "@storybook/react";
import { OneGroupChips } from "./OneGroup";

export default {
  component: OneGroupChips,
  args: {},
  parameters: {},
} as ComponentMeta<typeof OneGroupChips>;

const Template: ComponentStory<typeof OneGroupChips> = (
  args,
  { parameters }
) => <OneGroupChips {...args} />;

export const ResourceTypeOperationOneGroup = Template.bind({});

ResourceTypeOperationOneGroup.parameters = {
  backgrounds: { default: "--pf-global--BackgroundColor--200" },
};
