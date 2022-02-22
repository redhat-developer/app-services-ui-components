import { SelectAccount } from "./SelectAccount";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";

export default {
  component: SelectAccount,
  args: {},
} as ComponentMeta<typeof SelectAccount>;

const Template: ComponentStory<typeof SelectAccount> = (args) => (
  <SelectAccount {...args} />
);

export const EmptyState = Template.bind({});
EmptyState.args = {
  initialOptions: [
    { id: "id", displayName: "displayName", principalType: "USER_ACCOUNT" },
    { id: "id5", displayName: "displayName5", principalType: "USER_ACCOUNT" },
    {
      id: "id2",
      displayName: "displayName2",
      principalType: "SERVICE_ACCOUNT",
    },
    {
      id: "id3",
      displayName: "displayName3",
      principalType: "SERVICE_ACCOUNT",
    },
    {
      id: "id4",
      displayName: "displayName4",
      principalType: "SERVICE_ACCOUNT",
    },
  ],
  id: { value: "" },
};
