import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

import { StatusLabel } from "./StatusLabel";

export default {
  title: "PoCs/StatusLabel",
  component: StatusLabel,
  args: {
    instanceName: "string",
  },
} as ComponentMeta<typeof StatusLabel>;

const Template: ComponentStory<typeof StatusLabel> = (args) => (
  <StatusLabel {...args} />
);

export const Ready = Template.bind({});
Ready.args = {
  value: "ready",
};

export const Failed = Template.bind({});
Failed.args = {
  value: "failed",
};

export const Accepted = Template.bind({});
Accepted.args = {
  value: "accepted",
};

export const Provisioning = Template.bind({});
Provisioning.args = {
  value: "provisioning",
};

export const Preparing = Template.bind({});
Preparing.args = {
  value: "preparing",
};

export const Deprovision = Template.bind({});
Deprovision.args = {
  value: "deprovision",
};

export const Deleting = Template.bind({});
Deleting.args = {
  value: "deleting",
};