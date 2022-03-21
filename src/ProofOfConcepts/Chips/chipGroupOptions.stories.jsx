import React from "react";

import { App } from "./chipGroupOptions";

export default {
  title: "POC/chipGroupOptions",
  component: App,
  args: {},
};

const Template = (args) => <App {...args} />;

export const Story = Template.bind({});
Story.args = {};
