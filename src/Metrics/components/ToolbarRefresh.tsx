import { ToolbarItem, Button, Spinner } from "@patternfly/react-core";
import SyncAltIcon from "@patternfly/react-icons/dist/esm/icons/sync-alt-icon";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import React, { useEffect, useState, VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type ToolbarRefreshProps = {
  isRefreshing: boolean;
  lastUpdated: Date | undefined;
  onRefresh: () => void;
};

export const ToolbarRefresh: VoidFunctionComponent<ToolbarRefreshProps> = ({
  isRefreshing,
  lastUpdated = Date.now(),
  onRefresh,
}) => {
  const { t } = useTranslation(["metrics"]);
  const [distance, setDistance] = useState<string>("");
  useEffect(() => {
    function updateDistance() {
      setDistance(formatDistanceToNow(lastUpdated));
    }
    const interval = setInterval(updateDistance, 5 * 1000);
    updateDistance();
    return () => clearInterval(interval);
  }, [lastUpdated]);
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
              {t("metrics:last-refresh-distance", {
                distance,
              })}
            </>
          )}
        </div>
      </ToolbarItem>
    </>
  );
};
