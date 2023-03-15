import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ACLFilterChips } from "./ACLFilterChips";

export default {
  component: ACLFilterChips,
  args: {},
  parameters: {},
} as ComponentMeta<typeof ACLFilterChips>;

const Template: ComponentStory<typeof ACLFilterChips> = (
  args,
  { parameters }
) => <ACLFilterChips {...args} />;

export const ResourceTypeOperationChipsDemo = Template.bind({});

ResourceTypeOperationChipsDemo.parameters = {
  backgrounds: { default: "--pf-global--BackgroundColor--200" },
};
