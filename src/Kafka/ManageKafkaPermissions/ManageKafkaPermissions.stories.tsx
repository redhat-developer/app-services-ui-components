import { ManageKafkaPermissions } from "./ManageKafkaPermissions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrincipalType } from "./types";
import { useState } from "react";
import {
  PermissionsForAllAccounts,
  PermissionsForSelectedAccount,
} from "./components/ReviewPermissionsTable.stories";
import { fakeApi } from "../../shared/storiesHelpers";

export default {
  component: ManageKafkaPermissions,
  args: {
    resourceNameOptions: (filter) =>
      fakeApi<string[]>(
        ["foo", "bar", "baz", `random ${Math.random()}`].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    fetchConsumeTopicShortcutResourceName: (filter) =>
      fakeApi<string[]>(
        ["foo", "bar", "baz", `random ${Math.random()}`].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    onFetchConsumeTopicShortcutTopicResourceNameOptions: (filter) =>
      fakeApi<string[]>(
        ["foo", "bar", "baz", `random ${Math.random()}`].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    onFetchProduceTopicShortcutResourceNameOptions: (filter) =>
      fakeApi<string[]>(
        ["foo", "bar", "baz", `random ${Math.random()}`].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
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
    ],
    kafkaName: "name-test",
    selectedAcount: "",
  },
} as ComponentMeta<typeof ManageKafkaPermissions>;

export const InteractiveExample: ComponentStory<
  typeof ManageKafkaPermissions
> = (args) => {
  const [selectedAccount, setSelectedAccount] = useState<string | undefined>(
    undefined
  );

  return (
    <ManageKafkaPermissions
      {...args}
      selectedAccount={selectedAccount}
      onChangeSelectedAccount={setSelectedAccount}
      existingAcls={
        selectedAccount == "*"
          ? PermissionsForAllAccounts
          : PermissionsForSelectedAccount
      }
    />
  );
};
