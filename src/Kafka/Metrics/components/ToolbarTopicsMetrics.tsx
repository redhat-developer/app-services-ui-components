import {
  CardHeader,
  CardTitle,
  Divider,
  Toolbar,
  ToolbarContent,
} from "@patternfly/react-core";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DurationOptions } from "../types";
import { FilterByTime } from "./FilterByTime";
import { FilterByTopic } from "./FilterByTopic";
import { ToolbarRefresh, ToolbarRefreshProps } from "./ToolbarRefresh";

type ToolbarTopicsMetricsProps = {
  title: string;
  selectedTopic: string | undefined;
  topicList: string[];
  duration: DurationOptions;
  isDisabled: boolean;
  onSetTimeDuration: (value: DurationOptions) => void;
  onSetSelectedTopic: (value: string | undefined) => void;
} & ToolbarRefreshProps;
export const ToolbarTopicsMetrics: FunctionComponent<
  ToolbarTopicsMetricsProps
> = ({
  title,
  selectedTopic,
  topicList,
  duration,
  isDisabled,
  isRefreshing,
  lastUpdated,
  onSetTimeDuration,
  onRefresh,
  onSetSelectedTopic,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <CardHeader>
        <CardTitle component="h2">{title}</CardTitle>
      </CardHeader>
      <Divider />
      <Toolbar>
        <ToolbarContent>
          <FilterByTopic
            ariaLabel={t("metrics:topics_filter_by_topic")}
            selectedTopic={selectedTopic}
            onSetSelectedTopic={onSetSelectedTopic}
            topicList={topicList}
            disableToolbar={isDisabled}
          />
          <FilterByTime
            ariaLabel={t("metrics:topics_filter_by_time")}
            duration={duration}
            onDurationChange={onSetTimeDuration}
            disableToolbar={isDisabled}
            keyText={"topic-metrics-time-filter"}
          />
          <ToolbarRefresh
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
            onRefresh={onRefresh}
          />
        </ToolbarContent>
      </Toolbar>
      <Divider />
    </>
  );
};
