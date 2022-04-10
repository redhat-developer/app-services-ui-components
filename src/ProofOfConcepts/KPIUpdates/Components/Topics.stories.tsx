import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Topics } from "./Topics";

export default {
  component: Topics,
  args: {},
  parameters: {},
} as ComponentMeta<typeof Topics>;

const Template: ComponentStory<typeof Topics> = (args, { parameters }) => (
  <Topics {...args} />
);

export const TopicsCard = Template.bind({});
