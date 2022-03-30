import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupPagination } from "./ConsumerGroupPagination";

export default {
  component: ConsumerGroupPagination,
  args: {
    itemCount: 500,
    page: 1,
    perPage: 20,
  },
} as ComponentMeta<typeof ConsumerGroupPagination>;

const Template: ComponentStory<typeof ConsumerGroupPagination> = (args) => (
  <ConsumerGroupPagination {...args} />
);

export const Pagination = Template.bind({});
