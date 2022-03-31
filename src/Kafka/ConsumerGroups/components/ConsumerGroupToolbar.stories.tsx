import { ComponentStory, ComponentMeta } from "@storybook/react";
import { ConsumerGroupToolbar } from "./ConsumerGroupToolbar";

export default {
  component: ConsumerGroupToolbar,
  args: {
    itemCount: 500,
    page: 2,
    perPage: 20,
  },
} as ComponentMeta<typeof ConsumerGroupToolbar>;

const Template: ComponentStory<typeof ConsumerGroupToolbar> = (args) => (
  <ConsumerGroupToolbar {...args} />
);

export const ConsumerToolbar = Template.bind({});
