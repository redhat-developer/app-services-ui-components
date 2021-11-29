import React, { FunctionComponent } from "react";
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
import { FilterByTime } from "./FilterByTime";
import { DurationOptions } from "../types";
import { useTranslation } from "react-i18next";

type ToolbarKafkaInstanceMetricProps = {
  title: string;
  isDisabled: boolean;
  isRefreshing: boolean;
  duration: DurationOptions;
  onSetTimeDuration: (value: DurationOptions) => void;
  onRefresh: () => void;
};
export const ToolbarKafkaInstanceMetric: FunctionComponent<ToolbarKafkaInstanceMetricProps> = ({
  title,
  isDisabled,
  isRefreshing,
  duration,
  onSetTimeDuration,
  onRefresh,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <CardHeader>
        <CardTitle component="h2">{title}</CardTitle>
        <CardActions>
          <Toolbar>
            <ToolbarContent>
              <FilterByTime
                ariaLabel={t("metrics.kafka_instance_filter_by_time")}
                duration={duration}
                onDurationChange={onSetTimeDuration}
                keyText={"kafka-metrics-time-filter"}
                disableToolbar={isDisabled}
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
