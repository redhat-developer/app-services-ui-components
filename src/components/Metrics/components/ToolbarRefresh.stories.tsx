import { Toolbar, ToolbarContent } from "@patternfly/react-core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import sub from "date-fns/sub";
import React from "react";
import MetricsI18n from "../Metrics-i18n.json";

import { ToolbarRefresh } from "./ToolbarRefresh";

export default {
  title: "Components/Metrics/ToolbarRefresh",
  component: ToolbarRefresh,
  args: {
    isRefreshing: false,
    lastUpdated: sub(new Date(), { minutes: 3 }),
  },
  parameters: {
    i18n: MetricsI18n,
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
