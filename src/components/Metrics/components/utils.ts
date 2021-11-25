import byteSize from "byte-size";
import sub from "date-fns/sub";
import { timeIntervalsMapping } from "../consts";
import { DurationOptions } from "../types";

export function formatBytes(bytes: number): string {
  return byteSize(bytes, { units: "iec" }).toString();
}

export const shouldShowDate = (timeDuration: DurationOptions): boolean => {
  return timeIntervalsMapping[timeDuration].showDate;
};

export const dateToChartValue = (
  date: Date,
  { showDate }: { showDate: boolean } = { showDate: false }
): string => {
  const [dateValue, timeValue] = date.toISOString().split("T");
  return showDate
    ? timeValue.slice(0, 5) + "\n" + dateValue
    : timeValue.slice(0, 5);
};

export function timestampsToTicks(
  timestamps: string[],
  duration: DurationOptions
): number[] {
  const allTimestamps = [...timestamps];
  allTimestamps.sort();
  const mostRecentTs = parseInt(allTimestamps[allTimestamps.length - 1]);
  const tickValues: number[] = new Array(
    Math.max(timeIntervalsMapping[duration].ticks, allTimestamps.length)
  )
    .fill(mostRecentTs)
    .map((d, index) =>
      sub(new Date(d), {
        seconds: timeIntervalsMapping[duration].interval * index,
      }).getTime()
    );
  return tickValues;
}
