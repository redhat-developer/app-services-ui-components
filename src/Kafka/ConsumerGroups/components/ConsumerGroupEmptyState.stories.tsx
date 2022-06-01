import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupEmptyState } from "./ConsumerGroupEmptyState";

export default {
  component: ConsumerGroupEmptyState,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof ConsumerGroupEmptyState>;

const Template: ComponentStory<typeof ConsumerGroupEmptyState> = (args) => (
  <ConsumerGroupEmptyState {...args} />
);

export const EmptyState = Template.bind({});
