import type { ChartVoronoiContainerProps } from "@patternfly/react-charts";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartThemeColor,
  ChartVoronoiContainer,
  ChartThreshold,
} from "@patternfly/react-charts";
import {
  chart_color_blue_300,
  chart_color_cyan_300,
  chart_color_black_500,
} from "@patternfly/react-tokens";
import type { FunctionComponent, ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { chartHeight, chartPadding } from "../consts";
import type { BrokerBytesMetric, BrokerFilter } from "../types";
import { ChartSkeletonLoader } from "./ChartSkeletonLoader";
import { useChartWidth } from "./useChartWidth";
import {
  dateToChartValue,
  formatBytes,
  shouldShowDate,
  timestampsToTicks,
} from "./utils";

const colors = [chart_color_cyan_300.value, chart_color_blue_300.value];

type ChartData = {
  color: string;
  softLimitColor: string;
  area: BrokerChartData[];
  softLimit: BrokerChartData[];
};

type BrokerChartData = {
  name: string;
  x: number;
  y: number;
};

type LegendData = {
  name: string;
};

export type ChartUsedDiskSpaceProps = {
  metrics: BrokerBytesMetric;
  broker: string | undefined;
  duration: number;
  isLoading: boolean;
  emptyState: ReactElement;
  brokerToggle: BrokerFilter;
  usageLimit?: number;
};
export const ChartUsedDiskSpace: FunctionComponent<ChartUsedDiskSpaceProps> = ({
  metrics,
  broker,
  duration,
  isLoading,
  emptyState,
  brokerToggle,
  usageLimit,
}) => {
  const { t } = useTranslation();
  const [containerRef, width] = useChartWidth();

  const itemsPerRow = width && width > 650 ? 6 : 3;

  const { chartData, legendData, tickValues } = getChartData(
    metrics,
    broker,
    duration,
    brokerToggle,
    t("metrics:limit"),
    usageLimit
  );

  const hasMetrics = Object.keys(metrics).length > 0;

  const showDate = shouldShowDate(duration);

  return (
    <div ref={containerRef}>
      {(() => {
        switch (true) {
          case isLoading:
            return <ChartSkeletonLoader />;
          case !hasMetrics:
            return emptyState;
          default: {
            const labels: ChartVoronoiContainerProps["labels"] = ({ datum }) =>
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-argument
              `${datum.name}: ${formatBytes(datum.y)}`;

            return (
              <Chart
                ariaTitle={t("metrics:log_size_per_partition")}
                containerComponent={
                  <ChartVoronoiContainer
                    labels={labels}
                    constrainToVisibleArea
                  />
                }
                legendPosition="bottom-left"
                legendComponent={
                  <ChartLegend data={legendData} itemsPerRow={itemsPerRow} />
                }
                height={chartHeight}
                padding={chartPadding}
                themeColor={ChartThemeColor.multiOrdered}
                width={width}
                legendAllowWrap={true}
              >
                <ChartAxis
                  label={"\n" + t("metrics:axis-label-time")}
                  tickValues={tickValues}
                  tickFormat={(d: number) =>
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
                <ChartThreshold
                  key={`chart-softlimit`}
                  data={chartData[0].softLimit}
                  style={{
                    data: {
                      stroke: chartData[0].softLimitColor,
                    },
                  }}
                />
              </Chart>
            );
          }
        }
      })()}
    </div>
  );
};

export function getChartData(
  metrics: BrokerBytesMetric,
  broker: string | undefined,
  duration: number,
  brokerToggle: BrokerFilter,
  limitLabel: string,
  usageLimit?: number
): {
  legendData: Array<LegendData>;
  chartData: Array<ChartData>;
  tickValues: number[];
} {
  const legendData: Array<LegendData> = [];
  const chartData: Array<ChartData> = [];
  const softLimit: Array<BrokerChartData> = [];
  const softLimitColor = chart_color_black_500.value;

  if (broker && metrics[broker]) {
    legendData.push({ name: broker });

    const area: Array<BrokerChartData> = [];

    const color = chart_color_blue_300.value;

    Object.entries(metrics[broker]).forEach(([timestamp, bytes]) => {
      area.push({ name: broker, x: parseInt(timestamp, 10), y: bytes });
    });
    chartData.push({ color, softLimitColor, area, softLimit });
  } else if (brokerToggle === "total") {
    legendData.push({ name: "Instance" });
    const area: Array<BrokerChartData> = [];

    const color = chart_color_blue_300.value;

    Object.entries(metrics[brokerToggle]).forEach(([timestamp, bytes]) => {
      area.push({ name: "Instance", x: parseInt(timestamp, 10), y: bytes });
    });
    chartData.push({ color, softLimitColor, area, softLimit });
  } else {
    Object.entries(metrics)
      .filter((metric) => metric[0] !== "total")
      .map(([metric, dataMap], index) => {
        const name = metric;

        const color = colors[index];
        legendData.push({
          name,
        });
        const area: Array<BrokerChartData> = [];

        Object.entries(dataMap).forEach(([timestamp, value]) => {
          area.push({ name, x: parseInt(timestamp, 10), y: value });
        });
        chartData.push({ color, softLimitColor, area, softLimit });
      });
  }

  const allTimestamps = Array.from(
    new Set(Object.values(metrics).flatMap((m) => Object.keys(m)))
  );
  const tickValues = timestampsToTicks(allTimestamps, duration);

  if (usageLimit) {
    tickValues.forEach((timestamp) =>
      softLimit.push({
        name: limitLabel,
        x: timestamp,
        y: usageLimit,
      })
    );
  }
  return {
    legendData,
    chartData,
    tickValues,
  };
}
