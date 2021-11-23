import byteSize from "byte-size";
import { DurationOptions, SupportedSizes } from "../types";

export const getLargestByteSize = (data: number[]): SupportedSizes => {
  return data.reduce((currentByteSize, datum) => {
    const byteString = byteSize(datum).unit;
    if (byteString === "kiB") {
      if (currentByteSize === "B") {
        currentByteSize = "kiB";
      }
    }
    if (byteString === "MiB") {
      if (currentByteSize === "B" || currentByteSize === "kiB") {
        currentByteSize = "MiB";
      }
    }
    if (byteString === "GiB") {
      if (
        currentByteSize === "B" ||
        currentByteSize === "kiB" ||
        currentByteSize === "MiB"
      ) {
        currentByteSize = "GiB";
      }
    }
    return currentByteSize;
  }, "B" as SupportedSizes);
};

export const convertToSpecifiedByte = (
  bytes: number,
  largestByteSize: SupportedSizes
): number => {
  if (largestByteSize === "B") {
    return Math.round(bytes * 10) / 10;
  }
  if (largestByteSize === "kiB") {
    return Math.round((bytes / 1024) * 10) / 10;
  }
  if (largestByteSize === "MiB") {
    return Math.round((bytes / 1024 / 1024) * 10) / 10;
  }
  if (largestByteSize === "GiB") {
    return Math.round((bytes / 1024 / 1024 / 1024) * 10) / 10;
  }
  return bytes;
};

export const shouldShowDate = (timeDuration: DurationOptions): boolean => {
  return timeDuration >= 24 * 60 ? true : false;
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
