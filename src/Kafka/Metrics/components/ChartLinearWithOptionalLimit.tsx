import type { ChartVoronoiContainerProps } from "@patternfly/react-charts";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartThemeColor,
  ChartThreshold,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import {
  chart_color_black_500,
  chart_color_blue_300,
} from "@patternfly/react-tokens";
import type { ReactElement, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { chartHeight, chartPadding } from "../consts";
import type { DurationOptions, TimeSeriesMetrics } from "../types";
import { ChartSkeletonLoader } from "./ChartSkeletonLoader";
import { useChartWidth } from "./useChartWidth";
import { dateToChartValue, shouldShowDate, timestampsToTicks } from "./utils";

type ChartData = {
  areaColor: string;
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
  symbol?: {
    fill?: string;
    type?: string;
  };
};

type ChartLinearWithOptionalLimitProps = {
  metrics: TimeSeriesMetrics;
  duration: DurationOptions;
  chartName: string;
  xLabel?: string;
  yLabel?: string;
  usageLimit?: number;
  formatValue?: (d: number) => string;
  isLoading: boolean;
  emptyState: ReactElement;
};

export const ChartLinearWithOptionalLimit: VoidFunctionComponent<
  ChartLinearWithOptionalLimitProps
> = ({
  metrics,
  duration,
  chartName,
  xLabel,
  yLabel,
  usageLimit,
  formatValue = (d) => `${d}`,
  isLoading,
  emptyState,
}) => {
  const { t } = useTranslation();
  const [containerRef, width] = useChartWidth();

  const itemsPerRow = width && width > 650 ? 6 : 3;

  const { chartData, legendData, tickValues } = getChartData(
    metrics,
    duration,
    chartName,
    t("metrics:limit"),
    usageLimit
  );

  const hasMetrics = Object.keys(metrics).length > 0;
  const showDate = shouldShowDate(duration);

  switch (true) {
    case isLoading:
      return <ChartSkeletonLoader />;
    case !hasMetrics:
      return emptyState;
    default: {
      const labels: ChartVoronoiContainerProps["labels"] = ({ datum }) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions,@typescript-eslint/no-unsafe-argument
        `${datum.name}: ${formatValue(datum.y)}`;
      return (
        <div ref={containerRef}>
          <Chart
            ariaTitle={chartName}
            containerComponent={
              <ChartVoronoiContainer labels={labels} constrainToVisibleArea />
            }
            legendPosition="bottom-left"
            legendComponent={
              <ChartLegend
                orientation={"horizontal"}
                data={legendData}
                itemsPerRow={itemsPerRow}
              />
            }
            height={chartHeight}
            padding={chartPadding}
            themeColor={ChartThemeColor.multiUnordered}
            width={width}
            legendAllowWrap={true}
          >
            <ChartAxis
              label={"\n" + (xLabel || t("metrics:axis-label-time") || "")}
              tickValues={tickValues}
              tickFormat={(d: number) =>
                dateToChartValue(d, {
                  showDate,
                })
              }
            />
            <ChartAxis
              label={"\n\n\n\n\n" + (yLabel || chartName)}
              dependentAxis
              tickFormat={formatValue}
            />
            <ChartGroup>
              {chartData.map((value, index) => (
                <ChartArea
                  key={`chart-area-${index}`}
                  data={value.area}
                  style={{
                    data: {
                      // TODO: check if this is needed
                      // stroke: value.color,
                    },
                  }}
                />
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
        </div>
      );
    }
  }
};

function getChartData(
  metrics: TimeSeriesMetrics,
  duration: number,
  lineLabel: string,
  limitLabel: string,
  usageLimit?: number
): {
  legendData: Array<LegendData>;
  chartData: Array<ChartData>;
  tickValues: number[];
} {
  const legendData = [
    usageLimit
      ? {
          name: limitLabel,
          symbol: { fill: chart_color_black_500.value, type: "threshold" },
        }
      : undefined,
    { name: lineLabel, symbol: { fill: chart_color_blue_300.value } },
  ].filter((d) => !!d) as Array<LegendData>;

  const areaColor = chart_color_blue_300.value;
  const softLimitColor = chart_color_black_500.value;
  const chartData: Array<ChartData> = [];
  const area: Array<BrokerChartData> = [];
  const softLimit: Array<BrokerChartData> = [];

  Object.entries(metrics).map(([timestamp, bytes]) => {
    area.push({ name: lineLabel, x: parseInt(timestamp, 10), y: bytes });
  });
  chartData.push({ areaColor, softLimitColor, area, softLimit });

  const tickValues = timestampsToTicks(Object.keys(metrics), duration);

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
