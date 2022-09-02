import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { fakeApi } from "../../../shared/storiesHelpers";
import { CreateTopicPage } from "./CreateTopicPage";
import { constantValues } from "./storiesHelpers";

export default {
  component: CreateTopicPage,
  args: {
    kafkaName: "kafka-name",
    kafkaPageLink: "kafka-link",
    kafkaInstanceLink: "kafka-instance-link",
    availablePartitionLimit: 10,
    checkTopicName: (topicName) =>
      fakeApi<boolean>(
        !["test", "my-test", "test-topic"].some((m) => m == topicName)
      ),
    initialTopicValues: {
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
  },
} as ComponentMeta<typeof CreateTopicPage>;

const Template: ComponentStory<typeof CreateTopicPage> = (args) => (
  <>
    <CreateTopicPage {...args} />
  </>
);

export const TopicCreation = Template.bind({});
TopicCreation.args = {};
TopicCreation.parameters = {
  docs: {
    description: {
      story: ` A user can create a topic with the basic or advanced work flow. This story provides validation errors when topic name is invalid. We also get a warning modal in case the user exceeds the available partition limit `,
    },
  },
};
