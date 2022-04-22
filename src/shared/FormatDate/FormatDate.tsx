import {
  differenceInDays,
  differenceInMonths,
  format,
  formatDistanceToNow,
  formatDuration,
  formatISO,
  intervalToDuration,
} from "date-fns";
import { useState, VoidFunctionComponent } from "react";
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
  distanceToNow: formatDistanceToNow,
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
  long: (date) => format(date, "PPp"),
  longWithMilliseconds: (date) => format(date, "PP, hh:mm:ss.SSS a"),
  epoch: (date) => format(date, "t"),
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
        `FormatDate can't format date "${date}" with format "${format}"`
      );
    }
  }, interval);

  return <time dateTime={formatISO(date)}>{distance}</time>;
};
