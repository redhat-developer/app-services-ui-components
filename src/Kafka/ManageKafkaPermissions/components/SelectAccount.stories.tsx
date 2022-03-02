import { SelectAccount } from "./SelectAccount";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import React, { useState } from "react";
import { SelectOptionObject } from "@patternfly/react-core";
import { PrincipalType } from "../types";

const account = [
  {
    id: "id",
    displayName: "displayName",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id5",
    displayName: "displayName5",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id2",
    displayName: "displayName2",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id3",
    displayName: "displayName3",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id4",
    displayName: "displayName4",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id6",
    displayName: "displayName6",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id7",
    displayName: "displayName7",
    principalType: PrincipalType.ServiceAccount,
  },
];

export default {
  component: SelectAccount,
  args: { accounts: account, id: undefined },
} as ComponentMeta<typeof SelectAccount>;

const Template: ComponentStory<typeof SelectAccount> = (args) => (
  <SelectAccount {...args} />
);

export const InteractiveExample: ComponentStory<typeof SelectAccount> = () => {
  const [selectedAccount, setSelectedAccount] = useState<
    string | undefined | SelectOptionObject
  >(undefined);
  return (
    <SelectAccount
      id={selectedAccount}
      onChangeAccount={setSelectedAccount}
      accounts={account}
      onEscapeModal={() => ({})}
    />
  );
};
InteractiveExample.parameters = {
  docs: {
    description: {
      story: `A user can select a valid account and also clear it using the clear button `,
    },
  },
};

export const EmptyState = Template.bind({});
EmptyState.args = {};

export const NoServiceOrUserAccounts = Template.bind({});
NoServiceOrUserAccounts.args = { accounts: [] };
NoServiceOrUserAccounts.parameters = {
  docs: {
    description: {
      story: `No accounts available to be selected.`,
    },
  },
};

export const OnlyServiceAccounts = Template.bind({});
OnlyServiceAccounts.args = {
  accounts: [
    {
      id: "id",
      displayName: "displayName",
      principalType: PrincipalType.ServiceAccount,
    },
    {
      id: "id5",
      displayName: "displayName5",
      principalType: PrincipalType.ServiceAccount,
    },
  ],
};
OnlyServiceAccounts.parameters = {
  docs: {
    description: {
      story: `Only service accounts are available for selection`,
    },
  },
};

export const OnlyUserAccounts = Template.bind({});
OnlyUserAccounts.args = {
  accounts: [
    {
      id: "id6",
      displayName: "displayName",
      principalType: PrincipalType.UserAccount,
    },
  ],
};
OnlyUserAccounts.parameters = {
  docs: {
    description: {
      story: `Only user accounts are available for selection`,
    },
  },
};
