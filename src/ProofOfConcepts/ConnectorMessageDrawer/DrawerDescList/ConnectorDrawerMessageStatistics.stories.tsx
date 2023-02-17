{
  /**  add content, remove some spacing classes, remove color icon classes, 
make heading ourside similar relationship to below content
, have numbers bigger then processed message
, try different kind of content in layout
,ifilled on bith split example*/
}
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
