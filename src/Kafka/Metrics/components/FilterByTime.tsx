import { useState, VoidFunctionComponent } from "react";
import {
  ToolbarItem,
  Select,
  SelectVariant,
  SelectGroup,
  SelectOption,
  SelectProps,
} from "@patternfly/react-core";
import { DurationOptions } from "../types";

export const DurationOptionsMap = {
  [DurationOptions.Last5minutes]: "Last 5 minutes",
  [DurationOptions.Last15minutes]: "Last 15 minutes",
  [DurationOptions.Last30minutes]: "Last 30 minutes",
  [DurationOptions.Last1hour]: "Last 1 hour",
  [DurationOptions.Last3hours]: "Last 3 hours",
  [DurationOptions.Last6hours]: "Last 6 hours",
  [DurationOptions.Last12hours]: "Last 12 hours",
  [DurationOptions.Last24hours]: "Last 24 hours",
  [DurationOptions.Last2days]: "Last 2 days",
  [DurationOptions.Last7days]: "Last 7 days",
} as const;

type FilterByTimeProps = {
  duration: DurationOptions;
  onDurationChange: (value: DurationOptions) => void;
  keyText: string;
  ariaLabel: string;
  disableToolbar: boolean;
};

export const FilterByTime: VoidFunctionComponent<FilterByTimeProps> = ({
  duration,
  keyText,
  ariaLabel,
  disableToolbar,
  onDurationChange,
}) => {
  const [isTimeSelectOpen, setIsTimeSelectOpen] = useState<boolean>(false);

  const onTimeToggle = (isTimeSelectOpen: boolean) => {
    setIsTimeSelectOpen(isTimeSelectOpen);
  };

  const onTimeSelect: SelectProps["onSelect"] = (_, selection) => {
    const mapping = Object.entries(DurationOptionsMap).find(
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      ([_, value]) => value === selection
    );
    if (mapping) {
      onDurationChange(parseInt(mapping[0], 10) as DurationOptions);
    }
    setIsTimeSelectOpen(false);
  };

  const timeOptions = (keyText: string) => [
    <SelectGroup label="Relative time ranges" key={`${keyText}-group`}>
      {Object.values(DurationOptionsMap).map((label, idx) => (
        <SelectOption key={`${keyText}-${idx}`} value={label} />
      ))}
    </SelectGroup>,
  ];
  const ariaId = `filter-by-time-${Date.now()}`;
  return (
    <ToolbarItem>
      <label hidden id={ariaId}>
        {ariaLabel}
      </label>
      <Select
        variant={SelectVariant.single}
        aria-labelledby={ariaId}
        onToggle={onTimeToggle}
        onSelect={onTimeSelect}
        selections={DurationOptionsMap[duration]}
        isOpen={isTimeSelectOpen}
        isDisabled={disableToolbar}
      >
        {timeOptions(keyText)}
      </Select>
    </ToolbarItem>
  );
};
