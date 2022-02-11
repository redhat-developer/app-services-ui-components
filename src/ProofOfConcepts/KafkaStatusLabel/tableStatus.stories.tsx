import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";

import { TableStatus } from "./tableStatus";

export default {
  component: TableStatus,
  args: {
    value: "ready",
  },
} as ComponentMeta<typeof TableStatus>;

const Template: ComponentStory<typeof TableStatus> = (args) => (
  <TableStatus {...args} />
);

export const AllStatuesAtOnce = () => (
  <>
    <TableStatus value={"ready"} />
    <br />
    <TableStatus value={"creating"} />
    <br />
    <TableStatus value={"creatingWarning"} />
    <br />
    <TableStatus value={"creatingError"} />
    <br />
    <TableStatus value={"deleting"} />
    <br />
    <TableStatus value={"failed"} />
  </>
);

export const Ready = Template.bind({});
Ready.args = {
  value: "ready",
};

export const Creating = Template.bind({});
Creating.args = {
  value: "creating",
};

export const CreatingOver15Minutes = Template.bind({});
CreatingOver15Minutes.args = {
  value: "creatingWarning",
};

export const CreatingOver30Minutes = Template.bind({});
CreatingOver30Minutes.args = {
  value: "creatingError",
};

export const Deleting = Template.bind({});
Deleting.args = {
  value: "deleting",
};

export const Failed = Template.bind({});
Failed.args = {
  value: "failed",
};
