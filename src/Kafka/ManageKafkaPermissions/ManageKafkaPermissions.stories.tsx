import { ManageKafkaPermissions } from "./ManageKafkaPermissions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrincipalType } from "./types";
import { useState } from "react";
import {
  PermissionsForAllAccounts,
  PermissionsForSelectedAccount,
} from "./components/ReviewPermissionsTable.stories";
export default {
  component: ManageKafkaPermissions,
  args: {
    topicNameOptions: (filter: string) => {
      return ["foo", "bar", "baz", `random ${Math.random()}`].filter((v) =>
        v.includes(filter)
      );
    },
    consumerGroupNameOptions: (filter: string) => {
      return ["foo", "bar", "baz", `random ${Math.random()}`].filter((v) =>
        v.includes(filter)
      );
    },

    accounts: [
      {
        id: "id",
        displayName: "4e-if-pqhi",
        principalType: PrincipalType.ServiceAccount,
      },
      {
        id: "test",
        displayName: "sakl-uow-iu-twe",
        principalType: PrincipalType.ServiceAccount,
      },
      {
        id: "qe-account",
        displayName: "efja-2372-sadh",
        principalType: PrincipalType.ServiceAccount,
      },
      {
        id: "ui-testing",
        displayName: "iaefh-6s-y6",
        principalType: PrincipalType.UserAccount,
      },
      {
        id: "suyash-ua",
        displayName: "reod-86e-6u9o",
        principalType: PrincipalType.UserAccount,
      },
      {
        id: "foo-ua",
        displayName: "81-pou-65f",
        principalType: PrincipalType.UserAccount,
      },
      {
        id: "bar-sa",
        displayName: "sa90-4ktvf-posu",
        principalType: PrincipalType.ServiceAccount,
      },
      {
        id: "id2",
        displayName: "displayName2",
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
  const [isAclDeleted, setIsAclDeleted] = useState<boolean>(false);

  const onRemoveAcls = () => {
    setIsAclDeleted(true);
  };

  return (
    <ManageKafkaPermissions
      {...args}
      isAclDeleted={isAclDeleted}
      selectedAccount={selectedAccount}
      onRemoveAcls={onRemoveAcls}
      onChangeSelectedAccount={setSelectedAccount}
      existingAcls={
        selectedAccount == "*"
          ? PermissionsForAllAccounts
          : PermissionsForSelectedAccount
      }
    />
  );
};
