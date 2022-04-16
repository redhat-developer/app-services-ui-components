import {
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownSeparator,
  DropdownToggle,
  InputGroup,
  TextInput,
  ToolbarItem,
} from "@patternfly/react-core";

import { useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DateTimePicker } from "./DateTimePicker";

type Category = "offset" | "timestamp" | "epoch" | "latest";
export type FilterGroupProps = {
  isDisabled: boolean;
  offset: number | undefined;
  timestamp: number | undefined;
  onOffsetChange: (value: number) => void;
  onTimestampChange: (value: Date | undefined) => void;
  onEpochChange: (value: number | undefined) => void;
  onLatest: () => void;
};
export const FilterGroup: VoidFunctionComponent<FilterGroupProps> = ({
  isDisabled,
  offset,
  timestamp,
  onOffsetChange,
  onTimestampChange,
  onEpochChange,
  onLatest,
}) => {
  const { t } = useTranslation("message-browser");
  const [currentCategory, setCurrentCategory] = useState<Category>("offset");
  const [isOpen, setIsOpen] = useState(false);
  const labels: { [key in Category]: string } = {
    offset: t("filter.offset"),
    timestamp: t("filter.timestamp"),
    epoch: t("filter.epoch"),
    latest: t("filter.latest"),
  };
  return (
    <ToolbarItem>
      <InputGroup>
        <Dropdown
          toggle={
            <DropdownToggle onToggle={setIsOpen} isDisabled={isDisabled}>
              {labels[currentCategory]}
            </DropdownToggle>
          }
          position={DropdownPosition.left}
          isOpen={isOpen}
          onSelect={() => setIsOpen(false)}
          dropdownItems={[
            <DropdownItem
              key="offset"
              value="offset"
              autoFocus={currentCategory === "offset"}
              onClick={() => setCurrentCategory("offset")}
            >
              {labels["offset"]}
            </DropdownItem>,
            <DropdownItem
              key="timestamp"
              value="timestamp"
              autoFocus={currentCategory === "timestamp"}
              onClick={() => setCurrentCategory("timestamp")}
            >
              {labels["timestamp"]}
            </DropdownItem>,
            <DropdownItem
              key="epoch"
              value="epoch"
              autoFocus={currentCategory === "epoch"}
              onClick={() => setCurrentCategory("epoch")}
            >
              {labels["epoch"]}
            </DropdownItem>,
            <DropdownSeparator key={"divider"} />,
            <DropdownItem
              key="latest"
              value="latest"
              autoFocus={currentCategory === "latest"}
              onClick={() => {
                setCurrentCategory("latest");
                onLatest();
              }}
            >
              {labels["latest"]}
            </DropdownItem>,
          ]}
        />
        {currentCategory === "offset" && (
          <TextInput
            isDisabled={isDisabled}
            type={"number"}
            aria-label={t("filter.offset_aria_label")}
            placeholder={t("filter.offset_placeholder")}
            onChange={(value) => {
              if (value !== "") {
                const newOffset = parseInt(value, 10);
                if (Number.isInteger(newOffset)) {
                  onOffsetChange(newOffset);
                }
              }
            }}
            value={offset || ""}
          />
        )}
        {currentCategory === "timestamp" && (
          <DateTimePicker
            isDisabled={isDisabled}
            value={timestamp ? timestamp * 1000 : undefined}
            onChange={onTimestampChange}
          />
        )}
        {currentCategory === "epoch" && (
          <TextInput
            isDisabled={isDisabled}
            type={"number"}
            aria-label={t("filter.epoch_aria_label")}
            placeholder={t("filter.epoch_placeholder")}
            onChange={(value) => {
              if (value !== "") {
                const epoch = parseInt(value, 10);
                onEpochChange(epoch);
              } else {
                onEpochChange(undefined);
              }
            }}
            value={timestamp || ""}
          />
        )}
      </InputGroup>
    </ToolbarItem>
  );
};
