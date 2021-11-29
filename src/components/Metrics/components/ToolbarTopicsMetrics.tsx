import {
  Button,
  CardActions,
  CardHeader,
  CardTitle,
  Divider,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import SyncIcon from "@patternfly/react-icons/dist/js/icons/sync-icon";
import React, { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { DurationOptions } from "../types";
import { FilterByTime } from "./FilterByTime";
import { FilterByTopic } from "./FilterByTopic";

type ToolbarTopicsMetricsProps = {
  title: string;
  selectedTopic: string | undefined;
  topicList: string[];
  duration: DurationOptions;
  isDisabled: boolean;
  isRefreshing: boolean;
  onSetTimeDuration: (value: DurationOptions) => void;
  onSetSelectedTopic: (value: string | undefined) => void;
  onRefresh: () => void;
};
export const ToolbarTopicsMetrics: FunctionComponent<ToolbarTopicsMetricsProps> = ({
  title,
  selectedTopic,
  topicList,
  duration,
  isDisabled,
  isRefreshing,
  onSetTimeDuration,
  onRefresh,
  onSetSelectedTopic,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <CardHeader>
        <CardTitle component="h2">{title}</CardTitle>
        <CardActions>
          <Toolbar>
            <ToolbarContent>
              <FilterByTopic
                ariaLabel={t("metrics.topics_filter_by_topic")}
                selectedTopic={selectedTopic}
                onSetSelectedTopic={onSetSelectedTopic}
                topicList={topicList}
                disableToolbar={isDisabled}
              />
              <FilterByTime
                ariaLabel={t("metrics.topics_filter_by_time")}
                duration={duration}
                onDurationChange={onSetTimeDuration}
                disableToolbar={isDisabled}
                keyText={"topic-metrics-time-filter"}
              />
              <ToolbarItem>
                <Button
                  isLoading={isRefreshing}
                  variant="plain"
                  aria-label="sync"
                  onClick={onRefresh}
                >
                  {!isRefreshing && <SyncIcon />}
                </Button>
              </ToolbarItem>
            </ToolbarContent>
          </Toolbar>
        </CardActions>
      </CardHeader>
      <Divider />
    </>
  );
};
