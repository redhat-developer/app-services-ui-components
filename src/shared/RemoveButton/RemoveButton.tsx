import { Button, Tooltip } from "@patternfly/react-core";
import { TrashIcon } from "@patternfly/react-icons";
import { FunctionComponent } from "react";

export type RemoveButtonProps = {
  onButtonClick: (value: number) => void;
  ToolTipText: string;
};

export const RemoveButton: FunctionComponent<RemoveButtonProps> = ({
  ToolTipText,
  onButtonClick,
}) => {
  return (
    <Tooltip content={ToolTipText}>
      <Button variant="plain" onClick={() => onButtonClick}>
        <TrashIcon />
      </Button>
    </Tooltip>
  );
};
