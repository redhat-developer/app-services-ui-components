import {
  ManagePermissionsModal,
  Principal,
  PrincipalType,
} from "./ManagePermissionsModal";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import React, { useState } from "react";
import { Validated } from "./SelectAccount";
import { SelectOptionObject } from "@patternfly/react-core";

const principal: Principal[] = [
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
    id: "id5",
    displayName: "displayName5",
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
  component: ManagePermissionsModal,
  args: {
    principal: principal,
    selectedAccount: { value: "", validated: undefined },
    kafkaName: "name-test",
  },
} as ComponentMeta<typeof ManagePermissionsModal>;

const Template: ComponentStory<typeof ManagePermissionsModal> = (args) => (
  <ManagePermissionsModal {...args} />
);

export const InteractiveExample: ComponentStory<
  typeof ManagePermissionsModal
> = () => {
  const [selectedAccount, setSelectedAccount] = useState<
    Validated<string | undefined | SelectOptionObject>
  >({ value: "", validated: undefined });
  return (
    <ManagePermissionsModal
      selectedAccount={selectedAccount}
      onChangeAccount={setSelectedAccount}
      principal={principal}
      hideModal={() => ({})}
      kafkaName={"name-test"}
    />
  );
};
InteractiveExample.parameters = {
  docs: {
    description: {
      story: `A user can select a valid account. The next button stays disabled unless a valid input is selected. On selecting a valid input, a user can clear their selection by clicking the clear all button. This gives the user a validation error, letting him know that the field is a required field`,
    },
  },
};
export const EmptyState = Template.bind({});
EmptyState.args = {};
EmptyState.parameters = {
  docs: {
    description: {
      story: `A user can select any value he wishes and it will be logged into the onChangeAccount state`,
    },
  },
};

/*
export const ValidSelection = Template.bind({});
ValidSelection.args = {
  selectedAccount: { value: "id2", validated: undefined },
};
//ValidSelection.play = async () => {
  ValidSelection.play = async ({ canvasElement }) => {
    const story = within(canvasElement);
  await userEvent.click(await story.findByLabelText("Select an account"));
  await userEvent.click(await story.findByText("id2"));
};

export const ClearSelection = Template.bind({});
ClearSelection.args = {
  selectedAccount: {
    value: "",
    validated: ValidatedOptions.error,
    errorMessage: "Required",
  },
};
ClearSelection.play = async () => {
  await userEvent.click(await screen.findByLabelText("Select an account"));
  await userEvent.click(await screen.findByText("id2"));
  await userEvent.click(
    await screen.findByRole("button", { name: "Clear all" })
  );
};
*/

export const NoServiceOrUserAccounts = Template.bind({});
NoServiceOrUserAccounts.args = { principal: [] };
NoServiceOrUserAccounts.parameters = {
  docs: {
    description: {
      story: `No accounts available to be selected.`,
    },
  },
};

export const OnlyServiceAccounts = Template.bind({});
OnlyServiceAccounts.args = {
  principal: [
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
  principal: [
    {
      id: "id6",
      displayName: "displayName",
      principalType: PrincipalType.UserAccount,
    },
    {
      id: "id5",
      displayName: "displayName5",
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
