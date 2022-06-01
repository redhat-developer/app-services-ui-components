import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { APIManagementPage as APIManagementPageComp } from "./APIManagementPage";

export default {
  component: APIManagementPageComp,
  args: {},
} as ComponentMeta<typeof APIManagementPageComp>;

const Template: ComponentStory<typeof APIManagementPageComp> = (args) => (
  <APIManagementPageComp {...args} />
);

export const APIManagementPage = Template.bind({});
