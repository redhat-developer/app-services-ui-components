import {
  InputGroup,
  InputGroupText,
  InputGroupTextVariant,
  Select,
  SelectOption,
  SelectProps,
  SelectVariant,
} from "@patternfly/react-core";
import { useCallback, useMemo, useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

const MAX_OPTIONS = 20;

export type PartitionSelectorProps = {
  value: number;
  partitions: number;
  isDisabled: boolean;
  onChange: (value: number) => void;
};
export const PartitionSelector: VoidFunctionComponent<
  PartitionSelectorProps
> = ({ value, partitions, isDisabled, onChange }) => {
  const { t } = useTranslation("message-browser");
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (isOpen: boolean) => setIsOpen(isOpen);
  const titleId = "partition-selector";

  const handleChange = useCallback(
    (value: number | undefined) => {
      if (value && Number.isInteger(value)) {
        onChange(value);
      }
      setIsOpen(false);
    },
    [onChange]
  );

  const allPartitions = useMemo(() => {
    return new Array(partitions).fill(0).map((_, index) => index.toString());
  }, [partitions]);

  const makeOptions = useCallback(
    (values: string[]) => {
      const options = values
        .slice(0, MAX_OPTIONS)
        .map((v) => <SelectOption key={v} value={v} />);
      const hiddenOptionsCount = values.length - options.length;
      return hiddenOptionsCount
        ? [
            ...options,
            <SelectOption
              key={"more-info"}
              isDisabled={true}
              description={t("partitions_hidden", {
                count: hiddenOptionsCount,
              })}
            />,
          ]
        : options;
    },
    [t]
  );

  const options = useMemo(() => {
    return makeOptions(allPartitions);
  }, [allPartitions, makeOptions]);

  const handleFilter: SelectProps["onFilter"] = useCallback(
    (_, filter) => {
      if (filter !== "") {
        return makeOptions(
          allPartitions.filter((partition) => partition.includes(filter))
        );
      }
      return options;
    },
    [allPartitions, makeOptions, options]
  );

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
          onSelect={(_, value) => handleChange(parseInt(value as string, 10))}
          selections={[`${value}`]}
          isOpen={isOpen}
          aria-labelledby={titleId}
          maxHeight={200}
          width={150}
          onFilter={handleFilter}
          isInputValuePersisted={false}
          isDisabled={isDisabled}
        >
          {options}
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
