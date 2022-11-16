import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { EmptyStateNoResults } from "./EmptyStateNoResults";

export default {
  component: EmptyStateNoResults,
  args: {},
} as ComponentMeta<typeof EmptyStateNoResults>;

const Template: ComponentStory<typeof EmptyStateNoResults> = (args) => (
  <EmptyStateNoResults {...args} />
);

export const SearchResultNoFound = Template.bind({});
SearchResultNoFound.args = {};
