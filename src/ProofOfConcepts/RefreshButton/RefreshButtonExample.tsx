import React from "react";
import { ToolbarItem } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { RefreshButton } from "./RefreshButton";
import { formatDistanceToNow } from "date-fns";

export type RefreshButtonProps = {
  isRefreshing: boolean;
  lastUpdated: Date | undefined;
  ariaLabel: string;
  hoover: string;
  onRefresh: () => void;
};

export const POCRefreshButton: VoidFunctionComponent<RefreshButtonProps> = ({
  isRefreshing,
  lastUpdated = new Date(),
  ariaLabel,
  hoover,
  onRefresh,
}) => {
  const { t } = useTranslation(["metrics"]);

  {
    isRefreshing
      ? (hoover = t("metrics:refreshing"))
      : (hoover =
          t("metrics:last-refresh") +
          " " +
          formatDistanceToNow(lastUpdated) +
          " " +
          t("metrics:last-refresh-distance"));
  }
  return (
    <>
      <ToolbarItem>
        <RefreshButton
          tooltip={hoover}
          ariaLabel={ariaLabel}
          onClick={onRefresh}
          isRefreshing={isRefreshing}
        />
      </ToolbarItem>
    </>
  );
};
