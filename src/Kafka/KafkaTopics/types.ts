import { RetentionSizeUnits, RetentionTimeUnits } from "../types";

export type KafkaTopic = {
  name: string;
  partitions: number;
  "retention.ms": string;
  "retention.bytes": string;
};

export type KafkaTopicField = keyof KafkaTopic;

export const unitsToBytes = {
  [RetentionSizeUnits.BYTE]: 1,
  [RetentionSizeUnits.KIBIBYTE]: 1024,
  [RetentionSizeUnits.MEBIBYTE]: 1048576,
  [RetentionSizeUnits.GIBIBYTE]: 1073741824,
  [RetentionSizeUnits.TEBIBYTE]: 1.0995116e12,
};

export const unitsToMilliSecond = {
  [RetentionTimeUnits.MILLISECOND]: 1,
  [RetentionTimeUnits.SECOND]: 1000,
  [RetentionTimeUnits.MINUTE]: 60000,
  [RetentionTimeUnits.HOUR]: 3600000,
  [RetentionTimeUnits.DAY]: 86400000,
};

type ConversionUnit = {
  value: number;
  unit: string;
};

export const millisecondsToTime = (value: number): ConversionUnit => {
  if (value) {
    if (value % unitsToMilliSecond.days == 0)
      return { value: value / unitsToMilliSecond.days, unit: "days" };
    if (value % unitsToMilliSecond.hours == 0)
      return { value: value / unitsToMilliSecond.hours, unit: "hours" };
    if (value % unitsToMilliSecond.minutes == 0)
      return { value: value / unitsToMilliSecond.minutes, unit: "minutes" };
    if (value % unitsToMilliSecond.seconds == 0)
      return { value: value / unitsToMilliSecond.seconds, unit: "seconds" };
  }

  return { value, unit: "milliseconds" };
};

export const formattedRetentionTime = (time: number): string => {
  const { unit, value } = millisecondsToTime(time);
  return Number(value) === -1 ? "Unlimited" : `${time} ms (${value} ${unit})`;
};

export const formattedRetentionSize = (size: number): string => {
  const { unit, value } = bytesToMemorySize(size);
  return Number(value) === -1
    ? "Unlimited"
    : `${size} bytes (${value} ${unit})`;
};

export const bytesToMemorySize = (value: number): ConversionUnit => {
  if (value) {
    if (value % unitsToBytes.tebibytes == 0)
      return { value: value / unitsToBytes.tebibytes, unit: "tebibytes" };
    if (value % unitsToBytes.gibibytes == 0)
      return { value: value / unitsToBytes.gibibytes, unit: "gibibytes" };
    if (value % unitsToBytes.mebibytes == 0)
      return { value: value / unitsToBytes.mebibytes, unit: "mebibytes" };
    if (value % unitsToBytes.kibibytes == 0)
      return { value: value / unitsToBytes.kibibytes, unit: "kibibytes" };
  }

  return { value, unit: "bytes" };
};
