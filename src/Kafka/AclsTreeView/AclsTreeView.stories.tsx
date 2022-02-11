import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { AclsTreeView } from "./AclsTreeView";

export default {
  component: AclsTreeView,
  args: {},
} as ComponentMeta<typeof AclsTreeView>;

const Template: ComponentStory<typeof AclsTreeView> = () => (
  <AclsTreeView
    setSelectedItems={(items) => {
      console.log(items);
    }}
  />
);

export const Story = Template.bind({});
Story.storyName = "AclsTreeView";
