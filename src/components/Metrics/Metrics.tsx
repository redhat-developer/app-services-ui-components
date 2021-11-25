import {
  CardTopicsMetrics,
  EmptyStateInitialLoading,
  EmptyStateMetricsUnavailable,
} from "./components";
import React, { FunctionComponent } from "react";
import { MetricsLayout } from "./components";
import { CardUsedDiskSpace } from "./components/CardUsedDiskSpace";
import { MetricsProvider, MetricsProviderProps } from "./MetricsProvider";
import { useDiskSpace } from "./useDiskSpace";
import { useTopicsMetrics } from "./useTopicsMetrics";

export type MetricsProps = {
  onCreateTopic: () => void;
} & MetricsProviderProps;

export const Metrics: FunctionComponent<MetricsProps> = ({
  getDiskSpaceMetrics,
  getTopicsMetrics,
  onCreateTopic,
}) => {
  return (
    <MetricsProvider
      getDiskSpaceMetrics={getDiskSpaceMetrics}
      getTopicsMetrics={getTopicsMetrics}
    >
      <ConnectedMetrics onCreateTopic={onCreateTopic} />
    </MetricsProvider>
  );
};

type ConnectedMetricsProps = {
  onCreateTopic: () => void;
};
const ConnectedMetrics: FunctionComponent<ConnectedMetricsProps> = ({
  onCreateTopic,
}) => {
  const { isLoading, isFailed } = useDiskSpace();

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
    connectionAttemptRateMetrics,
    onDurationChange,
    onRefresh,
  } = useDiskSpace();

  return (
    <CardUsedDiskSpace
      usedDiskMetrics={usedDiskSpaceMetrics}
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
