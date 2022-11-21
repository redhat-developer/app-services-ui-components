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
  tooltip: string;
};

export const POCRefreshButton: VoidFunctionComponent<RefreshButtonProps> = ({
  isRefreshing,
  lastUpdated = new Date(),
  ariaLabel,
  onRefresh,
  tooltip,
}) => {
  const { t } = useTranslation(["common"]);

  return (
    <>
      <ToolbarItem>
        <RefreshButton
          tooltip={
            isRefreshing
              ? t("common:refreshing")
              : t("common:refresh_description") +
                ":" +
                "\n" +
                t("common:last-refresh") +
                " " +
                formatDistanceToNow(lastUpdated) +
                " " +
                t("common:last-refresh-distance")
          }
          ariaLabel={ariaLabel}
          onClick={onRefresh}
          isRefreshing={isRefreshing}
        />
      </ToolbarItem>
    </>
  );
};
