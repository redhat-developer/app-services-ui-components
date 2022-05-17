import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TopicDropdown } from "./TopicsDropdown";

export default {
  component: TopicDropdown,
  args: {
    topics: ["test-topic", "test-value"],
  },
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof TopicDropdown>;

const Template: ComponentStory<typeof TopicDropdown> = (args) => (
  <TopicDropdown {...args} />
);

export const TopicDropdownSelect = Template.bind({});
TopicDropdownSelect.args = {};
