import Prando from "prando";
import { DurationOptions, TimeSeriesMetrics } from "./types";
import { timeIntervalsMapping } from "./consts";
import sub from "date-fns/sub";

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

export function makeGrowingMetrics(
  duration: DurationOptions,
  minIncrement: number,
  maxIncrement: number,
  startExp: number,
  incrementExp: number,
  offset = 0
): TimeSeriesMetrics {
  const rng = new Prando(duration + minIncrement + maxIncrement); // make the number deterministing to make visual regression testing on Chromatic work
  const ticks = timeIntervalsMapping[duration].ticks - offset;
  const values = new Array<number>(ticks)
    .fill(0)
    .reduce<number[]>((prev, _, idx) => {
      const newVal =
        (prev[idx - 1] || rng.nextInt() * startExp) +
        rng.nextInt() * incrementExp;
      return [...prev, newVal];
    }, [])
    .reverse();
  const entries = new Array(ticks).fill(now).map((d, index) => [
    sub(new Date(d), {
      seconds: timeIntervalsMapping[duration].interval * (index + offset),
    }).getTime(),
    values[index],
  ]);
  const metrics = Object.fromEntries(entries);
  return metrics;
}
