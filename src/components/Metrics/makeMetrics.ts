import sub from "date-fns/sub";
import Prando from "prando";
import { DurationOptions, TimeSeriesMetrics } from "./types";
import { timeIntervalsMapping } from "./consts";

const now = new Date(2021, 1, 29, 11, 45, 0, 0);

export function makeMetrics(
  duration: DurationOptions,
  min: number,
  max: number,
  exp: number,
  offset = 0
): TimeSeriesMetrics {
  const rng = new Prando(duration + min + max); // make the number deterministing to make visual regression testing on Chromatic work
  const ticks = timeIntervalsMapping[duration].ticks;
  const entries = new Array(ticks - offset).fill(now).map((d, index) => [
    sub(new Date(d), {
      seconds: timeIntervalsMapping[duration].interval * (index + offset),
    }).getTime(),
    rng.nextInt(min * exp, max * exp),
  ]);
  const metrics = Object.fromEntries(entries);
  return metrics;
}
