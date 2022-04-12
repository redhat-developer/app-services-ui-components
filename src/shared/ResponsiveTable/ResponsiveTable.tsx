import { forwardRef, ReactElement } from "react";
import {
  ActionsColumn,
  ActionsColumnProps,
  TableComposable,
  Tbody,
  Td,
  TdProps,
  Th,
  Thead,
  ThProps,
  Tr,
} from "@patternfly/react-table";
import useResizeObserver from "use-resize-observer";

export type RenderHeaderCb = (props: {
  Th: typeof Th;
  key: string;
  column: string;
  colIndex: number;
}) => ReactElement<ResponsiveThProps>;

export type RenderCellCb<TRow> = (props: {
  Td: typeof Td;
  key: string;
  column: string;
  colIndex: number;
  rowIndex: number;
  rowData: TRow;
}) => ReactElement<ResponsiveTdProps>;

export type RenderActionsCb<TRow> = (props: {
  ActionsColumn: typeof ActionsColumn;
  rowData: TRow;
  rowIndex: number;
}) => ReactElement<ActionsColumnProps> | undefined;

export type ResponsiveTableProps<TRow> = {
  ariaLabel: string;
  minimumColumnWidth?: number;
  columns: Array<string>;
  data: Array<TRow> | undefined;
  renderHeader: RenderHeaderCb;
  renderCell: RenderCellCb<TRow>;
  renderActions?: RenderActionsCb<TRow>;
};

export function ResponsiveTable<TRow>({
  ariaLabel,
  minimumColumnWidth = 250,
  columns,
  data,
  renderHeader,
  renderCell,
  renderActions,
}: ResponsiveTableProps<TRow>) {
  const { ref, width = 1 } = useResizeObserver();
  const showColumns = width >= 576;
  return (
    <TableComposable
      aria-label={ariaLabel}
      gridBreakPoint=""
      ref={ref}
      className={showColumns ? "" : "pf-m-grid"}
    >
      <Thead>
        <Tr>
          {columns.map((column, index) => {
            const Th = forwardRef<HTMLTableHeaderCellElement, ThProps>(
              ({ children, ...props }, ref) => {
                return (
                  <ResponsiveTh
                    position={index}
                    tableWidth={width}
                    columnWidth={minimumColumnWidth}
                    canHide={
                      showColumns && index !== 0 && index !== columns.length - 1
                    }
                    {...props}
                    ref={ref}
                  >
                    {children}
                  </ResponsiveTh>
                );
              }
            );
            Th.displayName = "ResponsiveThCurried";
            return renderHeader({
              Th,
              key: `header_${column}`,

              column,
              colIndex: index,
            });
          })}
        </Tr>
      </Thead>
      <Tbody>
        {data?.map((row, rowIndex) => (
          <Tr key={`row_${rowIndex}`}>
            {columns.map((column, colIndex) => {
              const Td = forwardRef<HTMLTableDataCellElement, TdProps>(
                ({ children, ...props }, ref) => {
                  return (
                    <ResponsiveTd
                      position={colIndex}
                      tableWidth={width}
                      columnWidth={minimumColumnWidth}
                      canHide={
                        showColumns &&
                        colIndex !== 0 &&
                        colIndex !== columns.length - 1
                      }
                      {...props}
                      ref={ref}
                    >
                      {children}
                    </ResponsiveTd>
                  );
                }
              );
              Td.displayName = "ResponsiveTdCurried";
              return renderCell({
                Td,
                key: `row_${rowIndex}_cell_${column}`,
                column,
                colIndex,
                rowIndex,
                rowData: row,
              });
            })}
            {renderActions && (
              <ResponsiveTd
                position={columns.length}
                tableWidth={width}
                columnWidth={minimumColumnWidth}
                canHide={false}
                isActionCell={true}
              >
                {renderActions({ rowIndex, rowData: row, ActionsColumn })}
              </ResponsiveTd>
            )}
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
}

export type ResponsiveThProps = {
  position: number;
  tableWidth: number;
  columnWidth: number;
  canHide: boolean;
} & Omit<ThProps, "ref">;
export const ResponsiveTh = forwardRef<
  HTMLTableHeaderCellElement,
  ResponsiveThProps
>((props, ref) => {
  const {
    tableWidth,
    columnWidth,
    position,
    canHide,
    className = "",
    children,
    ...otherProps
  } = props;
  const responsiveClass =
    canHide && tableWidth < columnWidth * (position + 1)
      ? "pf-m-hidden"
      : "pf-m-visible";

  return (
    <Th ref={ref} className={`${responsiveClass} ${className}`} {...otherProps}>
      {children}
    </Th>
  );
});
ResponsiveTh.displayName = "ResponsiveTh";

export type ResponsiveTdProps = {
  position: number;
  tableWidth: number;
  columnWidth: number;
  canHide: boolean;
} & Omit<TdProps, "ref">;
export const ResponsiveTd = forwardRef<
  HTMLTableDataCellElement,
  ResponsiveTdProps
>((props, ref) => {
  const {
    tableWidth,
    columnWidth,
    position,
    canHide,
    className = "",
    children,
    ...otherProps
  } = props;
  const responsiveClass =
    canHide && tableWidth < columnWidth * (position + 1)
      ? "pf-m-hidden"
      : "pf-m-visible";

  return (
    <Td ref={ref} className={`${responsiveClass} ${className}`} {...otherProps}>
      {children}
    </Td>
  );
});
ResponsiveTd.displayName = "ResponsiveTd";
