import { ComponentMeta, ComponentStory } from "@storybook/react";
import { apiError, fakeApi } from "../../shared/storiesHelpers";
import { makeGrowingMetrics, makeMetrics } from "./makeMetrics";
import { Metrics } from "./Metrics";
import {
  getKafkaInstanceMetrics,
  getMetricsKpi,
  getTopicsMetrics,
  getTopicsMetricsOneTopic,
  getTopicsMetricsWithDeletedTopicMetric,
} from "./storiesHelpers";
import {
  GetKafkaInstanceMetricsResponse,
  GetMetricsKpiResponse,
  GetTopicsMetricsResponse,
} from "./types";

export default {
  component: Metrics,
  args: {},
  parameters: {
    previewHeight: 1600,
    // this option is passed to the devTools instance to use a different inspector
    chromatic: { disableSnapshot: true },
    docs: {},
  },
  excludeStories: /makeMetrics/,
} as ComponentMeta<typeof Metrics>;

const Template: ComponentStory<typeof Metrics> = (args, { parameters }) => (
  <div style={{ height: parameters.previewHeight }}>
    <Metrics {...args} />
  </div>
);

export const AllReady = Template.bind({});
AllReady.args = {
  getMetricsKpi,
  getKafkaInstanceMetrics,
  getTopicsMetrics,
};
AllReady.storyName = "Kafka and topics exist and are in use";

export const JustCreated = Template.bind({});
JustCreated.args = {
  getMetricsKpi: () =>
    fakeApi<GetMetricsKpiResponse>({} as GetMetricsKpiResponse, 300),
  getKafkaInstanceMetrics: () =>
    fakeApi(
      {
        usedDiskSpaceMetrics: {},
        clientConnectionsMetrics: {},
        connectionAttemptRateMetrics: {},
        connectionsLimit: 100,
        diskSpaceLimit: 1000,
        connectionRateLimit: 50,
      },
      700
    ),
  getTopicsMetrics: () =>
    fakeApi(
      {
        kafkaTopics: [],
        metricsTopics: [],
        bytesIncoming: {},
        bytesOutgoing: {},
        incomingMessageRate: {},
        bytesPerPartition: {},
      },
      2500
    ),
};
JustCreated.storyName = "Kafka just created";
JustCreated.parameters = {
  previewHeight: 200,
  docs: {
    description: {
      story: `
When all APIs respond with a code \`200\` but will not contain any metric, we
will show an empty state that suggest to wait for the monitoring instance to be ready.

A spinner is shown until all APIs respond, to avoid showing the empty states for
the specific APIs (described down here).
      `,
    },
  },
};

export const AllApiError = Template.bind({});
AllApiError.args = {
  getMetricsKpi: () => apiError<GetMetricsKpiResponse>(),
  getKafkaInstanceMetrics: () => apiError<GetKafkaInstanceMetricsResponse>(),
  getTopicsMetrics: () => apiError<GetTopicsMetricsResponse>(),
};
AllApiError.parameters = {
  previewHeight: 200,
  docs: {
    description: {
      story: `
When all APIs fail (return code different than \`200\`) we will show an empty
state that suggest to wait for the monitoring instance to be ready.

From our tests, this scenario will likely never happen since all APIs will
respond with a code 200 but will not provide any metric.
      `,
    },
  },
};

export const KafkaInstanceApiError = Template.bind({});
KafkaInstanceApiError.args = {
  getMetricsKpi,
  getKafkaInstanceMetrics: () => apiError<GetKafkaInstanceMetricsResponse>(),
  getTopicsMetrics,
};
KafkaInstanceApiError.parameters = {
  docs: {
    description: {
      story: `
If the API that returns the data for the Kafka instance metrics fails, the _No metrics data_
empty state is shown inside the card.

The toolbar is disabled, but the refresh button can be clicked.
      `,
    },
  },
};

