import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TopicSelect } from "./TopicSelect";

export default {
  component: TopicSelect,
  args: {
    topics: ["test-topic", "test-value"],
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof TopicSelect>;

const Template: ComponentStory<typeof TopicSelect> = (args) => (
  <TopicSelect {...args} />
);

export const TopicSelectDropdown = Template.bind({});
TopicSelectDropdown.args = {};
