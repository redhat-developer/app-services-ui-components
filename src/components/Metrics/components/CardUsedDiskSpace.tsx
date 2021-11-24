import { Card, CardBody, CardTitle, Divider } from '@patternfly/react-core'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import { DurationOptions, TotalBytesMetrics } from '../types'
import { ChartLoading } from './ChartLoading'
import { ChartPopover } from './ChartPopover'
import { KafkaInstanceMetrics } from './KafkaInstanceMetrics'
import { EmptyStateMetricsUnavailable } from './EmptyStateMetricsUnavailable'
import { ToolbarUsedDiskSpace } from './ToolbarUsedDiskSpace'

type CardUsedDiskSpaceProps = {
  metrics: TotalBytesMetrics
  duration: DurationOptions
  metricsDataUnavailable: boolean
  isLoading: boolean
  isRefreshing: boolean
  onRefresh: () => void
  onDurationChange: (duration: DurationOptions) => void
  connectionAttemptRateMetrics: TotalBytesMetrics
}
type ChartTitleProps = {
  title: string
  helperText: string
}

export const CardUsedDiskSpace: FunctionComponent<CardUsedDiskSpaceProps> = ({
  metrics,
  duration,
  metricsDataUnavailable,
  isLoading,
  isRefreshing,
  onRefresh,
  onDurationChange,
  connectionAttemptRateMetrics,
}) => {
  const { t } = useTranslation()

  return (
    <Card>
      <ToolbarUsedDiskSpace
        title={t('metrics.kafka_instance_metrics')}
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
                  helperText={'used_disk_space_help_text'}
                />
                <ChartLoading />
              </>
            )

          case metricsDataUnavailable:
            return (
              <CardBody>
                <EmptyStateMetricsUnavailable />
              </CardBody>
            )

          default:
            return (
              <>
                <ChartTitle
                  title="used_disk_space"
                  helperText={'used_disk_space_help_text'}
                />
                <CardBody>
                  <KafkaInstanceMetrics
                    chartName={'used_disk_space'}
                    metrics={metrics}
                    duration={duration}
                  />
                </CardBody>
                <Divider />
                <ChartTitle
                  title="connection_attempt_rate"
                  helperText="connection_attempt_rate_help_text"
                />
                <CardBody>
                  <KafkaInstanceMetrics
                    chartName={'connection_attempt_rate'}
                    metrics={connectionAttemptRateMetrics}
                    duration={duration}
                  />
                </CardBody>
              </>
            )
        }
      })()}
    </Card>
  )
}

export const ChartTitle: FunctionComponent<ChartTitleProps> = ({
  title,
  helperText,
}) => {
  const { t } = useTranslation()
  return (
    <CardTitle component="h3">
      {t(`metrics.${title}`)}{' '}
      <ChartPopover
        title={t(`metrics.${title}`)}
        description={t(`metrics.${helperText}`)}
      />
    </CardTitle>
  )
}
