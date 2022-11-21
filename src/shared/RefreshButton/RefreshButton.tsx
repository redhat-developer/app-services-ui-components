import { Button, Tooltip } from "@patternfly/react-core";
import { SyncAltIcon } from "@patternfly/react-icons";
import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type RefreshButtonProps = {
  isDisabled?: boolean;
  tooltip?: string;
  isRefreshing: boolean;
  ariaLabel?: string;
  onClick: () => void;
};
export const RefreshButton: VoidFunctionComponent<RefreshButtonProps> = ({
  ariaLabel,
  onClick,
  isDisabled,
  tooltip,
  isRefreshing,
}) => {
  const { t } = useTranslation("common");

  return (
    <Tooltip
      content={
        tooltip
          ? tooltip
          : isRefreshing
          ? t("refreshing_tooltip")
          : t("refresh_description")
      }
    >
      <Button
        className="pf-m-hoverable"
        style={{ color: "var(--pf-global--Color--200)" }}
        variant="plain"
        aria-label={ariaLabel || t("refresh_button_label")}
        isDisabled={isDisabled}
        onClick={isDisabled === true ? undefined : onClick}
        isLoading={isRefreshing}
        icon={<SyncAltIcon />}
      />
    </Tooltip>
  );
};
