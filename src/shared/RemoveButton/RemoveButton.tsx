import { Button, ButtonProps, Tooltip } from "@patternfly/react-core";
import { TrashIcon } from "@patternfly/react-icons";
import { FunctionComponent } from "react";

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
