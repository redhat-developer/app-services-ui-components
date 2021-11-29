import {
  ChartLogSizePerPartition,
  ChartPopover,
  ChartTotalBytes,
  EmptyStateNoTopicData,
  EmptyStateNoTopicSelected,
  ToolbarTopicsMetrics,
  ChartIncomingMessage,
} from ".";
import {
  DurationOptions,
  PartitionBytesMetric,
  TimeSeriesMetrics,
} from "../types";
import {
  Bullseye,
  Card,
  CardBody,
  CardTitle,
  Divider,
  Spinner,
} from "@patternfly/react-core";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { ChartLoading } from "./ChartLoading";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";
import { EmptyStateNoTopics } from "./EmptyStateNoTopics";

type CardTopicsMetricsProps = {
  topics: string[];
  incomingTopicsData: TimeSeriesMetrics;
  outgoingTopicsData: TimeSeriesMetrics;
  partitions: PartitionBytesMetric;
  incomingMessageRate: TimeSeriesMetrics;
  duration: DurationOptions;
  backendUnavailable: boolean;
  metricsDataUnavailable: boolean;
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
  metricsDataUnavailable,
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
    <Card>
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
          case isLoading && selectedTopic === undefined:
            return (
              <CardBody>
                <Bullseye>
                  <Spinner isSVG />
                </Bullseye>
              </CardBody>
            );

          case isLoading:
            return (
              <>
                <TotalBytesTitle />
                <ChartLoading />
                <Divider />
                <IncomingMessageRate />
                <Divider />
                <PartitionSizeTitle />
                <ChartLoading />
              </>
            );

          case backendUnavailable:
            return (
              <CardBody>
                <EmptyStateMetricsUnavailable />
              </CardBody>
            );

          case metricsDataUnavailable:
            return (
              <CardBody>
                <EmptyStateNoTopicData />
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
                  />
                </CardBody>
                <Divider />
                <IncomingMessageRate />
                <CardBody>
                  <ChartIncomingMessage
                    incomingMessageRate={incomingMessageRate}
                    duration={duration} />
                </CardBody>
                <Divider />
                <PartitionSizeTitle />
                <CardBody>
                  <ChartLogSizePerPartition
                    partitions={partitions}
                    duration={duration}
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
                  />
                </CardBody>
                <Divider />
                <IncomingMessageRate />
                <CardBody>
                  <ChartIncomingMessage
                    incomingMessageRate={incomingMessageRate}
                    duration={duration} />
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
  )
}
