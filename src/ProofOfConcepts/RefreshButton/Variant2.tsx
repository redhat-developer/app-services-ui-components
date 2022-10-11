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
  const { t } = useTranslation(["kafka"]);

  {
    isRefreshing
      ? (hoover = t("kafka:refreshing_tooltip"))
      : (hoover = t("kafka:refresh_description"));
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
      <ToolbarItem
        className="pf-u-font-size-xs"
        style={{ color: "var(--pf-global--Color--200)" }}
      >
        {isRefreshing
          ? t("kafka:refreshing")
          : t("kafka:last-refresh") +
            " " +
            formatDistanceToNow(lastUpdated) +
            " " +
            t("kafka:last-refresh-distance")}
      </ToolbarItem>
    </>
  );
};
