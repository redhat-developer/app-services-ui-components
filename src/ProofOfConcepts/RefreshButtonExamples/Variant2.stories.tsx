import React from "react";
import { Toolbar, ToolbarContent } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { sub } from "date-fns";

import { POCRefreshButton } from "./Variant2";

export default {
  component: POCRefreshButton,
  args: {
    isRefreshing: false,
    lastUpdated: sub(new Date(), { minutes: 3 }),
  },
} as ComponentMeta<typeof POCRefreshButton>;

const Template: ComponentStory<typeof POCRefreshButton> = (args) => (
  <Toolbar>
    <ToolbarContent>
      <POCRefreshButton {...args} />
    </ToolbarContent>
  </Toolbar>
);

export const Story = Template.bind({});
Story.args = {};
