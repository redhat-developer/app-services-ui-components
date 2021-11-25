import { PartitionBytesMetric } from "../types";
import {
  Chart,
  ChartArea,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartThemeColor,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import chart_color_blue_300 from "@patternfly/react-tokens/dist/js/chart_color_blue_300";
import chart_color_green_300 from "@patternfly/react-tokens/dist/js/chart_color_green_300";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  dateToChartValue,
  shouldShowDate,
  formatBytes,
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
  duration: number;
};
export const ChartLogSizePerPartition: FunctionComponent<ChartLogSizePerPartitionProps> = ({
  partitions,
  duration,
}) => {
  const { t } = useTranslation();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState<number>();

  const handleResize = () =>
    containerRef.current && setWidth(containerRef.current.clientWidth);
  const itemsPerRow = width && width > 650 ? 6 : 3;

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
  }, [width]);

  const { chartData, legendData, tickValues } = getChartData(
    partitions,
    duration
  );

  return (
    <div ref={containerRef}>
      <Chart
        ariaTitle={t("metrics.log_size_per_partition")}
        containerComponent={
          <ChartVoronoiContainer
            labels={({ datum }) => `${datum.name}: ${formatBytes(datum.y)}`}
            constrainToVisibleArea
          />
        }
        legendPosition="bottom-left"
        legendComponent={
          <ChartLegend data={legendData} itemsPerRow={itemsPerRow} />
        }
        height={350}
        padding={{
          bottom: 110,
          left: 120,
          right: 40,
          top: 40,
        }}
        themeColor={ChartThemeColor.multiUnordered}
        width={width}
        legendAllowWrap={true}
      >
        <ChartAxis
          label={"\n" + "Time"}
          tickValues={tickValues}
          tickFormat={(d) =>
            dateToChartValue(new Date(d), {
              showDate: shouldShowDate(duration),
            })
          }
        />
        <ChartAxis
          label={"\n\n\n\n\n" + "Bytes"}
          dependentAxis
          tickFormat={formatBytes}
        />
        <ChartGroup>
          {chartData.map((value, index) => (
            <ChartArea
              key={`chart-area-${index}`}
              data={value.area}
              interpolation="monotoneX"
            />
          ))}
        </ChartGroup>
      </Chart>
    </div>
  );
};

export function getChartData(
  partitions: PartitionBytesMetric,
  duration: number
): {
  legendData: Array<LegendData>;
  chartData: Array<ChartData>;
  tickValues: number[];
} {
  const legendData: Array<LegendData> = [];
  const chartData: Array<ChartData> = [];
  Object.entries(partitions).map(([name, dataMap], index) => {
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
