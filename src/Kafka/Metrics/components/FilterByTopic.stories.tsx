import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FilterByTopic } from "./FilterByTopic";

export default {
  component: FilterByTopic,
  args: {
    selectedTopic: undefined,
    topicList: ["lorem", "dolor", "ipsum"],
    disableToolbar: false,
  },
} as ComponentMeta<typeof FilterByTopic>;

const Template: ComponentStory<typeof FilterByTopic> = (
  args,
  { parameters }
) => (
  <div style={parameters.style}>
    <FilterByTopic {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  disableToolbar: true,
};

export const NoTopics = Template.bind({});
NoTopics.args = {
  topicList: undefined,
};

export const MultipleTopicsWithCommonWords = Template.bind({});
MultipleTopicsWithCommonWords.args = {
  topicList: ["lorem dolor", "lorem ipsum", "lorem foo", "dolor", "ipsum"],
};

export const DoesNotBreakWithLongWords = Template.bind({});
DoesNotBreakWithLongWords.args = {
  topicList: [
    "lorem dolor lorem dolor lorem dolor lorem dolor lorem dolor lorem dolor",
    "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum ",
    "lorem foo",
    "dolor",
    "ipsum",
  ],
};
DoesNotBreakWithLongWords.parameters = {
  style: {
    width: "200px",
  },
};
