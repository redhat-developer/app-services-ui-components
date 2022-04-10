import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ConsumerGroups } from "./ConsumerGroups";

export default {
  component: ConsumerGroups,
  args: {},
  parameters: {},
} as ComponentMeta<typeof ConsumerGroups>;

const Template: ComponentStory<typeof ConsumerGroups> = (
  args,
  { parameters }
) => <ConsumerGroups {...args} />;

export const ConsumerGroupsCard = Template.bind({});
