export type TotalBytesMetrics = { [timestamp: string]: number };
export type PartitionBytesMetric = { [partition: string]: TotalBytesMetrics };
export type SupportedSizes = "B" | "kiB" | "MiB" | "GiB";

export const timeIntervalsMapping = {
  5: 1 * 60, // Last 5 minutes: 5 ticks / 1 minute
  15: 3 * 60, // Last 15 minutes: 5 ticks / 3 minutes
  30: 5 * 60, // Last 30 minutes: 6 ticks / 5 minutes
  60: 10 * 60, // Last 1 hour: 6 ticks / 10 minutes
  [3 * 60]: 30 * 60, // Last 3 hours: 6 ticks / 30 minutes
  [6 * 60]: 1 * 60 * 60, // Last 6 hours: 6 ticks / 1 hour
  [12 * 60]: 2 * 60 * 60, // Last 12 hours: 6 ticks / 2 hours
  [24 * 60]: 4 * 60 * 60, // Last 24 hours: 6 ticks / 4 hours - date & time should display
  [2 * 24 * 60]: 8 * 60 * 60, // Last 2 days: 6 ticks / 8 hours - date & time should display
  [7 * 24 * 60]: 24 * 60 * 60, // Last 7 days: 7 ticks / 1 day - date & time should display
} as const;
export type DurationOptions = keyof typeof timeIntervalsMapping;
