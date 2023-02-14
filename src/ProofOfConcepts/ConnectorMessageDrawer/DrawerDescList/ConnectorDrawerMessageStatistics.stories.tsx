import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { Drawer, DrawerContent } from "@patternfly/react-core";

import { ConnectorDrawerMessageStatistics } from "./ConnectorDrawerMessageStatistics";

export default {
  title: "POC-Connectors Message Drawer/Description List Example",
  component: ConnectorDrawerMessageStatistics,
  args: {},
  parameters: {
    backgrounds: {
      default: "white",
    },
  },
  decorators: [
    (Story) => (
      <div>
        <Drawer className={"SomeObviousWordToFind"} isExpanded={true}>
          <DrawerContent panelContent={<Story />} />
        </Drawer>
      </div>
    ),
  ],
} as ComponentMeta<typeof ConnectorDrawerMessageStatistics>;

const Template: ComponentStory<typeof ConnectorDrawerMessageStatistics> = (
  args
) => <ConnectorDrawerMessageStatistics />;

export const Story = Template.bind({});
Story.args = {};