export const TopicsApiError = Template.bind({});
TopicsApiError.args = {
  getMetricsKpi,
  getKafkaInstanceMetrics,
  getTopicsMetrics: () => apiError<GetTopicsMetricsResponse>(),
};
TopicsApiError.parameters = {};
TopicsApiError.parameters = {
  docs: {
    description: {
      story: `
If the API that returns the data for the Topic metrics fails, the _No metrics data_
empty state is shown inside the card.

The toolbar is disabled, but the refresh button can be clicked.
      `,
    },
  },
};

export const KpiApiError = Template.bind({});
KpiApiError.args = {
  getMetricsKpi: () => apiError<GetMetricsKpiResponse>(),
  getKafkaInstanceMetrics,
  getTopicsMetrics,
};
KpiApiError.parameters = {
  docs: {
    description: {
      story: `
If the API that returns the data for the Metrics KPIs fails, the _No metrics data_
empty state is shown inside each KPI card.
      `,
    },
  },
};

export const NoTopics = Template.bind({});
NoTopics.args = {
  getMetricsKpi: () =>
    fakeApi({
      topics: 0,
      topicPartitions: 0,
      consumerGroups: 0,
      topicPartitionsLimit: 1000,
    }),
  getKafkaInstanceMetrics,
  getTopicsMetrics: () =>
    fakeApi({
      kafkaTopics: [],
      metricsTopics: [],
      bytesIncoming: {},
      bytesOutgoing: {},
      incomingMessageRate: {},
      bytesPerPartition: {},
    }),
};
NoTopics.storyName = "Kafka exists but no topics created";
NoTopics.parameters = {
  docs: {
    description: {
      story: `
When a Kafka instance exists but no topic has been created yet, the Topic metrics
card will show an empty state to suggest creating a topic to start seeing data.
A call to action button to create a topic is provided.

The toolbar is disabled, but the refresh button can be clicked.
      `,
    },
  },
};

export const TopicsJustCreated = Template.bind({});
TopicsJustCreated.args = {
  getMetricsKpi: () =>
    fakeApi({
      topics: 1,
      topicPartitions: 3,
      consumerGroups: 0,
      topicPartitionsLimit: 1000,
    }),
  getKafkaInstanceMetrics,
  getTopicsMetrics: () =>
    fakeApi({
      kafkaTopics: ["lorem"],
      metricsTopics: [],
      bytesIncoming: {},
      bytesOutgoing: {},
      incomingMessageRate: {},
      bytesPerPartition: {},
    }),
};
TopicsJustCreated.storyName = "Topics just created (no metrics)";
TopicsJustCreated.parameters = {
  docs: {
    description: {
      story: `
When a Kafka instance exists and at least a topic has been created but no metrics
are available for the topics, the topic has not been yet been used. We will show
an empty state that suggest to wait for the monitoring instance to be ready.

The toolbar is disabled, but the refresh button can be clicked.
      `,
    },
  },
};

export const TopicsRecentlyCreated = Template.bind({});
TopicsRecentlyCreated.args = {
  getMetricsKpi: () =>
    fakeApi({
      topics: 1,
      topicPartitions: 6,
      consumerGroups: 0,
      topicPartitionsLimit: 1000,
    }),
  getKafkaInstanceMetrics: (props) =>
    getKafkaInstanceMetrics({ ...props, offset: 3 }),
  getTopicsMetrics: (props) =>
    getTopicsMetricsOneTopic({ ...props, offset: 3 }),
};
TopicsRecentlyCreated.storyName = "Topics recently created (partial metrics)";
TopicsRecentlyCreated.parameters = {
  docs: {
    description: {
      story: `
All data is available and all elements are interactable. The charts will show
partial data.
      `,
    },
  },
};

export const DeletedTopicWithMetricInThePast = Template.bind({});
DeletedTopicWithMetricInThePast.args = {
  getMetricsKpi,
  getKafkaInstanceMetrics,
  getTopicsMetrics: getTopicsMetricsWithDeletedTopicMetric,
};
DeletedTopicWithMetricInThePast.storyName =
  "I deleted the topic that is selected for the selected time period";
