import { Button, Spinner, ToolbarItem } from "@patternfly/react-core";
import SyncAltIcon from "@patternfly/react-icons/dist/esm/icons/sync-alt-icon";
import React, { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FormatDate } from "../../shared/FormatDate";

export type ToolbarRefreshProps = {
  isRefreshing: boolean;
  lastUpdated: Date | undefined;
  onRefresh: () => void;
};

export const ToolbarRefresh: VoidFunctionComponent<ToolbarRefreshProps> = ({
  isRefreshing,
  lastUpdated = new Date(),
  onRefresh,
}) => {
  const { t } = useTranslation(["metrics"]);

  return (
    <>
      <ToolbarItem>
        <Button variant="plain" aria-label="sync" onClick={onRefresh}>
          {isRefreshing ? (
            <span className="pf-c-button__progress">
              <Spinner size="md" />
            </span>
          ) : (
            <SyncAltIcon />
          )}
        </Button>
      </ToolbarItem>
      <ToolbarItem
        alignment={{ default: "alignRight" }}
        style={{ color: "var(--pf-global--Color--200)" }}
      >
        <div className="pf-u-font-size-xs">
          {isRefreshing ? (
            t("metrics:refreshing")
          ) : (
            <>
              {t("metrics:last-refresh")}
              <br />
              <FormatDate date={lastUpdated} format="distanceToNow" />
              {t("metrics:last-refresh-distance")}
            </>
          )}
        </div>
      </ToolbarItem>
    </>
  );
};
