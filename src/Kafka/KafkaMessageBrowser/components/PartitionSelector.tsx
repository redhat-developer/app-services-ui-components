import { useState, VoidFunctionComponent } from "react";
import {
  InputGroup,
  InputGroupText,
  InputGroupTextVariant,
  Select,
  SelectOption,
  SelectVariant,
} from "@patternfly/react-core";
import { useTranslation } from "react-i18next";

export type PartitionSelectorProps = {
  value: number | undefined;
  partitions: number;
  onChange: (value: number | undefined) => void;
};
export const PartitionSelector: VoidFunctionComponent<
  PartitionSelectorProps
> = ({ value, partitions, onChange }) => {
  const { t } = useTranslation("message-browser");
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (isOpen: boolean) => setIsOpen(isOpen);
  const titleId = "partition-selector";

  return (
    <InputGroup>
      <InputGroupText className="pf-c-content">Partition</InputGroupText>
      <div>
        <span id={titleId} hidden>
          Select a state
        </span>
        <Select
          variant={SelectVariant.typeahead}
          typeAheadAriaLabel={t("select_partition_typeahead")}
          onToggle={toggleOpen}
          onSelect={(_, value) => onChange(parseInt(value as string, 10))}
          selections={[value]}
          isOpen={isOpen}
          aria-labelledby={titleId}
          maxHeight={200}
          width={110}
          placeholderText={"0"}
        >
          {new Array(partitions).fill(0).map((_, index) => (
            <SelectOption key={index} value={index} />
          ))}
        </Select>
      </div>
      <InputGroupText
        id={`${titleId}-input`}
        variant={InputGroupTextVariant.plain}
        className="pf-c-content"
      >
        {t("select_partition_of_count", { partitions })}
      </InputGroupText>
    </InputGroup>
  );
};
