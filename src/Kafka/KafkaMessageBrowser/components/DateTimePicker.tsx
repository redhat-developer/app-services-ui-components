import {
  DatePicker,
  DatePickerProps,
  InputGroup,
  TimePicker,
  TimePickerProps,
} from "@patternfly/react-core";
import { format, setHours, setMinutes } from "date-fns";
import { VoidFunctionComponent } from "react";
import "./DateTimePicker.css";

export type DateTimePickerProps = {
  isDisabled: boolean;
  value: number | undefined;
  dateFormat?: string;
  timeFormat?: string;
  onChange: (value: Date) => void;
};
export const DateTimePicker: VoidFunctionComponent<DateTimePickerProps> = ({
  isDisabled,
  value,
  dateFormat = "yyyy-MM-dd",
  timeFormat = "hh:mm:ss.SSS",
  onChange,
}) => {
  const date = value ? new Date(value) : undefined;

  const onSelectCalendar: DatePickerProps["onChange"] = (_, newValueDate) => {
    if (newValueDate) {
      onChange(newValueDate);
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
      onChange(newDate);
    }
  };

  return (
    <InputGroup>
      <DatePicker
        isDisabled={isDisabled}
        value={date ? format(date, dateFormat) : undefined}
        onChange={onSelectCalendar}
      />
      <TimePicker
        key={value}
        isDisabled={!date || isDisabled}
        time={date}
        onChange={onSelectTime}
        menuAppendTo={"parent"}
      />
    </InputGroup>
  );
};
