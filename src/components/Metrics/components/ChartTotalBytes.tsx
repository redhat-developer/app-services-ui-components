import { TimeSeriesMetrics } from "../types";
import { timeIntervalsMapping } from "../consts";

import {
  Chart,
  ChartAxis,
  ChartGroup,
  ChartLegend,
  ChartLine,
  ChartThemeColor,
  ChartVoronoiContainer,
} from "@patternfly/react-charts";
import chart_color_blue_300 from "@patternfly/react-tokens/dist/js/chart_color_blue_300";
import chart_color_orange_300 from "@patternfly/react-tokens/dist/js/chart_color_orange_300";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { dateToChartValue, shouldShowDate, formatBytes } from "./utils";
import sub from "date-fns/sub";

type ChartData = {
  color: string;
  line: TopicChartData[];
};

type TopicChartData = {
  name: string;
  x: number;
  y: number;
};

type LegendData = {
  name: string;
  symbol: {
    fill: string;
    type?: string;
  };
};

type ChartTotalBytesProps = {
  incomingTopicsData: TimeSeriesMetrics;
  outgoingTopicsData: TimeSeriesMetrics;
  selectedTopic: string | undefined;
  duration: number;
};
export const ChartTotalBytes: FunctionComponent<ChartTotalBytesProps> = ({
  incomingTopicsData,
  outgoingTopicsData,
  selectedTopic,
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

  const { chartData, legendData, tickValues } = getBytesChartData(
    incomingTopicsData,
    outgoingTopicsData,
    duration,
    t("{{topic}} incoming bytes", { topic: selectedTopic || t("Total") }),
    t("{{topic}} outgoing bytes", { topic: selectedTopic || t("Total") })
  );

  return (
    <div ref={containerRef}>
      <Chart
        ariaTitle={t("metrics.total_bytes")}
        containerComponent={
          <ChartVoronoiContainer
            labels={({ datum }) => `${datum.name}: ${formatBytes(datum.y)}`}
            constrainToVisibleArea
          />
        }
        legendAllowWrap={true}
        legendPosition="bottom-left"
        legendComponent={
          <ChartLegend data={legendData} itemsPerRow={itemsPerRow} />
        }
        height={300}
        padding={{
          bottom: 110,
          left: 120,
          right: 40,
          top: 40,
        }}
        themeColor={ChartThemeColor.multiUnordered}
        width={width}
      >
        <ChartAxis
          label={"\n" + "Time"}
          tickValues={tickValues}
          tickCount={timeIntervalsMapping[duration].ticks}
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
            <ChartLine
              key={`chart-line-${index}`}
              data={value.line}
              style={{
                data: {
                  stroke: value.color,
                },
              }}
            />
          ))}
        </ChartGroup>
      </Chart>
    </div>
  );
};

export function getBytesChartData(
  incomingTopic: TimeSeriesMetrics,
  outgoingTopic: TimeSeriesMetrics,
  duration: number,
  incomingTopicName: string,
  outgoingTopicName: string
): {
  legendData: Array<LegendData>;
  chartData: Array<ChartData>;
  tickValues: number[];
} {
  const legendData: Array<LegendData> = [];
  const chartData: Array<ChartData> = [];

  const incomingLine = metricsToLine(incomingTopic, incomingTopicName);
  if (incomingLine) {
    const color = chart_color_blue_300.value;
    chartData.push({ color, line: incomingLine });
    legendData.push({
      name: incomingTopicName,
      symbol: {
        fill: color,
      },
    });
  }

  const outgoingLine = metricsToLine(outgoingTopic, outgoingTopicName);
  if (outgoingLine) {
    const color = chart_color_orange_300.value;
    chartData.push({ color, line: outgoingLine });
    legendData.push({
      name: outgoingTopicName,
      symbol: {
        fill: color,
      },
    });
  }
  const allTimestamps = [
    ...Object.keys(incomingTopic),
    ...Object.keys(outgoingTopic),
  ];
  allTimestamps.sort();
  const mostRecentTs = parseInt(allTimestamps[allTimestamps.length - 1]);
  const tickValues: number[] = new Array(timeIntervalsMapping[duration].ticks)
    .fill(mostRecentTs)
    .map((d, index) =>
      sub(new Date(d), {
        seconds: timeIntervalsMapping[duration].interval * index,
      }).getTime()
    );

  return {
    legendData,
    chartData,
    tickValues,
  };
}

export function metricsToLine(
  metrics: TimeSeriesMetrics,
  name: string
): Array<TopicChartData> {
  const line: Array<TopicChartData> = [];

  Object.entries(metrics).map(([timestamp, bytes]) => {
    line.push({ name, x: parseInt(timestamp, 10), y: bytes });
  });
  return line;
}
