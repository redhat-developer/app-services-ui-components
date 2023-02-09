import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ConnectorDrawerMessageStatistics } from "./ConnectorDrawerMessageStatistics";

export default {
  title: "POC-Connectors Message Drawer/Varient 6 Example",
  component: ConnectorDrawerMessageStatistics,
  parameters: {
    backgrounds: {
      default: "white",
    },
  },
  args: {},
} as ComponentMeta<typeof ConnectorDrawerMessageStatistics>;

const Template: ComponentStory<typeof ConnectorDrawerMessageStatistics> = (
  args
) => <ConnectorDrawerMessageStatistics />;

export const Story = Template.bind({});
Story.args = {};
