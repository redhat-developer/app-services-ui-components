import { formatDistanceToNow } from "date-fns";
import React from "react";
import { useState, VoidFunctionComponent } from "react";
import { useInterval } from "../../utils";

type DistanceFromNowProps = {
  date: Date;
  format?: (date: Date) => string;
  interval?: number;
};

export const DistanceFromNow: VoidFunctionComponent<DistanceFromNowProps> = ({
  date,
  format = formatDistanceToNow,
  interval = 5000,
}) => {
  const [distance, setDistance] = useState<string>("");
  useInterval(() => {
    setDistance(format(date));
  }, interval);

  return <time dateTime={date.toISOString()}>{distance}</time>;
};
