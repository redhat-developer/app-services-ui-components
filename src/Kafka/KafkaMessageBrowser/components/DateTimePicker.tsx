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
} from "@patternfly/react-core";
import OutlinedCalendarAltIcon from "@patternfly/react-icons/dist/esm/icons/outlined-calendar-alt-icon";
import OutlinedClockIcon from "@patternfly/react-icons/dist/esm/icons/outlined-clock-icon";
import { format, isFuture, setHours } from "date-fns";
import { useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import "./DateTimePicker.css";

export type DateTimePickerProps = {
  isDisabled: boolean;
  value: number | undefined;
  dateTimeFormat?: string;
  onChange: (value: Date) => void;
};
export const DateTimePicker: VoidFunctionComponent<DateTimePickerProps> = ({
  isDisabled,
  value,
  dateTimeFormat = "yyyy-MM-d'T'HH:mm:ss.SSS",
  onChange,
}) => {
  const { t } = useTranslation("message-browser");
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const times = Array.from(new Array(10), (_, i) => i + 8);

  const date = new Date(value || Date.now());

  const onToggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
    setIsTimeOpen(false);
  };

  const onToggleTime = () => {
    setIsTimeOpen(!isTimeOpen);
    setIsCalendarOpen(false);
  };

  const onSelectCalendar = (newValueDate: Date) => {
    onChange(newValueDate);
    setIsCalendarOpen(!isCalendarOpen);
  };

  const onSelectTime: DropdownProps["onSelect"] = () => {
    //onChange();
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
        onClick={() => {
          const newDate = setHours(date, time);
          onChange(newDate);
        }}
      >
        {timeString}
      </DropdownItem>
    );
  });

  return (
    <div style={{ width: "325px" }}>
      <Popover
        position="bottom"
        bodyContent={
          <CalendarMonth
            date={value ? date : undefined}
            onChange={onSelectCalendar}
            validators={[(date) => !isFuture(date)]}
          />
        }
        showClose={false}
        isVisible={isCalendarOpen}
        hasNoPadding
        hasAutoWidth
      >
        <InputGroup>
          <TextInput
            type="text"
            id="date-time"
            aria-label={t("filter.timestamp_aria_label")}
            placeholder="YYYY-MM-DDThh:mm:ss.s"
            value={value ? format(value, dateTimeFormat) : ""}
            isDisabled={true}
          />
          <Button
            isDisabled={isDisabled}
            variant="control"
            aria-label={t("filter.timestamp_toggle_calendar_menu")}
            onClick={onToggleCalendar}
          >
            <OutlinedCalendarAltIcon />
          </Button>
          <Dropdown
            onSelect={onSelectTime}
            toggle={
              <DropdownToggle
                isDisabled={isDisabled}
                aria-label={t("filter.timestamp_toggle_time_menu")}
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
        </InputGroup>
      </Popover>
    </div>
  );
};
