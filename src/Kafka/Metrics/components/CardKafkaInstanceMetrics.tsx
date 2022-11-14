import {
  Alert,
  Card,
  CardBody,
  CardTitle,
  Divider,
  Grid,
  GridItem,
  Toolbar,
  ToolbarContent,
} from "@patternfly/react-core";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import type {
  BrokerBytesMetric,
  BrokerFilter,
  DurationOptions,
  PartitionBytesMetric,
  PartitionSelect,
  TimeSeriesMetrics,
} from "../types";
import { CardBodyLoading } from "./CardBodyLoading";
import { ChartPopover } from "./ChartPopover";
import { ChartLinearWithOptionalLimit } from "./ChartLinearWithOptionalLimit";
import { EmptyStateMetricsUnavailable } from "./EmptyStateMetricsUnavailable";
import { ToolbarKafkaInstanceMetric } from "./ToolbarKafkaInstanceMetric";
import { EmptyStateNoMetricsData } from "./EmptyStateNoMetricsData";
import type { ToolbarRefreshProps } from "./ToolbarRefresh";
import { BrokerToggle } from "./BrokerToggle";
import { ChartPartitionSizePerBroker } from "./ChartPartitionSizePerBroker";
import { FilterByPartition } from "./FilterByPartition";
import { ChartUsedDiskSpace } from "./CardUsedDiskSpaceMetrics";

export type CardKafkaInstanceMetricsLimits = {
  diskSpaceLimit: number;
  connectionsLimit: number;
  connectionRateLimit: number;
};

export type CardKafkaInstanceMetricsProps = {
  brokers: string[];
  usedDiskMetrics: BrokerBytesMetric;
  clientConnectionsMetrics: TimeSeriesMetrics;
  connectionAttemptRateMetrics: TimeSeriesMetrics;
  duration: DurationOptions;
  lastUpdated: Date | undefined;
  backendUnavailable: boolean;
  isInitialLoading: boolean;
  isLoading: boolean;
  isJustCreated: boolean;
  selectedBroker: string | undefined;
  onSelectedBroker: (broker: string | undefined) => void;
  onDurationChange: (duration: DurationOptions) => void;
  selectToggle: BrokerFilter;
  onSelectedToggle: (value: BrokerFilter) => void;
  bytesPerPartitions: PartitionBytesMetric;
  onSelectedPartition: (value: PartitionSelect) => void;
  selectedPartition: PartitionSelect;
} & Omit<ToolbarRefreshProps, "ariaLabel"> &
  CardKafkaInstanceMetricsLimits;

type ChartTitleProps = {
  title: string;
  helperText: string;
};

export const CardKafkaInstanceMetrics: FunctionComponent<
  CardKafkaInstanceMetricsProps
> = ({
  brokers,
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
  selectedBroker,
  onSelectedBroker,
  selectToggle,
  onSelectedToggle,
  selectedPartition,
  onSelectedPartition,
  bytesPerPartitions,
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
        selectedBroker={selectedBroker}
        brokerList={brokers}
        onSetSelectedBroker={onSelectedBroker}
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
                  <BrokerToggle
                    value={selectToggle}
                    onChange={onSelectedToggle}
                    selectedBroker={selectedBroker}
                  />
                  <ChartUsedDiskSpace
                    metrics={usedDiskMetrics}
                    broker={selectedBroker}
                    duration={duration}
                    isLoading={isLoading}
                    emptyState={<EmptyStateNoMetricsData />}
                    brokerToggle={selectToggle}
                    usageLimit={diskSpaceLimit}
                  />
                </CardBody>
                <Divider />
                <ChartTitle
                  title={t("partition_size")}
                  helperText={t("broker_partition_size_help_text")}
                />
                <CardBody>
                  <Toolbar>
                    <ToolbarContent>
                      <FilterByPartition
                        onSetSelectedPartition={onSelectedPartition}
                        partitionValue={selectedPartition}
                      />
                    </ToolbarContent>
                  </Toolbar>
                  <ChartPartitionSizePerBroker
                    partitions={bytesPerPartitions}
                    broker={selectedBroker}
                    duration={duration}
                    isLoading={isLoading}
                    selectedPartition={selectedPartition}
                    emptyState={<EmptyStateNoMetricsData />}
                  />
                </CardBody>
                <Divider />
                <ChartTitle
                  title={t("client_connections")}
                  helperText={t("client_connections_helper_text")}
                />
                <CardBody>
                  <Grid hasGutter>
                    <GridItem>
                      <Alert
                        variant="info"
                        isInline
                        title={t("client_connection_alert")}
                      />
                    </GridItem>
                    <GridItem>
                      <ChartLinearWithOptionalLimit
                        chartName={t("client_connections")}
                        yLabel={t("client_connections_y_axis")}
                        metrics={clientConnectionsMetrics}
                        duration={duration}
                        usageLimit={connectionsLimit}
                        isLoading={isLoading}
                        emptyState={<EmptyStateNoMetricsData />}
                      />
                    </GridItem>
                  </Grid>
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
