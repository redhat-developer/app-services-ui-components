import {
  CardTopicsMetrics,
  EmptyStateInitialLoading,
  EmptyStateMetricsUnavailable,
} from "./components";
import React, { FunctionComponent } from "react";
import { MetricsLayout } from "./components";
import { CardUsedDiskSpace } from "./components/CardUsedDiskSpace";
import {
  KafkaInstanceMetricsProvider,
  KafkaInstanceMetricsProviderProps,
} from "./KafkaInstanceMetricsProvider";
import { useKafkaInstanceMetrics } from "./useKafkaInstanceMetrics";
import { useTopicsMetrics } from "./useTopicsMetrics";
import {
  TopicsMetricsProvider,
  TopicsMetricsProviderProps,
} from "./TopicsMetricsProvider";

export type MetricsProps = {
  onCreateTopic: () => void;
} & KafkaInstanceMetricsProviderProps &
  TopicsMetricsProviderProps;

export const Metrics: FunctionComponent<MetricsProps> = ({
  getKafkaInstanceMetrics,
  getTopicsMetrics,
  onCreateTopic,
}) => {
  return (
    <TopicsMetricsProvider getTopicsMetrics={getTopicsMetrics}>
      <KafkaInstanceMetricsProvider
        getKafkaInstanceMetrics={getKafkaInstanceMetrics}
      >
        <ConnectedMetrics onCreateTopic={onCreateTopic} />
      </KafkaInstanceMetricsProvider>
    </TopicsMetricsProvider>
  );
};

type ConnectedMetricsProps = {
  onCreateTopic: () => void;
};
const ConnectedMetrics: FunctionComponent<ConnectedMetricsProps> = ({
  onCreateTopic,
}) => {
  const { isLoading, isFailed } = useKafkaInstanceMetrics();

  switch (true) {
    case isLoading:
      return <EmptyStateInitialLoading />;
    case isFailed:
      return <EmptyStateMetricsUnavailable />;
  }
  return (
    <MetricsLayout
      diskSpaceMetrics={<ConnectedDiskMetrics />}
      topicMetrics={<ConnectedTopicsMetrics onCreateTopic={onCreateTopic} />}
    />
  );
};

const ConnectedDiskMetrics: FunctionComponent = () => {
  const {
    isLoading,
    isRefreshing,
    isDataUnavailable,
    isFailed,
    duration,
    usedDiskSpaceMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    onDurationChange,
    onRefresh,
  } = useKafkaInstanceMetrics();

  return (
    <CardUsedDiskSpace
      usedDiskMetrics={usedDiskSpaceMetrics}
      clientConnectionsMetrics={clientConnectionsMetrics}
      connectionAttemptRateMetrics={connectionAttemptRateMetrics}
      duration={duration}
      metricsDataUnavailable={isDataUnavailable || isFailed}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      onRefresh={onRefresh}
      onDurationChange={onDurationChange}
    />
  );
};

type ConnectedTopicsMetricsProps = {
  onCreateTopic: () => void;
};
const ConnectedTopicsMetrics: FunctionComponent<ConnectedTopicsMetricsProps> = ({
  onCreateTopic,
}) => {
  const {
    isLoading,
    isRefreshing,
    isFailed,
    isDataUnavailable,
    selectedTopic,
    duration,
    topics,
    bytesIncoming,
    bytesOutgoing,
    bytesPerPartition,
    incomingMessageRate,
    onDurationChange,
    onTopicChange,
    onRefresh,
  } = useTopicsMetrics();

  return (
    <CardTopicsMetrics
      backendUnavailable={isFailed}
      metricsDataUnavailable={isDataUnavailable}
      topics={topics}
      incomingTopicsData={bytesIncoming}
      outgoingTopicsData={bytesOutgoing}
      partitions={bytesPerPartition}
      incomingMessageRate={incomingMessageRate}
      duration={duration}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      selectedTopic={selectedTopic}
      onRefresh={onRefresh}
      onSelectedTopic={onTopicChange}
      onDurationChange={onDurationChange}
      onCreateTopic={onCreateTopic}
    />
  );
};
