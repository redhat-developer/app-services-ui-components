import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { CreateTopicWizard } from "./CreateTopicWizard";
import { constantValues } from "./storiesHelpers";

export default {
  component: CreateTopicWizard,
  args: {
    isSwitchChecked: true,
    initialFieldsValue: {
      name: "",
      numPartitions: 1,
      replicationFactor: 1,
      retentionTime: 1,
      retentionTimeUnit: "weeks",
      retentionBytes: 1,
      retentionBytesUnit: "unlimited",
      cleanupPolicy: "delete",
      customRetentionTimeUnit: "days",
      customRetentionSizeUnit: "bytes",
      minInSyncReplica: 1,
      isMultiAZ: false,
    },
    constantValues: constantValues,
    availablePartitionLimit: 10,
  },
} as ComponentMeta<typeof CreateTopicWizard>;

const Template: ComponentStory<typeof CreateTopicWizard> = (args) => (
  <CreateTopicWizard {...args} />
);

export const AdvanceTopic = Template.bind({});
AdvanceTopic.args = {};
AdvanceTopic.parameters = {
  docs: {
    description: {
      story: `A user can create a topic with advance configurations `,
    },
  },
};
