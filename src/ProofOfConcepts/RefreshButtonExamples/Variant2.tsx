import React from "react";
import { ToolbarItem } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { RefreshButton } from "../../shared/RefreshButton/RefreshButton";
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
  const { t } = useTranslation(["common"]);

  return (
    <>
      <ToolbarItem>
        <RefreshButton
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
          ? t("common:refreshing")
          : t("common:last-refresh") +
            " " +
            formatDistanceToNow(lastUpdated) +
            " " +
            t("common:last-refresh-distance")}
      </ToolbarItem>
    </>
  );
};
