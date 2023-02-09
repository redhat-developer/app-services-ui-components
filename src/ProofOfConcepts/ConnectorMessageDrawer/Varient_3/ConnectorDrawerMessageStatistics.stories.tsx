import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ConnectorDrawerMessageStatistics } from "./ConnectorDrawerMessageStatistics";

export default {
  title: "POC-Connectors Message Drawer/Varient 3 Example",
  component: ConnectorDrawerMessageStatistics,
  args: {},
  parameters: {
    backgrounds: {
      default: "white",
    },
  },
} as ComponentMeta<typeof ConnectorDrawerMessageStatistics>;

const Template: ComponentStory<typeof ConnectorDrawerMessageStatistics> = (
  args
) => <ConnectorDrawerMessageStatistics />;

export const Story = Template.bind({});
Story.args = {};
