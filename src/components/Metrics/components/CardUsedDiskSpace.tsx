import { Card, CardBody, CardTitle, Divider } from "@patternfly/react-core";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DurationOptions, TimeSeriesMetrics } from "../types";
import { ChartLoading } from "./ChartLoading";
import { ChartPopover } from "./ChartPopover";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";
import { ToolbarUsedDiskSpace } from "./ToolbarUsedDiskSpace";
import { formatBytes } from "./utils";

type CardUsedDiskSpaceProps = {
  usedDiskMetrics: TimeSeriesMetrics;
  clientConnectionsMetrics: TimeSeriesMetrics;
  connectionAttemptRateMetrics: TimeSeriesMetrics;
  duration: DurationOptions;
  metricsDataUnavailable: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
  onRefresh: () => void;
  onDurationChange: (duration: DurationOptions) => void;
};
type ChartTitleProps = {
  title: string;
  helperText: string;
};

export const CardUsedDiskSpace: FunctionComponent<CardUsedDiskSpaceProps> = ({
  usedDiskMetrics,
  clientConnectionsMetrics,
  connectionAttemptRateMetrics,
  duration,
  metricsDataUnavailable,
  isLoading,
  isRefreshing,
  onRefresh,
  onDurationChange,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <ToolbarUsedDiskSpace
        title={t("metrics.kafka_instance_metrics")}
        duration={duration}
        onSetTimeDuration={onDurationChange}
        isDisabled={metricsDataUnavailable}
        isRefreshing={isRefreshing}
        onRefresh={onRefresh}
      />
      {(() => {
        switch (true) {
          case isLoading:
            return (
              <>
                <ChartTitle
                  title="used_disk_space"
                  helperText={"used_disk_space_help_text"}
                />
                <ChartLoading />
              </>
            );

          case metricsDataUnavailable:
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
                    metrics={connectionAttemptRateMetrics}
                    duration={duration}
                    usageLimit={100}
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
