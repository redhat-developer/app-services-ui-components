import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FilterSelect } from "./FilterSelect";

export default {
  title: "Components/ServiceAccount/Search",
  component: FilterSelect,
  args: {},
} as ComponentMeta<typeof FilterSelect>;

const Template: ComponentStory<typeof FilterSelect> = (args) => (
  <FilterSelect {...args} />
);

export const SelectFilter = Template.bind({});
