import { Toolbar, ToolbarContent } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { sub } from "date-fns";

import { ToolbarRefresh } from "./ToolbarRefresh";

export default {
  component: ToolbarRefresh,
  args: {
    isRefreshing: false,
    lastUpdated: sub(new Date(), { minutes: 3 }),
  },
} as ComponentMeta<typeof ToolbarRefresh>;

const Template: ComponentStory<typeof ToolbarRefresh> = (args) => (
  <Toolbar>
    <ToolbarContent>
      <ToolbarRefresh {...args} />
    </ToolbarContent>
  </Toolbar>
);

export const Story = Template.bind({});
Story.args = {};
