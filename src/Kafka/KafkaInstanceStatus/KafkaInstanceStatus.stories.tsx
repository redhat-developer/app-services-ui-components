import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import * as popoverStories from "./components/StatusPopover/StatusPopover.stories";
import { StatusLabel, StatusPopover } from "./components";

import { KafkaInstanceStatus } from "./KafkaInstanceStatus";

export default {
  component: KafkaInstanceStatus,
  subcomponents: {
    StatusLabel,
    StatusPopover,
  },
  args: {
    createdAt: new Date(),
  },
} as ComponentMeta<typeof KafkaInstanceStatus>;

const Template: ComponentStory<typeof KafkaInstanceStatus> = (args) => (
  <KafkaInstanceStatus {...args} />
);

export const Ready = Template.bind({});
Ready.args = {
  status: "ready",
};

export const Failed = Template.bind({});
Failed.args = {
  status: "failed",
};

export const Accepted = Template.bind({});
Accepted.args = {
  status: "accepted",
};

export const Provisioning = Template.bind({});
Provisioning.args = {
  status: "provisioning",
};

export const Preparing = Template.bind({});
Preparing.args = {
  status: "preparing",
};

export const MoreThan15Minutes = Template.bind({});
MoreThan15Minutes.args = {
  status: "accepted",
  createdAt: popoverStories.MoreThan15Minutes.args?.createdAt,
};
MoreThan15Minutes.parameters = popoverStories.MoreThan15Minutes.parameters;

export const MoreThan30Minutes = Template.bind({});
MoreThan30Minutes.args = {
  status: "accepted",
  createdAt: popoverStories.MoreThan30Minutes.args?.createdAt,
};
MoreThan30Minutes.parameters = popoverStories.MoreThan30Minutes.parameters;

export const Deprovision = Template.bind({});
Deprovision.args = {
  status: "deprovision",
};

export const Deleting = Template.bind({});
Deleting.args = {
  status: "deleting",
};