DeletedTopicWithMetricInThePast.parameters = {
  docs: {
    description: {
      story: `
Precondition: I deleted a topic named "topic deleted in the past" 2 hours ago.

1. I can't see the deleted topic for time ranges "Last 1 hour" and under.
1. I select "Last 3 hours" in the Topic metrics's time selector
1. I select "topic deleted in the past" in the Topic metrics's topic filter, and see earlier data before I deleted it
1. I select a time range of 1 hour.
1. I see an empty state that suggest adjusting my filters and try again
        `,
    },
  },
};

export const SomeMissingMetricsButApiOk = Template.bind({});
SomeMissingMetricsButApiOk.args = {
  getMetricsKpi,
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 500, 999, 10 ** 9),
      clientConnectionsMetrics: {},
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1),
      connectionsLimit: 100,
      diskSpaceLimit: 1000,
      connectionRateLimit: 50,
    }),
  getTopicsMetrics: ({ duration }) =>
    fakeApi({
      kafkaTopics: ["lorem"],
      metricsTopics: ["lorem"],
      bytesIncoming: makeGrowingMetrics(duration, 0, 9, 10 ** 7, 10 ** 4),
      bytesOutgoing: makeGrowingMetrics(duration, 3, 8, 10 ** 7, 10 ** 4),
      incomingMessageRate: {},
      bytesPerPartition: {
        "lorem partition 1": makeMetrics(duration, 0, 2, 10 ** 7),
        "lorem partition 2": makeMetrics(duration, 0, 4, 10 ** 7),
        "lorem partition 3": makeMetrics(duration, 0, 6, 10 ** 7),
      },
    }),
};
SomeMissingMetricsButApiOk.storyName =
  "Missing some metrics but API did respond";
SomeMissingMetricsButApiOk.parameters = {
  docs: {
    description: {
      story: `
In case the APIs are working ok but some metrics are missing from the system, a
_Data unavailable_ empty state is shown in place of the charts with missing
      `,
    },
  },
};

export const LimitsReached = Template.bind({});
LimitsReached.args = {
  getMetricsKpi: () =>
    fakeApi({
      topics: 1,
      topicPartitions: 1001,
      consumerGroups: 0,
      topicPartitionsLimit: 1000,
    }),
  getKafkaInstanceMetrics: ({ duration }) =>
    fakeApi({
      usedDiskSpaceMetrics: makeMetrics(duration, 900, 1100, 10 ** 9),
      clientConnectionsMetrics: makeMetrics(duration, 60, 170, 1),
      connectionAttemptRateMetrics: makeMetrics(duration, 4, 130, 1),
      connectionsLimit: 100,
      diskSpaceLimit: 100,
      connectionRateLimit: 50,
    }),
  getTopicsMetrics: getTopicsMetricsOneTopic,
};
LimitsReached.storyName = "Limits have been reached ";
LimitsReached.parameters = {
  docs: {
    description: {
      story: `
Sample data that show the charts with data over the limits.
      `,
    },
  },
};

export const TopicPartitionCardNearToLimit = Template.bind({});
TopicPartitionCardNearToLimit.args = {
  getMetricsKpi: () =>
    fakeApi({
      topics: 1,
      topicPartitions: 960,
      consumerGroups: 0,
      topicPartitionsLimit: 1000,
    }),
  getKafkaInstanceMetrics: (props) =>
    getKafkaInstanceMetrics({ ...props, offset: 3 }),
  getTopicsMetrics: (props) =>
    getTopicsMetricsOneTopic({ ...props, offset: 3 }),
};
TopicPartitionCardNearToLimit.storyName =
  "Topics Partition count near to the limit";
TopicPartitionCardNearToLimit.parameters = {
  docs: {
    description: {
      story: `
When the Topics partition count is near to the limit
      `,
    },
  },
};

