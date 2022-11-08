import { fakeApi } from "../../shared/storiesHelpers";
import { makeGrowingMetrics, makeMetrics } from "./makeMetrics";
import type {
  DurationOptions,
  GetKafkaInstanceMetricsResponse,
  GetMetricsKpiResponse,
  GetTopicsMetricsResponse,
} from "./types";

export const getKafkaInstanceMetrics = ({
  duration,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  offset?: number;
  waitLengthMs?: number;
}) => {
  return fakeApi<GetKafkaInstanceMetricsResponse>(
    {
      brokers: ["broker 1", "broker 2"],
      usedDiskSpaceMetrics: {
        total: makeMetrics(duration, 500, 999, 10 ** 9),
        "broker 1": makeMetrics(duration, 200, 999, 10 ** 9),
        "broker 2": makeMetrics(duration, 100, 999, 10 ** 9),
      },
      bytesPerPartitionMetrics: {
        p1: makeMetrics(duration, 0, 2, 10 ** 7),
        p2: makeMetrics(duration, 0, 4, 10 ** 7),
        p3: makeMetrics(duration, 0, 6, 10 ** 7),
        p4: makeMetrics(duration, 0, 3, 10 ** 7),
        p5: makeMetrics(duration, 0, 1, 10 ** 7),
        p6: makeMetrics(duration, 0, 14, 10 ** 7),
        p7: makeMetrics(duration, 0, 6, 10 ** 7),
        p8: makeMetrics(duration, 0, 12, 10 ** 7),
        p9: makeMetrics(duration, 0, 10, 10 ** 7),
        p10: makeMetrics(duration, 0, 8, 10 ** 7),
        p11: makeMetrics(duration, 0, 8, 10 ** 7),
      },
      clientConnectionsMetrics: makeMetrics(duration, 0, 100, 1, offset),
      connectionAttemptRateMetrics: makeMetrics(duration, 0, 100, 1, offset),
      connectionsLimit: 100,
      diskSpaceLimit: 1000,
      connectionRateLimit: 50,
    },
    waitLengthMs
  );
};

export const getMetricsKpi = ({
  waitLengthMs,
}: { waitLengthMs?: number } = {}) => {
  return fakeApi<GetMetricsKpiResponse>(
    {
      topics: 3,
      topicPartitions: 6,
      consumerGroups: 12,
      topicPartitionsLimit: 1000,
    },
    waitLengthMs
  );
};

export const getTopicsMetrics = ({
  duration,
  selectedTopic,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  selectedTopic?: string;
  offset?: number;
  waitLengthMs?: number;
}) => {
  return fakeApi<GetTopicsMetricsResponse>(
    {
      kafkaTopics: ["lorem", "dolor", "ipsum"],
      metricsTopics: ["lorem", "dolor", "ipsum", "sit"],
      bytesIncoming: makeGrowingMetrics(
        duration,
        0,
        9,
        10 ** 7,
        10 ** 4,
        offset
      ),
      bytesOutgoing: makeGrowingMetrics(
        duration,
        3,
        8,
        10 ** 7,
        10 ** 4,
        offset
      ),
      incomingMessageRate: makeMetrics(duration, 3, 8, 10, offset),
      bytesPerPartition: selectedTopic
        ? {
            "partition 1": makeMetrics(duration, 0, 2, 10 ** 7, offset),
            "partition 2": makeMetrics(duration, 0, 4, 10 ** 7, offset),
            "partition 3": makeMetrics(duration, 0, 6, 10 ** 7, offset),
          }
        : {},
    },
    waitLengthMs
  );
};

export const getTopicsMetricsWithDeletedTopicMetric = ({
  duration,
  selectedTopic,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  selectedTopic?: string;
  offset?: number;
  waitLengthMs?: number;
}) => {
  const hasMetrics =
    selectedTopic === undefined ||
    selectedTopic !== "topic deleted in the past" ||
    (selectedTopic === "topic deleted in the past" && duration > 60);
  return fakeApi<GetTopicsMetricsResponse>(
    {
      kafkaTopics: ["lorem", "dolor", "ipsum"],
      metricsTopics:
        duration <= 60
          ? ["lorem", "dolor", "ipsum"]
          : ["lorem", "dolor", "ipsum", "topic deleted in the past"],
      bytesIncoming: hasMetrics
        ? makeGrowingMetrics(duration, 0, 9, 10 ** 7, 10 ** 4, offset)
        : {},
      bytesOutgoing: hasMetrics
        ? makeGrowingMetrics(duration, 3, 8, 10 ** 7, 10 ** 4, offset)
        : {},
      incomingMessageRate: hasMetrics
        ? makeMetrics(duration, 3, 8, 10, offset)
        : {},
      bytesPerPartition: hasMetrics
        ? {
            total: makeMetrics(duration, 0, 2, 10 ** 7, offset),
            "partition 1": makeMetrics(duration, 0, 2, 10 ** 7, offset),
            "partition 2": makeMetrics(duration, 0, 4, 10 ** 7, offset),
            "partition 3": makeMetrics(duration, 0, 6, 10 ** 7, offset),
          }
        : {},
    },
    waitLengthMs
  );
};

export const getTopicsMetricsOneTopic = ({
  duration,
  offset,
  waitLengthMs,
}: {
  duration: DurationOptions;
  offset?: number;
  waitLengthMs?: number;
}) => {
  return fakeApi<GetTopicsMetricsResponse>(
    {
      kafkaTopics: ["lorem"],
      metricsTopics: ["lorem"],
      bytesIncoming: makeGrowingMetrics(
        duration,
        0,
        9,
        10 ** 7,
        10 ** 4,
        offset
      ),
      bytesOutgoing: makeGrowingMetrics(
        duration,
        3,
        8,
        10 ** 7,
        10 ** 4,
        offset
      ),
      incomingMessageRate: makeMetrics(duration, 3, 8, 10, offset),
      bytesPerPartition: {
        "partition 1": makeMetrics(duration, 0, 2, 10 ** 7, offset),
        "partition 2": makeMetrics(duration, 0, 4, 10 ** 7, offset),
        "partition 3": makeMetrics(duration, 0, 6, 10 ** 7, offset),
      },
    },
    waitLengthMs
  );
};
