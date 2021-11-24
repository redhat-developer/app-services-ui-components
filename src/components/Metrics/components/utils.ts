import byteSize from "byte-size";
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
