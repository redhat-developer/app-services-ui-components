import React, { FunctionComponent } from "react";
import {
  CardHeader,
  CardTitle,
  Divider,
  Toolbar,
  ToolbarContent,
} from "@patternfly/react-core";
import { FilterByTime } from "./FilterByTime";
import { DurationOptions } from "../types";
import { useTranslation } from "react-i18next";
import { ToolbarRefresh, ToolbarRefreshProps } from "./ToolbarRefresh";

type ToolbarKafkaInstanceMetricProps = {
  title: string;
  isDisabled: boolean;
  duration: DurationOptions;
  onSetTimeDuration: (value: DurationOptions) => void;
} & Omit<ToolbarRefreshProps, "ariaLabel">;
export const ToolbarKafkaInstanceMetric: FunctionComponent<
  ToolbarKafkaInstanceMetricProps
> = ({
  title,
  isDisabled,
  isRefreshing,
  lastUpdated,
  duration,
  onSetTimeDuration,
  onRefresh,
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
          <FilterByTime
            ariaLabel={t("metrics:kafka_instance_filter_by_time")}
            duration={duration}
            onDurationChange={onSetTimeDuration}
            keyText={"kafka-metrics-time-filter"}
            disableToolbar={isDisabled}
          />
          <ToolbarRefresh
            isRefreshing={isRefreshing}
            lastUpdated={lastUpdated}
            onRefresh={onRefresh}
            ariaLabel={t("metrics:kafka_instance_refresh")}
          />
        </ToolbarContent>
      </Toolbar>
      <Divider />
    </>
  );
};
