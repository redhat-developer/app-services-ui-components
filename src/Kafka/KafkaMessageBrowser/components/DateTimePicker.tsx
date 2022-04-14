import { useState } from "react";
import {
  Button,
  CalendarMonth,
  Dropdown,
  DropdownItem,
  DropdownProps,
  DropdownToggle,
  InputGroup,
  Popover,
  TextInput,
  yyyyMMddFormat,
} from "@patternfly/react-core";
import OutlinedCalendarAltIcon from "@patternfly/react-icons/dist/esm/icons/outlined-calendar-alt-icon";
import OutlinedClockIcon from "@patternfly/react-icons/dist/esm/icons/outlined-clock-icon";
import "./DateTimePicker.css";

export const DateTimePicker = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const [valueDate, setValueDate] = useState("YYYY-MM-DD");
  const [valueTime, setValueTime] = useState("Thh:mm:ss.s");
  const times = Array.from(new Array(10), (_, i) => i + 8);
  const defaultTime = "00:00:00:000";
  const dateFormat = (date: Date) => yyyyMMddFormat(date);

  const onToggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
    setIsTimeOpen(false);
  };

  const onToggleTime = () => {
    setIsTimeOpen(!isTimeOpen);
    setIsCalendarOpen(false);
  };

  const onSelectCalendar = (newValueDate: Date) => {
    const newValue = dateFormat(newValueDate);
    setValueDate(newValue);
    setIsCalendarOpen(!isCalendarOpen);
    // setting default time when it is not picked
    if (valueTime === "Thh:mm:ss.s") {
      setValueTime(defaultTime);
    }
  };

  const onSelectTime: DropdownProps["onSelect"] = () => {
    setIsTimeOpen(!isTimeOpen);
  };

  // const onInputChange = newValue => {
  //     setNewValue({ inputValue: newValue });
  // };

  const timeOptions = times.map((time) => {
    const timeString = `${time}:00`;
    return (
      <DropdownItem
        key={time}
        component="button"
        value={`${time}:00:00:000`}
        onClick={() => setValueTime(timeString)}
      >
        {timeString}
      </DropdownItem>
    );
  });
  const calendar = (
    <CalendarMonth date={new Date(valueDate)} onChange={onSelectCalendar} />
  );
  const time = (
    <Dropdown
      onSelect={onSelectTime}
      toggle={
        <DropdownToggle
          aria-label="Toggle the time picker menu"
          toggleIndicator={null}
          onToggle={onToggleTime}
          style={{ padding: "6px 16px" }}
        >
          <OutlinedClockIcon />
        </DropdownToggle>
      }
      isOpen={isTimeOpen}
      dropdownItems={timeOptions}
    />
  );
  const calendarButton = (
    <Button
      variant="control"
      aria-label="Toggle the calendar"
      onClick={onToggleCalendar}
    >
      <OutlinedCalendarAltIcon />
    </Button>
  );

  return (
    <div style={{ width: "325px" }}>
      <Popover
        position="bottom"
        bodyContent={calendar}
        showClose={false}
        isVisible={isCalendarOpen}
        hasNoPadding
        hasAutoWidth
      >
        <InputGroup>
          <TextInput
            className="pf-c-form-control custom-new"
            type="datetime-local"
            id="date-time"
            aria-label="date and time picker"
            // placeholder="YYYY-MM-DDThh:mm:ss.s"
            // onChange={this.onInputChange}
            placeholder={valueDate + "T" + valueTime}
            // onClear={() => {
            //     this.onInputChange('');
            // }}
            // isReadOnly
          />
          {calendarButton}
          {time}
        </InputGroup>
      </Popover>
    </div>
  );
};
