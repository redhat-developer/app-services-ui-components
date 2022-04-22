import {
  DatePicker,
  DatePickerProps,
  InputGroup,
  TimePicker,
  TimePickerProps,
} from "@patternfly/react-core";
import { format, formatISO, setHours, setMinutes } from "date-fns";
import { VoidFunctionComponent } from "react";
import { DateIsoString } from "../types";
import "./DateTimePicker.css";

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
  const date = value ? new Date(value) : undefined;

  const onSelectCalendar: DatePickerProps["onChange"] = (_, newDate) => {
    if (newDate) {
      onChange(formatISO(newDate));
    }
  };

  const onSelectTime: TimePickerProps["onChange"] = (
    _,
    hour,
    minute,
    __,
    isValid
  ) => {
    //onChange();
    if (isValid && date) {
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
        value={date ? format(date, "yyyy-MM-dd") : undefined}
        onChange={onSelectCalendar}
      />
      <TimePicker
        key={value}
        isDisabled={!date || isDisabled}
        time={date}
        onChange={onSelectTime}
      />
    </InputGroup>
  );
};
