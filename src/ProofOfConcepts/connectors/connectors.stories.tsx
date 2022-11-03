import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { DataListSelectableRows } from "./connectors";

export default {
  component: DataListSelectableRows,
  args: {},
} as ComponentMeta<typeof DataListSelectableRows>;

const Template: ComponentStory<typeof DataListSelectableRows> = (args) => (
  <DataListSelectableRows {...args} />
);

export const Story = Template.bind({});
Story.args = {};
