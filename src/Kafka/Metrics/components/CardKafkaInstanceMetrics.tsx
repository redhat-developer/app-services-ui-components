import { Card, CardBody, CardTitle, Divider } from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type { DurationOptions, TimeSeriesMetrics } from "../types";
import { CardBodyLoading } from "./CardBodyLoading";
import { ChartPopover } from "./ChartPopover";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";
import { ToolbarKafkaInstanceMetric } from "./ToolbarKafkaInstanceMetric";
import { formatBytes } from "./utils";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";
import type { ToolbarRefreshProps } from "./ToolbarRefresh";

export type CardKafkaInstanceMetricsLimits = {
  diskSpaceLimit: number;
  connectionsLimit: number;
  connectionRateLimit: number;
};

export type CardKafkaInstanceMetricsProps = {
  usedDiskMetrics: TimeSeriesMetrics;
  clientConnectionsMetrics: TimeSeriesMetrics;
  connectionAttemptRateMetrics: TimeSeriesMetrics;
  duration: DurationOptions;
  lastUpdated: Date | undefined;
  backendUnavailable: boolean;
  isInitialLoading: boolean;
  isLoading: boolean;
  isJustCreated: boolean;
  onDurationChange: (duration: DurationOptions) => void;
} & Omit<ToolbarRefreshProps, "ariaLabel"> &
  CardKafkaInstanceMetricsLimits;

type ChartTitleProps = {
  title: string;
  helperText: string;
};

export const CardKafkaInstanceMetrics: FunctionComponent<
  CardKafkaInstanceMetricsProps
> = ({
  usedDiskMetrics,
  clientConnectionsMetrics,
  connectionAttemptRateMetrics,
  duration,
  lastUpdated,
  backendUnavailable,
  isInitialLoading,
  isLoading,
  isRefreshing,
  isJustCreated,
  diskSpaceLimit,
  connectionsLimit,
  connectionRateLimit,
  onRefresh,
  onDurationChange,
}) => {
  const { t } = useTranslation("metrics");

  return (
    <Card data-testid={"metrics-kafka-instance"}>
      <ToolbarKafkaInstanceMetric
        title={t("kafka_instance_metrics")}
        duration={duration}
        lastUpdated={lastUpdated}
        onSetTimeDuration={onDurationChange}
        isDisabled={backendUnavailable || isJustCreated || isLoading}
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
                <EmptyStateNoMetricsData />
              </CardBody>
            );

          case isJustCreated:
            return (
              <CardBody>
                <EmptyStateMetricsUnavailable />
              </CardBody>
            );

          default:
            return (
              <>
                <ChartTitle
                  title={t("used_disk_space")}
                  helperText={t("used_disk_space_help_text")}
                />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("used_disk_space")}
                    yLabel={t("axis-label-bytes")}
                    metrics={usedDiskMetrics}
                    duration={duration}
                    formatValue={formatBytes}
                    usageLimit={diskSpaceLimit}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoMetricsData />}
                  />
                </CardBody>
                <Divider />
                <ChartTitle
                  title={t("client_connections")}
                  helperText={t("client_connections_helper_text")}
                />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("client_connections")}
                    yLabel={t("client_connections_y_axis")}
                    metrics={clientConnectionsMetrics}
                    duration={duration}
                    usageLimit={connectionsLimit}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoMetricsData />}
                  />
                </CardBody>
                <Divider />
                <ChartTitle
                  title={t("connection_attempt_rate")}
                  helperText={t("connection_attempt_rate_help_text")}
                />
                <CardBody>
                  <ChartLinearWithOptionalLimit
                    chartName={t("connection_attempt_rate")}
                    yLabel={t("connection_attempt_rate_yaxis")}
                    metrics={connectionAttemptRateMetrics}
                    duration={duration}
                    usageLimit={connectionRateLimit}
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
  return (
    <CardTitle component="h3">
      {title} <ChartPopover title={title} description={helperText} />
    </CardTitle>
  );
};
