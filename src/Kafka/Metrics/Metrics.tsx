import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  CardKafkaInstanceMetrics,
  CardTopicsMetrics,
  EmptyStateInitialLoading,
  EmptyStateMetricsUnavailable,
  MetricsLayout,
} from "./components";
import { CardKpi } from "./components/CardKpi";
import {
  KafkaInstanceMetricsProvider,
  KafkaInstanceMetricsProviderProps,
} from "./KafkaInstanceMetricsProvider";
import {
  MetricsKpiProvider,
  MetricsKpiProviderProps,
} from "./MetricsKpiProvider";
import {
  TopicsMetricsProvider,
  TopicsMetricsProviderProps,
} from "./TopicsMetricsProvider";
import { useKafkaInstanceMetrics } from "./useKafkaInstanceMetrics";
import { useMetricsKpi } from "./useMetricsKpi";
import { useTopicsMetrics } from "./useTopicsMetrics";

export type MetricsProps = {
  onCreateTopic: () => void;
} & KafkaInstanceMetricsProviderProps &
  TopicsMetricsProviderProps &
  MetricsKpiProviderProps;

export const Metrics: VoidFunctionComponent<MetricsProps> = ({
  getKafkaInstanceMetrics,
  getTopicsMetrics,
  getMetricsKpi,
  onCreateTopic,
}) => {
  return (
    <TopicsMetricsProvider getTopicsMetrics={getTopicsMetrics}>
      <KafkaInstanceMetricsProvider
        getKafkaInstanceMetrics={getKafkaInstanceMetrics}
      >
        <MetricsKpiProvider getMetricsKpi={getMetricsKpi}>
          <ConnectedMetrics onCreateTopic={onCreateTopic} />
        </MetricsKpiProvider>
      </KafkaInstanceMetricsProvider>
    </TopicsMetricsProvider>
  );
};

type ConnectedMetricsProps = {
  onCreateTopic: () => void;
};
const ConnectedMetrics: VoidFunctionComponent<ConnectedMetricsProps> = ({
  onCreateTopic,
}) => {
  const { t } = useTranslation();
  const kafkaInstanceMetrics = useKafkaInstanceMetrics();
  const topicsMetrics = useTopicsMetrics();
  const metricsKpi = useMetricsKpi();

  switch (true) {
    case kafkaInstanceMetrics.isInitialLoading ||
      topicsMetrics.isInitialLoading ||
      metricsKpi.isInitialLoading:
      return <EmptyStateInitialLoading />;
    case kafkaInstanceMetrics.isFailed &&
      topicsMetrics.isFailed &&
      topicsMetrics.isFailed:
    case kafkaInstanceMetrics.isJustCreated &&
      topicsMetrics.isJustCreated &&
      metricsKpi.isJustCreated:
      return <EmptyStateMetricsUnavailable />;
    default:
      return (
        <MetricsLayout
          topicsKpi={
            <CardKpi
              metric={metricsKpi.topics}
              isLoading={metricsKpi.isInitialLoading || metricsKpi.isLoading}
              name={t("metrics:metric_kpi_topics_name")}
              popover={t("metrics:metric_kpi_topics_description")}
            />
          }
          topicPartitionsKpi={
            <CardKpi
              metric={metricsKpi.topicPartitions}
              isLoading={metricsKpi.isInitialLoading || metricsKpi.isLoading}
              name={t("metrics:metric_kpi_topicPartitions_name")}
              popover={t("metrics:metric_kpi_topicPartitions_description")}
            />
          }
          consumerGroupKpi={
            <CardKpi
              metric={metricsKpi.consumerGroups}
              isLoading={metricsKpi.isInitialLoading || metricsKpi.isLoading}
              name={t("metrics:metric_kpi_consumerGroup_name")}
              popover={t("metrics:metric_kpi_consumerGroup_description")}
            />
          }
          diskSpaceMetrics={<ConnectedKafkaInstanceMetrics />}
          topicMetrics={
            <ConnectedTopicsMetrics onCreateTopic={onCreateTopic} />
          }
        />
      );
  }
};

const ConnectedKafkaInstanceMetrics: VoidFunctionComponent = () => {
  const {
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    duration,
    lastUpdated,
    usedDiskSpaceMetrics,
    clientConnectionsMetrics,
    connectionAttemptRateMetrics,
    diskSpaceLimit,
    connectionsLimit,
    connectionRateLimit,
    onDurationChange,
    onRefresh,
  } = useKafkaInstanceMetrics();

  return (
    <CardKafkaInstanceMetrics
      usedDiskMetrics={usedDiskSpaceMetrics}
      clientConnectionsMetrics={clientConnectionsMetrics}
      connectionAttemptRateMetrics={connectionAttemptRateMetrics}
      duration={duration}
      backendUnavailable={isFailed}
      isInitialLoading={isInitialLoading}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isJustCreated={isJustCreated}
      lastUpdated={lastUpdated}
      onRefresh={onRefresh}
      onDurationChange={onDurationChange}
      diskSpaceLimit={diskSpaceLimit || 0}
      connectionsLimit={connectionsLimit || 0}
      connectionRateLimit={connectionRateLimit || 0}
    />
  );
};

type ConnectedTopicsMetricsProps = {
  onCreateTopic: () => void;
};
const ConnectedTopicsMetrics: VoidFunctionComponent<
  ConnectedTopicsMetricsProps
> = ({ onCreateTopic }) => {
  const {
    isInitialLoading,
    isLoading,
    isRefreshing,
    isFailed,
    isJustCreated,
    lastUpdated,
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
      topics={topics}
      incomingTopicsData={bytesIncoming}
      outgoingTopicsData={bytesOutgoing}
      partitions={bytesPerPartition}
      incomingMessageRate={incomingMessageRate}
      duration={duration}
      isInitialLoading={isInitialLoading}
      isLoading={isLoading}
      isRefreshing={isRefreshing}
      isJustCreated={isJustCreated}
      lastUpdated={lastUpdated}
      selectedTopic={selectedTopic}
      onRefresh={onRefresh}
      onSelectedTopic={onTopicChange}
      onDurationChange={onDurationChange}
      onCreateTopic={onCreateTopic}
    />
  );
};
