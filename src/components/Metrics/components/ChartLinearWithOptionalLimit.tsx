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
import chart_color_black_500 from "@patternfly/react-tokens/dist/js/chart_color_black_500";
import chart_color_blue_300 from "@patternfly/react-tokens/dist/js/chart_color_blue_300";
import React, {
  VoidFunctionComponent,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { chartHeight, chartPadding } from "../consts";
import { TimeSeriesMetrics, DurationOptions } from "../types";
import { ChartSkeletonLoader } from "./ChartSkeletonLoader";
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

export const ChartLinearWithOptionalLimit: VoidFunctionComponent<ChartLinearWithOptionalLimitProps> = ({
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
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();
  const [width, setWidth] = useState<number>();

  const handleResize = () =>
    containerRef.current && setWidth(containerRef.current.clientWidth);
  const itemsPerRow = width && width > 650 ? 6 : 3;

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [width]);

  const { chartData, legendData, tickValues } = getChartData(
    metrics,
    duration,
    chartName,
    t("Limit"),
    usageLimit
  );

  const hasMetrics = Object.keys(metrics).length > 0;

  switch (true) {
    case isLoading:
      return <ChartSkeletonLoader />;
    case !hasMetrics:
      return emptyState;
    default:
      return (
        <div ref={containerRef}>
          <Chart
            ariaTitle={t("metrics.used_disk_space")}
            containerComponent={
              <ChartVoronoiContainer
                labels={({ datum }) => `${datum.name}: ${formatValue(datum.y)}`}
                constrainToVisibleArea
              />
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
              label={"\n" + (xLabel || t("metrics.axis-label-time"))}
              tickValues={tickValues}
              tickFormat={(d) =>
                dateToChartValue(new Date(d), {
                  showDate: shouldShowDate(duration),
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
                  interpolation="monotoneX"
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
  return null;
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
