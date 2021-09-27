import React, {
  createContext,
  FunctionComponent,
  Ref,
  useContext,
  MouseEvent,
} from "react";
import { css } from "@patternfly/react-styles";
import { RowWrapperProps } from "@patternfly/react-table";
import "./CustomRowWrapper.css";

export type CustomRowWrapperContextProps = {
  activeRow?: string;
  onRowClick?: (event: MouseEvent, rowIndex: number, row: any) => void;
  rowDataTestId?: string;
  loggedInUser?: string;
};

const CustomRowWrapperContext = createContext<CustomRowWrapperContextProps>({
  activeRow: "",
  onRowClick: () => "",
  loggedInUser: "",
});

export const CustomRowWrapperProvider = CustomRowWrapperContext.Provider;

export const CustomRowWrapper: FunctionComponent<RowWrapperProps> = (
  rowWrapperProps
) => {
  const { activeRow, onRowClick, rowDataTestId } = useContext(
    CustomRowWrapperContext
  );
  const { trRef, className, rowProps, row, ...props } = rowWrapperProps || {};
  const { rowIndex } = rowProps || { rowIndex: 1 };
  const { isExpanded, originalData } = row || {};

  return (
    <tr
      data-testid={rowDataTestId}
      tabIndex={0}
      ref={trRef as Ref<HTMLTableRowElement>}
      className={css(
        className,
        "pf-c-table-row__item",
        activeRow &&
          activeRow === originalData?.rowId &&
          "pf-m-selected pf-m-selectable"
      )}
      hidden={isExpanded !== undefined && !isExpanded}
      onClick={(event: MouseEvent) =>
        onRowClick && onRowClick(event, rowIndex, row)
      }
      {...props}
    />
  );
};
