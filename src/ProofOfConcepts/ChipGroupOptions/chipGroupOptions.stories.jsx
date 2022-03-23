import React from "react";

import { App } from "./chipGroupOptions";

export default {
  title: "Proof Of Concepts/ACL Filter Chips",
  component: App,
  args: {},
};

const Template = (args) => <App {...args} />;

export const ChipGroupOptions = Template.bind({});
ChipGroupOptions.args = {};
