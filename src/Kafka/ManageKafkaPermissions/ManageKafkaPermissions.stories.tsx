import { ManageKafkaPermissions } from "./ManageKafkaPermissions";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { account } from "./types";

export default {
  component: ManageKafkaPermissions,
  args: {
    accounts: account,
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
