import {
  differenceInDays,
  differenceInMonths,
  formatDistanceToNow,
  formatDuration,
  formatISO,
  intervalToDuration,
} from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import type { VoidFunctionComponent } from "react";
import { useState } from "react";
import { useInterval } from "../../utils";

type SupportedFormats =
  | "distanceToNow"
  | "expiration"
  | "long"
  | "longWithMilliseconds"
  | "epoch";

export const FormatMapping: {
  [name in SupportedFormats]: (date: Date) => string;
} = {
  distanceToNow: (date: Date) => formatDistanceToNow(date, { addSuffix: true }),
  expiration: (date: Date) => {
    const months = differenceInMonths(date, Date.now());
    const days = differenceInDays(date, Date.now());
    return formatDuration(
      intervalToDuration({ start: date, end: Date.now() }),
      {
        format:
          months > 0
            ? ["months", "days"]
            : days > 0
            ? ["days", "hours"]
            : ["hours", "minutes"],
      }
    );
  },
  long: (date) => formatInTimeZone(date, "UTC", "PPp zzz"),
  longWithMilliseconds: (date) =>
    formatInTimeZone(date, "UTC", "PP, hh:mm:ss.SSS a zzz"),
  epoch: (date) => formatInTimeZone(date, "UTC", "t"),
};

type FormatDateProps = {
  date: Date;
  format: SupportedFormats | ((date: Date) => string);
  interval?: number;
};

export const FormatDate: VoidFunctionComponent<FormatDateProps> = ({
  date,
  format,
  interval = 5000,
}) => {
  const formatFn =
    typeof format === "function" ? format : FormatMapping[format];
  const [distance, setDistance] = useState<string>("");
  useInterval(() => {
    try {
      setDistance(formatFn(date));
    } catch (e) {
      console.warn(
        `FormatDate can't format date "${date.toISOString()}" with format "${format.toString()}"`
      );
    }
  }, interval);

  return <time dateTime={formatISO(date)}>{distance}</time>;
};
