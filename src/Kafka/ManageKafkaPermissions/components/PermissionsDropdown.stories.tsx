import { ComponentMeta, ComponentStory } from "@storybook/react";

import { PermissionsDropdown } from "./PermissionsDropdown";

export default {
  component: PermissionsDropdown,
  args: {},
} as ComponentMeta<typeof PermissionsDropdown>;

const Template: ComponentStory<typeof PermissionsDropdown> = (args) => (
  <div style={{ height: "90vh", display: "flex", alignItems: "end" }}>
    <PermissionsDropdown {...args} />
  </div>
);

export const Example = Template.bind({});
Example.args = {};
