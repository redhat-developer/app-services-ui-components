import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { ConnectorTypeListItem } from "./connectors";

export default {
  component: ConnectorTypeListItem,
  args: {},
} as ComponentMeta<typeof ConnectorTypeListItem>;

const Template: ComponentStory<typeof ConnectorTypeListItem> = (args) => (
  <ConnectorTypeListItem {...args} />
);

export const connectors = Template.bind({});
connectors.args = {};
