import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerPanelBody,
  DrawerPanelContent,
} from "@patternfly/react-core";

import { ConnectorDrawerMessageStatistics } from "./ConnectorDrawerMessageStatistics";

export default {
  title: "POC-Connectors Message Drawer/Variant 6 Example",
  component: ConnectorDrawerMessageStatistics,
  parameters: {
    backgrounds: {
      default: "white",
    },
  },
  args: {},
  decorators: [
    (Story) => (
      <Drawer isExpanded={true}>
        <DrawerContent
          panelContent={
            <DrawerPanelContent>
              <DrawerPanelBody>
                <Story />
              </DrawerPanelBody>
            </DrawerPanelContent>
          }
        />
      </Drawer>
    ),
  ],
} as ComponentMeta<typeof ConnectorDrawerMessageStatistics>;

const Template: ComponentStory<typeof ConnectorDrawerMessageStatistics> = (
  args
) => <ConnectorDrawerMessageStatistics />;

export const Story = Template.bind({});
Story.args = {};