// TODO: story disabled since testing this in Storybook is too flaky. We should write a unit test for this instead
// export const KafkaInstanceToolbarStaysEnabled = Template.bind({});
// KafkaInstanceToolbarStaysEnabled.parameters = {};
// KafkaInstanceToolbarStaysEnabled.args = {
//   getMetricsKpi,
//   getKafkaInstanceMetrics: ({ duration }) =>
//     // simulate no data past the 12h mark
//     duration > DurationOptions.Last12hours
//       ? fakeApi({
//           usedDiskSpaceMetrics: {},
//           clientConnectionsMetrics: {},
//           connectionAttemptRateMetrics: {},
//         })
//       : fakeApi({
//           usedDiskSpaceMetrics: makeMetrics(duration, 900, 1100, 10 ** 9),
//           clientConnectionsMetrics: makeMetrics(duration, 60, 170, 1),
//           connectionAttemptRateMetrics: makeMetrics(duration, 4, 130, 1),
//         }),
//   getTopicsMetrics: ({ duration, selectedTopic }) =>
//     // simulate no data past the 12h mark
//     duration > DurationOptions.Last12hours
//       ? fakeApi({
//           kafkaTopics: ["lorem", "dolor", "ipsum"],
//           metricsTopics: [],
//           bytesIncoming: {},
//           bytesOutgoing: {},
//           incomingMessageRate: {},
//           bytesPerPartition: {},
//         })
//       : getTopicsMetrics({ duration, selectedTopic }),
// };
// KafkaInstanceToolbarStaysEnabled.storyName =
//   "Toolbars stay enabled after the user has interacted with them";
// KafkaInstanceToolbarStaysEnabled.play = async ({ canvasElement }) => {
//   async function testKafkaInstance() {
//     const card = within(
//       await findByTestId(canvasElement, "metrics-kafka-instance")
//     );
//     const setDuration = async (duration: string) => {
//       const timeSelector = await card.findByLabelText(
//         "Filter Kafka instance metrics by time range"
//       );
//       fireEvent.click(timeSelector);
//       fireEvent.click(await card.findByText(duration));
//     };
//
//     const expectTextCount = async (label: string, count = 3) => {
//       const timeAxisValues = await card.findAllByText(label);
//       await expect(timeAxisValues).toHaveLength(count);
//     };
//
//     // default is last 1 hour
//     await expectTextCount("09:55");
//
//     // select last 5 minutes
//     await setDuration("Last 5 minutes");
//     await expectTextCount("10:41");
//
//     // select last 24 hours
//     await setDuration("Last 24 hours");
//     await expectTextCount("Data unavailable");
//
//     // select last 12 hours
//     await setDuration("Last 12 hours");
//     await expectTextCount("00:45");
//   }
//   async function testTopicMetrics() {
//     const card = within(await findByTestId(canvasElement, "metrics-topics"));
//
//     const setTopic = async (topic: string) => {
//       const topicSelector = await card.findByLabelText(
//         "Filter topic metrics by topic name"
//       );
//       fireEvent.click(topicSelector);
//       fireEvent.click(await card.findByText(topic));
//     };
//
//     const setDuration = async (duration: string) => {
//       const timeSelector = await card.findByLabelText(
//         "Filter topic metrics by time range"
//       );
//       fireEvent.click(timeSelector);
//       fireEvent.click(await card.findByText(duration));
//     };
//
//     const expectTextCount = async (label: string, count = 2) => {
//       const timeAxisValues = await card.findAllByText(label, { exact: false });
//       await expect(timeAxisValues).toHaveLength(count);
//     };
//
//     await expectTextCount("Filter by Topic", 1);
//
//     // default is last 1 hour
//     await expectTextCount("09:55");
//
//     // select last 5 minutes
//     await setDuration("Last 5 minutes");
//     await expectTextCount("10:41");
//
//     // select last 24 hours
//     await setDuration("Last 24 hours");
//     await expectTextCount("Data unavailable");
//
//     // select last 12 hours
//     await setDuration("Last 12 hours");
//     await expectTextCount("00:45");
//
//     // select topic
//     await setTopic("dolor");
//     await expectTextCount("dolor: partition", 3);
//   }
//   await testKafkaInstance();
//   await testTopicMetrics();
// };
// KafkaInstanceToolbarStaysEnabled.parameters = {
//   docs: {
//     description: {
//       story: `
// If the user asks for data too in the past for a recently created instance, the
// API will return no data. The charts will show the _No metrics data_ empty state
// and the toolbar will stay enabled.
//
// In this demo, all data past the last 12 hours will be empty.
//       `,
//     },
//   },
// };
