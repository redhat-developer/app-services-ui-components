import { Button, Tooltip } from "@patternfly/react-core";
import { TrashIcon } from "@patternfly/react-icons";
import { FunctionComponent } from "react";

export type RemoveButtonProps = {
  row: number;
  onButtonClick: (row: number) => void;
  ToolTipText: string;
};

export const RemoveButton: FunctionComponent<RemoveButtonProps> = ({
  row,
  ToolTipText,
  onButtonClick,
}) => {
  return (
    <Tooltip content={ToolTipText}>
      <Button variant="plain" onClick={() => onButtonClick(row)}>
        <TrashIcon />
      </Button>
    </Tooltip>
  );
};
