import { ComponentMeta, ComponentStory } from "@storybook/react";
import { TopRowCardsLimitReached } from "./TopRowCardsLimitReached";

export default {
  component: TopRowCardsLimitReached,
  args: {},
  parameters: {},
} as ComponentMeta<typeof TopRowCardsLimitReached>;

const Template: ComponentStory<typeof TopRowCardsLimitReached> = (
  args,
  { parameters }
) => <TopRowCardsLimitReached {...args} />;

export const LimitReachedDemo = Template.bind({});
