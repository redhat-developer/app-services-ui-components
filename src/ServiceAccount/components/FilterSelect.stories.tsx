import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FilterSelect } from "./FilterSelect";

export default {
  title: "Components/ServiceAccount/FilterSelect",
  component: FilterSelect,
  args: {
    value: "clientid",
  },
} as ComponentMeta<typeof FilterSelect>;

const Template: ComponentStory<typeof FilterSelect> = (args) => (
  <FilterSelect {...args} />
);

export const Default = Template.bind({});
