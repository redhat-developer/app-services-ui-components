import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartThemeColor,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import {
  chart_color_blue_300,
  chart_color_green_300,
} from "@patternfly/react-tokens";
import { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { chartHeight, chartPadding } from "../consts";
import { PartitionBytesMetric } from "../types";
import { ChartSkeletonLoader } from "./ChartSkeletonLoader";
import { useChartWidth } from "./useChartWidth";
import {
  dateToChartValue,
  formatBytes,
  shouldShowDate,
  timestampsToTicks,
} from "./utils";

const colors = [chart_color_green_300.value, chart_color_blue_300.value];

type ChartData = {
  color: string;
  area: PartitionChartData[];
};

type PartitionChartData = {
  name: string;
  x: number;
  y: number;
};

type LegendData = {
  name: string;
};

export type ChartLogSizePerPartitionProps = {
  partitions: PartitionBytesMetric;
  topic: string | undefined;
  duration: number;
  isLoading: boolean;
  emptyState: ReactElement;
};
export const ChartLogSizePerPartition: FunctionComponent<
  ChartLogSizePerPartitionProps
> = ({ partitions, topic, duration, isLoading, emptyState }) => {
  const { t } = useTranslation();
  const [containerRef, width] = useChartWidth();

  const itemsPerRow = width && width > 650 ? 6 : 3;

  const { chartData, legendData, tickValues } = getChartData(
    partitions,
    topic,
    duration
  );

  const hasMetrics = Object.keys(partitions).length > 0;

  const showDate = shouldShowDate(duration);

  return (
    <div ref={containerRef}>
      {(() => {
        switch (true) {
          case isLoading:
            return <ChartSkeletonLoader />;
          case !hasMetrics:
            return emptyState;
          default:
            return (
              <Chart
                ariaTitle={t("metrics:log_size_per_partition")}
                containerComponent={
                  <ChartVoronoiContainer
                    labels={({ datum }) =>
                      `${datum.name}: ${formatBytes(datum.y)}`
                    }
                    constrainToVisibleArea
                  />
                }
                legendPosition="bottom-left"
                legendComponent={
                  <ChartLegend data={legendData} itemsPerRow={itemsPerRow} />
                }
                height={chartHeight}
                padding={chartPadding}
                themeColor={ChartThemeColor.multiUnordered}
                width={width}
                legendAllowWrap={true}
              >
                <ChartAxis
                  label={"\n" + t("metrics:axis-label-time")}
                  tickValues={tickValues}
                  tickFormat={(d) =>
                    dateToChartValue(d, {
                      showDate,
                    })
                  }
                />
                <ChartAxis
                  label={"\n\n\n\n\n" + t("metrics:axis-label-bytes")}
                  dependentAxis
                  tickFormat={formatBytes}
                />
                <ChartGroup>
                  {chartData.map((value, index) => (
                    <ChartArea key={`chart-area-${index}`} data={value.area} />
                  ))}
                </ChartGroup>
              </Chart>
            );
        }
      })()}
    </div>
  );
};

export function getChartData(
  partitions: PartitionBytesMetric,
  topic: string | undefined,
  duration: number
): {
  legendData: Array<LegendData>;
  chartData: Array<ChartData>;
  tickValues: number[];
} {
  const legendData: Array<LegendData> = [];
  const chartData: Array<ChartData> = [];
  Object.entries(partitions).map(([partition, dataMap], index) => {
    const name = `${topic}: ${partition}`;
    const color = colors[index];
    legendData.push({
      name,
    });
    const area: Array<PartitionChartData> = [];

    Object.entries(dataMap).map(([timestamp, value]) => {
      area.push({ name, x: parseInt(timestamp, 10), y: value });
    });
    chartData.push({ color, area });
  });

  const allTimestamps = Array.from(
    new Set(Object.values(partitions).flatMap((m) => Object.keys(m)))
  );
  const tickValues = timestampsToTicks(allTimestamps, duration);

  return {
    legendData,
    chartData,
    tickValues,
  };
}
