import {
  DatePicker,
  DatePickerProps,
  InputGroup,
  TimePicker,
  TimePickerProps,
} from "@patternfly/react-core";
import { formatISO, parseISO, setHours, setMinutes } from "date-fns";
import { formatInTimeZone } from "date-fns-tz";
import { VoidFunctionComponent } from "react";
import { DateIsoString } from "../types";

export type DateTimePickerProps = {
  isDisabled: boolean;
  value: DateIsoString | undefined;
  onChange: (value: DateIsoString) => void;
};
export const DateTimePicker: VoidFunctionComponent<DateTimePickerProps> = ({
  isDisabled,
  value,
  onChange,
}) => {
  const date = value ? parseISO(value) : undefined;

  const onSelectCalendar: DatePickerProps["onChange"] = (_, newDate) => {
    if (newDate) {
      onChange(formatISO(newDate));
    }
  };

  const onSelectTime: TimePickerProps["onChange"] = (_, hour, minute, __) => {
    //onChange();
    if (date) {
      let newDate = date;
      if (hour !== undefined) {
        newDate = setHours(newDate, hour);
      }
      if (minute !== undefined) {
        newDate = setMinutes(newDate, minute);
      }
      onChange(formatISO(newDate));
    }
  };

  return (
    <InputGroup>
      <DatePicker
        isDisabled={isDisabled}
        value={date ? formatInTimeZone(date, "UTC", "yyyy-MM-dd") : undefined}
        onChange={onSelectCalendar}
      />
      <TimePicker
        isDisabled={!date || isDisabled}
        time={date || "00:00 AM"}
        onChange={onSelectTime}
      />
    </InputGroup>
  );
};
