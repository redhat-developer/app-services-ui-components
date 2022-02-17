import { Button, Tooltip } from "@patternfly/react-core";
import { TrashIcon } from "@patternfly/react-icons";
import { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

type RemoveButtonCellProps = {
  removeRow: (row: number) => void;
};

export const RemoveButtonCell: VoidFunctionComponent<RemoveButtonCellProps> = ({
  removeRow,
}) => {
  const { t } = useTranslation();
  return (
    <div className="pf-u-display-flex pf-u-justify-content-flex-end">
      <Tooltip
        content={t(
          "kafka:manage_permissions_dialog.assign_permissions.remove_row_help"
        )}
      >
        <Button variant="link" icon={<TrashIcon />} onClick={() => removeRow} />
      </Tooltip>
    </div>
  );
};
