import type { ButtonProps } from "@patternfly/react-core";
import { Button, Tooltip } from "@patternfly/react-core";
import { TrashIcon } from "@patternfly/react-icons";
import type { FunctionComponent } from "react";

export type RemoveButtonProps = {
  onClick: () => void;
  tooltip: string;
  variant?: ButtonProps["variant"];
};

export const RemoveButton: FunctionComponent<RemoveButtonProps> = ({
  tooltip,
  onClick,
  variant = "plain",
}) => {
  return (
    <Tooltip content={tooltip}>
      <Button variant={variant} onClick={onClick}>
        <TrashIcon />
      </Button>
    </Tooltip>
  );
};
