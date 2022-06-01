import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { RefreshButton } from "./RefreshButton";

export default {
  component: RefreshButton,
  args: {},
} as ComponentMeta<typeof RefreshButton>;

const Template: ComponentStory<typeof RefreshButton> = (args) => (
  <RefreshButton {...args} />
);

export const Default = Template.bind({});
Default.args = {};

export const Refreshing = Template.bind({});
Refreshing.args = {
  isRefreshing: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
