import { Button, Tooltip } from "@patternfly/react-core";
import { TrashIcon } from "@patternfly/react-icons";
import { FunctionComponent } from "react";
import { RemovableEnhancedAclBinding } from "../../Kafka/ManageKafkaPermissions/types";

export type RemoveButtonProps = {
  row: number | string;
  onButtonClick: (row: number | string) => void;
  ToolTipText: string;
  variant?:
    | "link"
    | "plain"
    | "primary"
    | "secondary"
    | "tertiary"
    | "danger"
    | "warning"
    | "control";
};

export const RemoveButton: FunctionComponent<RemoveButtonProps> = ({
  row,
  ToolTipText,
  onButtonClick,
  variant = "plain",
}) => {
  return (
    <Tooltip content={ToolTipText}>
      <Button variant={variant} onClick={() => onButtonClick(row)}>
        <TrashIcon />
      </Button>
    </Tooltip>
  );
};
