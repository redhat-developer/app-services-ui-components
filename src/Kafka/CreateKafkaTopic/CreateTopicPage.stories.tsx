import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { fakeApi } from "../../shared/storiesHelpers";
import { CreateTopicPage } from "./CreateTopicPage";
import { constantValues } from "./components/storiesHelpers";

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
    isSwitchChecked: false,
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
      story: ` A user can create a topic with the basic work flow. This story provides validation errors when topic name is invalid. We also get a warning modal in case the user exceeds the available partition limit `,
    },
  },
};
export const AdvanceTopicCreation = Template.bind({});
AdvanceTopicCreation.args = { isSwitchChecked: true };
AdvanceTopicCreation.parameters = {
  docs: {
    description: {
      story: ` A user can create a topic with the  advanced work flow. This story provides validation errors when topic name is invalid. We also get a warning modal in case the user exceeds the available partition limit `,
    },
  },
};

export const InvalidTopicName = Template.bind({});
InvalidTopicName.args = {
  initialTopicValues: {
    name: "$!",
    numPartitions: 1,
    replicationFactor: 1,
    retentionTime: 1,
    retentionTimeUnit: "weeks",
    retentionBytes: 1,
    retentionBytesUnit: "bytes",
    cleanupPolicy: "delete",
    customRetentionTimeUnit: "days",
    customRetentionSizeUnit: "bytes",
    minInSyncReplica: 1,
    isMultiAZ: false,
  },
};
InvalidTopicName.parameters = {
  docs: {
    description: {
      story: ` A user entered an invalid topic name `,
    },
  },
};

export const InvalidLength = Template.bind({});
InvalidLength.args = {
  initialTopicValues: {
    name: "..",
    numPartitions: 1,
    replicationFactor: 1,
    retentionTime: 1,
    retentionTimeUnit: "weeks",
    retentionBytes: 1,
    retentionBytesUnit: "bytes",
    cleanupPolicy: "delete",
    customRetentionTimeUnit: "days",
    customRetentionSizeUnit: "bytes",
    minInSyncReplica: 1,
    isMultiAZ: false,
  },
};
InvalidLength.parameters = {
  docs: {
    description: {
      story: ` A user entered an invalid topic name `,
    },
  },
};

export const PartitionLimitReached = Template.bind({});
PartitionLimitReached.args = {
  initialTopicValues: {
    name: "as",
    numPartitions: 12,
    replicationFactor: 1,
    retentionTime: 1,
    retentionTimeUnit: "weeks",
    retentionBytes: 1,
    retentionBytesUnit: "bytes",
    cleanupPolicy: "delete",
    customRetentionTimeUnit: "days",
    customRetentionSizeUnit: "bytes",
    minInSyncReplica: 1,
    isMultiAZ: false,
  },
};
PartitionLimitReached.play = async ({ canvasElement }) => {
  const container = within(canvasElement);
  await userEvent.click(await container.findByText("Next"));
};

PartitionLimitReached.parameters = {
  docs: {
    description: {
      story: ` A user has reached the partitions limit `,
    },
  },
};
