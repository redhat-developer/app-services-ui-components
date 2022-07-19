import { SelectAccount } from "./SelectAccount";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { useState } from "react";
import { Form, Modal } from "@patternfly/react-core";
import { PrincipalType } from "../types";

const account = [
  {
    id: "id",
    displayName: "ServiceAccount",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id5",
    displayName: "ServiceAccount5",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id2",
    displayName: "ServiceAccount2",
    principalType: PrincipalType.ServiceAccount,
  },
  {
    id: "id3",
    displayName: "UserAccount3",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id4",
    displayName: "UserAccount4",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id6",
    displayName: "UserAccount6",
    principalType: PrincipalType.UserAccount,
  },
  {
    id: "id7",
    displayName: "ServiceAccount7",
    principalType: PrincipalType.ServiceAccount,
  },
];

export default {
  component: SelectAccount,
  args: { accounts: account, id: undefined },
} as ComponentMeta<typeof SelectAccount>;

const Template: ComponentStory<typeof SelectAccount> = (args) => (
  <Form>
    <SelectAccount {...args} />
  </Form>
);

export const InteractiveExample: ComponentStory<typeof SelectAccount> = (
  args
) => {
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    undefined
  );
  return (
    <Form>
      <SelectAccount
        {...args}
        value={selectedAccount}
        onClearSelection={() => setSelectedAccount(undefined)}
        onSelectServiceAccount={setSelectedAccount}
        onSelectUser={setSelectedAccount}
        onSelectWildcard={() => setSelectedAccount('*')}
        onTypeUsername={setSelectedAccount}
        accounts={account}
      />
    </Form>
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

export const CanExpandOverDialog: ComponentStory<typeof SelectAccount> = (
  args,
  { id }
) => {
  return (
    <Modal
      title="Simple modal header"
      isOpen={true}
      appendTo={() => document.getElementById(id) || document.body}
      disableFocusTrap={true}
    >
      <Template {...args} />
    </Modal>
  );
};
CanExpandOverDialog.args = {
  initialOpen: true,
};
CanExpandOverDialog.parameters = {
  docs: {
    description: {
      story: `When the select is the last element of a dialog, it should fully expand outside its borders`,
    },
  },
};

export const ValidSelection = Template.bind({});
ValidSelection.args = { value: "id2" };

ValidSelection.parameters = {
  docs: {
    description: {
      story: `Valid value is selected`,
    },
  },
};
