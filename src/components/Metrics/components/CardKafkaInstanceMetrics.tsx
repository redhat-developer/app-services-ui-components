import { Card, CardBody, CardTitle, Divider } from "@patternfly/react-core";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DurationOptions, TimeSeriesMetrics } from "../types";
import { CardBodyLoading } from "./CardBodyLoading";
import { ChartPopover } from "./ChartPopover";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";
import { ToolbarKafkaInstanceMetric } from "./ToolbarKafkaInstanceMetric";
import { formatBytes } from "./utils";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";

type CardKafkaInstanceMetricsProps = {
  usedDiskMetrics: TimeSeriesMetrics;
  clientConnectionsMetrics: TimeSeriesMetrics;
  connectionAttemptRateMetrics: TimeSeriesMetrics;
  duration: DurationOptions;
  backendUnavailable: boolean;
  isInitialLoading: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onDurationChange: (duration: DurationOptions) => void;
};
type ChartTitleProps = {
  title: string;
  helperText: string;
};

export const CardKafkaInstanceMetrics: FunctionComponent<CardKafkaInstanceMetricsProps> = ({
  usedDiskMetrics,
  clientConnectionsMetrics,
  connectionAttemptRateMetrics,
  duration,
  backendUnavailable,
  isInitialLoading,
  isLoading,
  isRefreshing,
  onRefresh,
  onDurationChange,
}) => {
  const { t } = useTranslation();

  return (
    <Card data-testid={"metrics-kafka-instance"}>
      <ToolbarKafkaInstanceMetric
        title={t("metrics.kafka_instance_metrics")}
        duration={duration}
        onSetTimeDuration={onDurationChange}
        isDisabled={backendUnavailable}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
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

          default:
            return (
              <>
                <ChartTitle
                  title="used_disk_space"
                  helperText={"used_disk_space_help_text"}
                />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("metrics.used_disk_space")}
                    metrics={usedDiskMetrics}
                    duration={duration}
                    formatValue={formatBytes}
                    usageLimit={1000 * 1024 ** 3}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoMetricsData />}
                  />
                </CardBody>
                <Divider />
                <ChartTitle
                  title="client_connections"
                  helperText="client_connections_helper_text"
                />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("metrics.client_connections")}
                    metrics={clientConnectionsMetrics}
                    duration={duration}
                    usageLimit={100}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoMetricsData />}
                  />
                </CardBody>
                <Divider />
                <ChartTitle
                  title="connection_attempt_rate"
                  helperText="connection_attempt_rate_help_text"
                />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("metrics.connection_attempt_rate")}
                    yLabel={t("metrics.connection_attempt_rate_yaxis")}
                    metrics={connectionAttemptRateMetrics}
                    duration={duration}
                    usageLimit={100}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoMetricsData />}
                  />
                </CardBody>
              </>
            );
        }
      })()}
    </Card>
  );
};

export const ChartTitle: FunctionComponent<ChartTitleProps> = ({
  title,
  helperText,
}) => {
  const { t } = useTranslation();
  return (
    <CardTitle component="h3">
      {t(`metrics.${title}`)}{" "}
      <ChartPopover
        title={t(`metrics.${title}`)}
        description={t(`metrics.${helperText}`)}
      />
    </CardTitle>
  );
};
