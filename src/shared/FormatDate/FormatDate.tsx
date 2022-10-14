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
import type { TFunction } from "react-i18next";
import { useTranslation } from "react-i18next";
import { useInterval } from "../../utils";

type SupportedFormats =
  | "distanceToNow"
  | "distanceToNowWithAgo"
  | "expiration"
  | "long"
  | "longWithMilliseconds"
  | "epoch";

export const FormatMapping: {
  [name in SupportedFormats]: (date: Date, trans: TFunction) => string;
} = {
  distanceToNow: (date) => formatDistanceToNow(date),
  distanceToNowWithAgo: (date, t) =>
    t("common:distance-to-now-ago", { date: formatDistanceToNow(date) }),
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
  const { t } = useTranslation();
  const formatFn =
    typeof format === "function" ? format : FormatMapping[format];
  const [distance, setDistance] = useState<string>("");
  useInterval(() => {
    try {
      setDistance(formatFn(date, t));
    } catch (e) {
      console.warn(
        `FormatDate can't format date "${date.toISOString()}" with format "${format.toString()}"`
      );
    }
  }, interval);

  return <time dateTime={formatISO(date)}>{distance}</time>;
};
