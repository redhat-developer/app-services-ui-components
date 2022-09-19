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
  onRefresh: () => void;
};

export const POCRefreshButton: VoidFunctionComponent<RefreshButtonProps> = ({
  isRefreshing,
  lastUpdated = new Date(),
  ariaLabel,
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
      <ToolbarItem
        className="pf-u-font-size-xs"
        alignment={{ default: "alignRight" }}
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
