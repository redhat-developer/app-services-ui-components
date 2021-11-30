import {
  ChartLogSizePerPartition,
  ChartPopover,
  ChartTotalBytes,
  EmptyStateNoTopicData,
  EmptyStateNoTopicSelected,
  ToolbarTopicsMetrics,
} from ".";
import {
  DurationOptions,
  PartitionBytesMetric,
  TimeSeriesMetrics,
} from "../types";
import { Card, CardBody, CardTitle, Divider } from "@patternfly/react-core";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";
import { EmptyStateNoTopics } from "./EmptyStateNoTopics";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import { CardBodyLoading } from "./CardBodyLoading";

type CardTopicsMetricsProps = {
  topics: string[];
  incomingTopicsData: TimeSeriesMetrics;
  outgoingTopicsData: TimeSeriesMetrics;
  partitions: PartitionBytesMetric;
  incomingMessageRate: TimeSeriesMetrics;
  duration: DurationOptions;
  backendUnavailable: boolean;
  isInitialLoading: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  selectedTopic: string | undefined;
  onCreateTopic: () => void;
  onRefresh: () => void;
  onSelectedTopic: (topic: string | undefined) => void;
  onDurationChange: (duration: DurationOptions) => void;
};

export const CardTopicsMetrics: FunctionComponent<CardTopicsMetricsProps> = ({
  topics,
  incomingTopicsData,
  outgoingTopicsData,
  incomingMessageRate,
  selectedTopic,
  duration,
  partitions,
  backendUnavailable,
  isInitialLoading,
  isLoading,
  isRefreshing,
  onCreateTopic,
  onRefresh,
  onSelectedTopic,
  onDurationChange,
}) => {
  const { t } = useTranslation();
  const noTopics = topics.length === 0;

  return (
    <Card data-testid={"metrics-topics"}>
      <ToolbarTopicsMetrics
        title={t("metrics.topic_metrics")}
        duration={duration}
        onSetTimeDuration={onDurationChange}
        isDisabled={backendUnavailable || noTopics}
        isRefreshing={isRefreshing}
        selectedTopic={selectedTopic}
        onSetSelectedTopic={onSelectedTopic}
        onRefresh={onRefresh}
        topicList={topics}
      />
      {(() => {
        switch (true) {
          case isInitialLoading:
            return <CardBodyLoading />;

          case backendUnavailable:
            return (
              <CardBody>
                <EmptyStateMetricsUnavailable />
              </CardBody>
            );

          case noTopics:
            return (
              <CardBody>
                <EmptyStateNoTopics onCreateTopic={onCreateTopic} />
              </CardBody>
            );

          case selectedTopic !== undefined:
            return (
              <>
                <TotalBytesTitle />
                <CardBody>
                  <ChartTotalBytes
                    incomingTopicsData={incomingTopicsData}
                    outgoingTopicsData={outgoingTopicsData}
                    selectedTopic={selectedTopic}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoTopicData />}
                  />
                </CardBody>
                <Divider />
                <IncomingMessageRate />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("metrics.topic_incoming_message_rate")}
                    yLabel={t("metrics.topic_incoming_message_rate_y_axis")}
                    metrics={incomingMessageRate}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoTopicData />}
                  />
                </CardBody>
                <Divider />
                <PartitionSizeTitle />
                <CardBody>
                  <ChartLogSizePerPartition
                    partitions={partitions}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoTopicData />}
                  />
                </CardBody>
              </>
            );

          default:
            return (
              <>
                <TotalBytesTitle />
                <CardBody>
                  <ChartTotalBytes
                    incomingTopicsData={incomingTopicsData}
                    outgoingTopicsData={outgoingTopicsData}
                    selectedTopic={selectedTopic}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoTopicData />}
                  />
                </CardBody>
                <Divider />
                <IncomingMessageRate />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("metrics.topic_incoming_message_rate")}
                    yLabel={t("metrics.topic_incoming_message_rate_y_axis")}
                    metrics={incomingMessageRate}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoTopicData />}
                  />
                </CardBody>
                <Divider />
                <PartitionSizeTitle />
                <CardBody>
                  <EmptyStateNoTopicSelected />
                </CardBody>
              </>
            );
        }
      })()}
    </Card>
  );
};

const TotalBytesTitle: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <CardTitle component="h3">
      {t("metrics.total_bytes")}{" "}
      <ChartPopover
        title={t("metrics.total_bytes_popover_header")}
        description={t("metrics.topic_metrics_help_text")}
      />
    </CardTitle>
  );
};

const PartitionSizeTitle: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <CardTitle component="h3">
      {t("metrics.topic_partition_size")}{" "}
      <ChartPopover
        title={t("metrics.topic_partition_size_popover_header")}
        description={t("metrics.topic_partition_size_help_text")}
      />
    </CardTitle>
  );
};

const IncomingMessageRate: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <CardTitle component="h3">
      {t("metrics.topic_incoming_message_rate")}{" "}
      <ChartPopover
        title={t("metrics.topic_incoming_message_rate_popover_header")}
        description={t("metrics.topic_incoming_message_rate_help_text")}
      />
    </CardTitle>
  );
};
