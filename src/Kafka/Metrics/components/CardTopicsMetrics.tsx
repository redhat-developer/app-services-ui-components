import { Card, CardBody, CardTitle, Divider } from "@patternfly/react-core";
import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import {
  DurationOptions,
  PartitionBytesMetric,
  TimeSeriesMetrics,
} from "../types";
import { CardBodyLoading } from "./CardBodyLoading";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import { ChartLogSizePerPartition } from "./ChartLogSizePerPartition";
import { ChartPopover } from "./ChartPopover";
import { ChartTotalBytes } from "./ChartTotalBytes";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";
import { EmptyStateNoMetricsDataForSelection } from "./EmptyStateNoMetricsDataForSelection";
import { EmptyStateNoTopics } from "./EmptyStateNoTopics";
import { EmptyStateNoTopicSelected } from "./EmptyStateNoTopicSelected";
import { ToolbarRefreshProps } from "./ToolbarRefresh";
import { ToolbarTopicsMetrics } from "./ToolbarTopicsMetrics";

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
  isJustCreated: boolean;
  selectedTopic: string | undefined;
  onCreateTopic: () => void;
  onSelectedTopic: (topic: string | undefined) => void;
  onDurationChange: (duration: DurationOptions) => void;
} & Omit<ToolbarRefreshProps, "ariaLabel">;

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
  isJustCreated,
  lastUpdated,
  onCreateTopic,
  onRefresh,
  onSelectedTopic,
  onDurationChange,
}) => {
  const { t } = useTranslation();
  const noTopics = topics.length === 0;
  const selectedTopicNotInList =
    selectedTopic !== undefined &&
    topics.find((t) => t === selectedTopic) === undefined;
  const chartEmptyState = selectedTopicNotInList ? (
    <EmptyStateNoMetricsDataForSelection />
  ) : (
    <EmptyStateNoMetricsData />
  );
  return (
    <Card data-testid={"metrics-topics"}>
      <ToolbarTopicsMetrics
        title={t("metrics:topic_metrics")}
        duration={duration}
        onSetTimeDuration={onDurationChange}
        isDisabled={
          backendUnavailable || isJustCreated || noTopics || isLoading
        }
        isRefreshing={isRefreshing}
        selectedTopic={selectedTopic}
        onSetSelectedTopic={onSelectedTopic}
        onRefresh={onRefresh}
        topicList={topics}
        lastUpdated={lastUpdated}
      />
      {(() => {
        switch (true) {
          case isInitialLoading:
            return <CardBodyLoading />;

          case backendUnavailable:
            return (
              <CardBody>
                <EmptyStateNoMetricsData />
              </CardBody>
            );

          case isJustCreated && !noTopics:
            return (
              <CardBody>
                <EmptyStateNoTopics />
              </CardBody>
            );

          case isJustCreated && noTopics:
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
                    emptyState={chartEmptyState}
                  />
                </CardBody>
                <Divider />
                <IncomingMessageRate />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("metrics:topic_incoming_message_rate")}
                    yLabel={t("metrics:topic_incoming_message_rate_y_axis")}
                    metrics={incomingMessageRate}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={chartEmptyState}
                  />
                </CardBody>
                <Divider />
                <PartitionSizeTitle />
                <CardBody>
                  <ChartLogSizePerPartition
                    partitions={partitions}
                    topic={selectedTopic}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={chartEmptyState}
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
                    emptyState={chartEmptyState}
                  />
                </CardBody>
                <Divider />
                <IncomingMessageRate />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("metrics:topic_incoming_message_rate")}
                    yLabel={t("metrics:topic_incoming_message_rate_y_axis")}
                    metrics={incomingMessageRate}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={chartEmptyState}
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
      {t("metrics:total_bytes")}{" "}
      <ChartPopover
        title={t("metrics:total_bytes_popover_header")}
        description={t("metrics:topic_metrics_help_text")}
      />
    </CardTitle>
  );
};

const PartitionSizeTitle: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <CardTitle component="h3">
      {t("metrics:topic_partition_size")}{" "}
      <ChartPopover
        title={t("metrics:topic_partition_size_popover_header")}
        description={t("metrics:topic_partition_size_help_text")}
      />
    </CardTitle>
  );
};

const IncomingMessageRate: FunctionComponent = () => {
  const { t } = useTranslation();
  return (
    <CardTitle component="h3">
      {t("metrics:topic_incoming_message_rate")}{" "}
      <ChartPopover
        title={t("metrics:topic_incoming_message_rate_popover_header")}
        description={t("metrics:topic_incoming_message_rate_help_text")}
      />
    </CardTitle>
  );
};
