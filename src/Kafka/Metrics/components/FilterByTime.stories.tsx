import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { FilterByTime } from "./FilterByTime";

export default {
  component: FilterByTime,
  args: {
    keyText: "string",
    disableToolbar: false,
    ariaLabel: "the aria label",
    duration: 60,
  },
} as ComponentMeta<typeof FilterByTime>;

const Template: ComponentStory<typeof FilterByTime> = (args) => (
  <FilterByTime {...args} />
);

export const Story = Template.bind({});
Story.args = {};
