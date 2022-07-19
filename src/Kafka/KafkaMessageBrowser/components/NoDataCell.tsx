import type { VoidFunctionComponent } from "react";
import { useTranslation } from "react-i18next";

export type NoDataCellProps = {
  columnLabel: string;
};
export const NoDataCell: VoidFunctionComponent<NoDataCellProps> = ({
  columnLabel,
}) => {
  const { t } = useTranslation("common");
  return (
    <span className="pf-u-color-400">
      {t("table_cell_no_data", { column: columnLabel })}
    </span>
  );
};
