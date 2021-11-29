import { Chart, ChartArea, ChartAxis, ChartGroup, ChartLegend, ChartThemeColor, ChartVoronoiContainer } from "@patternfly/react-charts";
import React, { FunctionComponent, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { DurationOptions, TimeSeriesMetrics } from "../types";
import chart_color_blue_300 from "@patternfly/react-tokens/dist/js/chart_color_blue_300";
import { timeIntervalsMapping } from "../consts";
import { sub } from "date-fns";
import { dateToChartValue, shouldShowDate } from "./utils";

type ChartData = {
    areaColor: string;
    area: IncomingMessageChartData[];
}

type IncomingMessageChartData = {
    name: string;
    x: number;
    y: number;
}

type LegendData = {
    name: string;
    symbol: {
        fill: string;
        type?: string;
    };

}

type ChartIncomingMessageProps = {
    incomingMessageRate: TimeSeriesMetrics;
    duration: DurationOptions;

};


export const ChartIncomingMessage: FunctionComponent<ChartIncomingMessageProps> = ({
    incomingMessageRate,
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

    const { chartData, legendData, tickValues } = getIncomingMessageData(
        incomingMessageRate,
        duration,
        t('Incoming message rate'));
    return (
        <div ref={containerRef}>
            <Chart
                ariaTitle={t("metrics.total_bytes")}
                containerComponent={
                    <ChartVoronoiContainer
                        labels={({ datum }) => `${datum.name}: ${(datum.y)}`}
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
                    label={"\n\n\n\n\n" + "Messages/seconds"}
                    dependentAxis
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
        </div >
    )
}

export function getIncomingMessageData(
    incomingMessageRate: TimeSeriesMetrics,
    duration: number,
    lineLabel: string): {
        legendData: Array<LegendData>;
        chartData: Array<ChartData>;
        tickValues: number[];
    } {
    const chartData: Array<ChartData> = [];
    const area: Array<IncomingMessageChartData> = [];

    const legendData = [
        { name: lineLabel, symbol: { fill: chart_color_blue_300.value } },
    ].filter((d) => !!d) as Array<LegendData>;


    const areaColor = chart_color_blue_300.value;

    Object.entries(incomingMessageRate).map(([timestamp, bytes]) => {
        area.push({ name: lineLabel, x: parseInt(timestamp, 10), y: bytes });
    })

    chartData.push({ areaColor, area })
    const allTimestamps = Object.keys(incomingMessageRate);
    const mostRecentTs = parseInt(allTimestamps[0]);
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
        tickValues
    }
}