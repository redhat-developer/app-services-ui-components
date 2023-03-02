import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerPanelBody,
  DrawerPanelContent,
} from "@patternfly/react-core";

import { ConnectorDrawer } from "./ConnectorDrawer";

export default {
  title: "POC-Connectors Message Drawer/Variant 2 Full Example",
  component: ConnectorDrawer,
  args: { sent: "1600", notSent: "12" },
  parameters: {
    backgrounds: {
      default: "white",
    },
  },
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
} as ComponentMeta<typeof ConnectorDrawer>;

const Template: ComponentStory<typeof ConnectorDrawer> = (args) => (
  <ConnectorDrawer {...args} />
);

export const Story = Template.bind({});
Story.args = {};
