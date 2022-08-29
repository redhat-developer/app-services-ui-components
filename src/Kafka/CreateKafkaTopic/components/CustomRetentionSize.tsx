import React from "react";
import {
  Flex,
  FlexItem,
  Select,
  SelectOption,
  NumberInput,
  SelectVariant,
} from "@patternfly/react-core";
import type { NumberInputProps, SelectProps } from "@patternfly/react-core";
import type { NewTopic, RetentionSizeUnits, SelectOptions } from "../types";

export type CustomRetentionSizeProps = NumberInputProps &
  SelectProps & {
    id?: string;
    selectOptions: SelectOptions[];
    topicData: NewTopic;
    setTopicData: (data: NewTopic) => void;
  };

const CustomRetentionSize: React.FC<CustomRetentionSizeProps> = ({
  onToggle,
  isOpen,
  selectOptions,
  topicData,
  setTopicData,
}) => {
  const onSelect: SelectProps["onSelect"] = (event, value) => {
    setTopicData({
      ...topicData,
      customRetentionSizeUnit: value as RetentionSizeUnits,
    });

    //}

    onToggle(false, event);
  };

  const handleTouchSpin = (operator: string) => {
    if (operator === "+") {
      setTopicData({
        ...topicData,
        retentionBytes: topicData.retentionBytes + 1,
      });
    } else if (operator === "-") {
      setTopicData({
        ...topicData,
        retentionBytes: topicData.retentionBytes - 1,
      });
    }
  };

  const onChangeTouchSpin = (event: React.FormEvent<HTMLInputElement>) => {
    setTopicData({
      ...topicData,
      retentionBytes: Number(event.currentTarget.value),
    });
  };

  return (
    <div className="kafka-ui--radio__parameters">
      <Flex>
        <FlexItem>
          <NumberInput
            onMinus={() => handleTouchSpin("-")}
            onPlus={() => handleTouchSpin("+")}
            value={topicData.retentionBytes}
            onChange={(event) => onChangeTouchSpin(event)}
            min={0}
          />
        </FlexItem>
        <FlexItem>
          <Select
            variant={SelectVariant.single}
            aria-label="Select Input"
            onToggle={onToggle}
            onSelect={onSelect}
            selections={topicData.customRetentionSizeUnit}
            isOpen={isOpen}
          >
            {selectOptions?.map((s) => (
              <SelectOption
                key={s.key}
                value={s.value}
                isPlaceholder={s.isPlaceholder}
              />
            ))}
          </Select>
        </FlexItem>
      </Flex>
    </div>
  );
};

export { CustomRetentionSize };
