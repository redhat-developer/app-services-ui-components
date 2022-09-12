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

  return (
    <>
      <ToolbarItem>
        <RefreshButton
          tooltip={t("kafka:refresh-description")}
          ariaLabel={ariaLabel}
          onClick={onRefresh}
          isRefreshing={isRefreshing}
        />
      </ToolbarItem>
      <ToolbarItem>
        <div
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
        </div>
      </ToolbarItem>
    </>
  );
};
