import { ComponentMeta, ComponentStory } from "@storybook/react";
import { APIManagementPage } from "./APIManagementPage";

export default {
  component: APIManagementPage,
  args: {},
} as ComponentMeta<typeof APIManagementPage>;

const Template: ComponentStory<typeof APIManagementPage> = (args) => (
  <APIManagementPage {...args} />
);

export const Example = Template.bind({});
