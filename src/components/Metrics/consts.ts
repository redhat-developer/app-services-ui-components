import { DurationOptions } from "./types";

export const timeIntervalsMapping = {
  [DurationOptions.Last5minutes]: {
    interval: 1 * 60,
    ticks: 5,
    showDate: false,
  },
  [DurationOptions.Last15minutes]: {
    interval: 3 * 60,
    ticks: 5,
    showDate: false,
  },
  [DurationOptions.Last30minutes]: {
    interval: 5 * 60,
    ticks: 6,
    showDate: false,
  },
  [DurationOptions.Last1hour]: { interval: 10 * 60, ticks: 6, showDate: false },
  [DurationOptions.Last3hours]: {
    interval: 30 * 60,
    ticks: 6,
    showDate: false,
  },
  [DurationOptions.Last6hours]: {
    interval: 1 * 60 * 60,
    ticks: 6,
    showDate: false,
  },
  [DurationOptions.Last12hours]: {
    interval: 2 * 60 * 60,
    ticks: 6,
    showDate: false,
  },
  [DurationOptions.Last24hours]: {
    interval: 4 * 60 * 60,
    ticks: 6,
    showDate: true,
  },
  [DurationOptions.Last2days]: {
    interval: 8 * 60 * 60,
    ticks: 6,
    showDate: true,
  },
  [DurationOptions.Last7days]: {
    interval: 24 * 60 * 60,
    ticks: 7,
    showDate: true,
  },
} as const;
