import React, { useState, VoidFunctionComponent } from "react";
import {
  ToolbarItem,
  Select,
  SelectVariant,
  SelectGroup,
  SelectOption,
  SelectProps,
} from "@patternfly/react-core";
import FilterIcon from "@patternfly/react-icons/dist/js/icons/filter-icon";
import { useTranslation } from "react-i18next";

const widths = {
  default: "100px",
  sm: "80px",
  md: "150px",
  lg: "200px",
  xl: "250px",
  "2xl": "300px",
};

type FilterByTopicProps = {
  selectedTopic: string | undefined;
  topicList: string[];
  disableToolbar: boolean;
  ariaLabel: string;
  onSetSelectedTopic: (value: string | undefined) => void;
};

export const FilterByTopic: VoidFunctionComponent<FilterByTopicProps> = ({
  selectedTopic,
  topicList = [],
  disableToolbar,
  ariaLabel,
  onSetSelectedTopic,
}) => {
  const { t } = useTranslation();
  const [isTopicSelectOpen, setIsTopicSelectOpen] = useState<boolean>(false);

  const allTopicsLabel = t("All topics");

  const onTopicToggle = (isTopicSelectOpen: boolean) => {
    setIsTopicSelectOpen(isTopicSelectOpen);
  };

  const onTopicSelect: SelectProps["onSelect"] = (_, selection) => {
    selection !== "All topics"
      ? onSetSelectedTopic(selection as string)
      : onSetSelectedTopic(undefined);
    setIsTopicSelectOpen(false);
  };

  const onTopicFilter = (_: unknown, textInput: string) => {
    const filteredTopics =
      topicList.filter((topic) => topic.indexOf(textInput) != -1) || [];
    return topicOptions(filteredTopics);
  };

  const topicOptions = (topicList: string[]) => [
    <SelectOption key={"topic-filter-0"} value={allTopicsLabel} />,
    <SelectGroup label="Filter by topic" key="topic-filter-group">
      {topicList.map((topic, index) => (
        <SelectOption key={`topic-filter-${index + 1}`} value={topic} />
      ))}
    </SelectGroup>,
  ];

  const isDisabled = disableToolbar || topicList.length === 0;
  const ariaId = `filter-by-topic-${Date.now()}`;

  return (
    <ToolbarItem widths={widths}>
      <label hidden id={ariaId}>
        {ariaLabel}
      </label>
      <Select
        variant={SelectVariant.single}
        onToggle={onTopicToggle}
        onSelect={onTopicSelect}
        selections={selectedTopic || allTopicsLabel}
        isOpen={isTopicSelectOpen}
        placeholderText={
          <>
            <FilterIcon /> All topics
          </>
        }
        aria-labelledby={ariaId}
        onFilter={onTopicFilter}
        isGrouped
        hasInlineFilter
        isDisabled={isDisabled}
        style={{ width: "100%" }}
      >
        {topicOptions(topicList)}
      </Select>
    </ToolbarItem>
  );
};
