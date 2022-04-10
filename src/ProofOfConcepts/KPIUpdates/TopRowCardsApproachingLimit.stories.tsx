import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TopRowCardsApproachingLimit } from "./TopRowCardsApproachingLimit";

export default {
  component: TopRowCardsApproachingLimit,
  args: {},
  parameters: {},
} as ComponentMeta<typeof TopRowCardsApproachingLimit>;

const Template: ComponentStory<typeof TopRowCardsApproachingLimit> = (
  args,
  { parameters }
) => <TopRowCardsApproachingLimit {...args} />;

export const ApproachingLimitDemo = Template.bind({});
