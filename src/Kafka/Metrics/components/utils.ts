import byteSize from "byte-size";
import { format, utcToZonedTime } from "date-fns-tz";
import fromUnixTime from "date-fns/fromUnixTime";
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
  timestamp: number,
  { showDate }: { showDate: boolean } = { showDate: false }
): string => {
  const date = fromUnixTime(timestamp / 1000);
  return format(
    utcToZonedTime(date, "utc"),
    showDate ? "HH:mm'\n'MM/dd" : "HH:mm"
  );
};

export function timestampsToTicks(
  timestamps: string[],
  duration: DurationOptions
): number[] {
  const allTimestamps = [...timestamps];
  allTimestamps.sort();
  const mostRecentTs =
    parseInt(allTimestamps[allTimestamps.length - 1]) || Date.now();
  return new Array(
    Math.max(timeIntervalsMapping[duration].ticks, allTimestamps.length)
  )
    .fill(mostRecentTs)
    .map((d, index) =>
      sub(new Date(d), {
        seconds: timeIntervalsMapping[duration].interval * index,
      }).getTime()
    );
}
