import { ManageKafkaPermissions } from "./ManageKafkaPermissions";
import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { PrincipalType } from "./types";

export default {
  component: ManageKafkaPermissions,
  args: {
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
  },
} as ComponentMeta<typeof ManageKafkaPermissions>;

const Template: ComponentStory<typeof ManageKafkaPermissions> = (args) => (
  <ManageKafkaPermissions {...args} />
);
export const EmptyState = Template.bind({});
EmptyState.args = {};
EmptyState.parameters = {
  docs: {
    description: {
      story: `A user can select any value he wishes and it will be logged into the onChangeAccount state`,
    },
  },
};
