import { VoidFunctionComponent } from "react";
import { Button, Spinner } from "@patternfly/react-core";
import SyncAltIcon from "@patternfly/react-icons/dist/esm/icons/sync-alt-icon";

export type RefreshButtonProps = {
  ariaLabel: string;
  onClick: () => void;
  isRefreshing: boolean;
};
export const RefreshButton: VoidFunctionComponent<RefreshButtonProps> = ({
  ariaLabel,
  onClick,
  isRefreshing,
}) => (
  <Button variant="plain" aria-label={ariaLabel} onClick={onClick}>
    {isRefreshing ? (
      <span className="pf-c-button__progress">
        <Spinner size="md" />
      </span>
    ) : (
      <SyncAltIcon />
    )}
  </Button>
);
