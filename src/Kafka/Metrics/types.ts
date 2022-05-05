import { CardKafkaInstanceMetricsLimits } from "./components";

export type TimeSeriesMetrics = { [timestamp: number]: number };
export type PartitionBytesMetric = { [partition: string]: TimeSeriesMetrics };

export enum DurationOptions {
  Last5minutes = 5,
  Last15minutes = 15,
  Last30minutes = 30,
  Last1hour = 60,
  Last3hours = 3 * 60,
  Last6hours = 6 * 60,
  Last12hours = 12 * 60,
  Last24hours = 24 * 60,
  Last2days = 2 * 24 * 60,
  Last7days = 7 * 24 * 60,
}

export type GetTopicsMetricsResponse = {
  kafkaTopics: string[];
  metricsTopics: string[];
  bytesOutgoing: TimeSeriesMetrics;
  bytesIncoming: TimeSeriesMetrics;
  bytesPerPartition: PartitionBytesMetric;
  incomingMessageRate: TimeSeriesMetrics;
};

export type GetKafkaInstanceMetricsResponse = {
  usedDiskSpaceMetrics: TimeSeriesMetrics;
  clientConnectionsMetrics: TimeSeriesMetrics;
  connectionAttemptRateMetrics: TimeSeriesMetrics;
} & CardKafkaInstanceMetricsLimits;

export type GetMetricsKpiResponse = {
  topics: number;
  topicPartitions: number;
  consumerGroups: number;
};
