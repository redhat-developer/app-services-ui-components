import { ToolbarItem } from "@patternfly/react-core";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";
import { FormatDate, RefreshButton } from "../../../shared";

export type ToolbarRefreshProps = {
  isRefreshing: boolean;
  lastUpdated: Date | undefined;
  ariaLabel: string;
  onRefresh: () => void;
};

export const ToolbarRefresh: VoidFunctionComponent<ToolbarRefreshProps> = ({
  isRefreshing,
  lastUpdated = new Date(),
  ariaLabel,
  onRefresh,
}) => {
  const { t } = useTranslation(["metrics"]);

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
            </>
          )}
        </div>
      </ToolbarItem>
    </>
  );
};
