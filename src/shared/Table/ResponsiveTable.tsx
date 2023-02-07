import { Skeleton } from "@patternfly/react-core";
import type {
  ActionsColumnProps,
  TableVariant,
  TdProps,
  ThProps,
} from "@patternfly/react-table";
import {
  ActionsColumn,
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import type { ThSelectType } from "@patternfly/react-table/dist/esm/components/Table/base";
import type {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  VoidFunctionComponent,
} from "react";
import { forwardRef, memo, useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useResizeObserver from "use-resize-observer";
import "./ResponsiveTable.css";

export type RenderHeaderCb<TCol> = (props: {
  Th: typeof Th;
  key: string;
  column: TCol;
  colIndex: number;
}) => ReactElement<ResponsiveThProps>;

export type RenderCellCb<TRow, TCol> = (props: {
  Td: typeof Td;
  key: string;
  column: TCol;
  colIndex: number;
  rowIndex: number;
  row: TRow;
}) => ReactElement<ResponsiveTdProps>;

export type RenderActionsCb<TRow> = (props: {
  ActionsColumn: typeof ActionsColumn;
  row: TRow;
  rowIndex: number;
}) => ReactElement<ActionsColumnProps> | undefined;

export type ResponsiveTableProps<TRow, TCol> = {
  ariaLabel: string;
  minimumColumnWidth?: number;
  columns: readonly TCol[];
  data: TRow[] | undefined;
  renderHeader: RenderHeaderCb<TCol>;
  renderCell: RenderCellCb<TRow, TCol>;
  renderActions?: RenderActionsCb<TRow>;
  isColumnSortable?: (
    column: TCol
  ) => (ResponsiveThProps["sort"] & { label: string }) | undefined;
  isRowDeleted?: (props: RowProps<TRow>) => boolean;
  isRowSelected?: (props: RowProps<TRow>) => boolean;
  isRowChecked?: (props: RowProps<TRow>) => boolean;
  expectedLength?: number;
  onRowClick?: (props: RowProps<TRow>) => void;
  setActionCellOuiaId?: (props: RowProps<TRow>) => string;
  setRowOuiaId?: (props: RowProps<TRow>) => string;
  tableOuiaId?: string;
  variant?: TableVariant;
  onCheck?: (isSelecting: boolean, rowIndex: number) => void;
  areAllRowsChecked?: () => boolean;
  onBulkCheck?: (isSelected: boolean) => void;
};

export type RowProps<TRow> = { row: TRow; rowIndex: number };

export const ResponsiveTable = <TRow, TCol>({
  ariaLabel,
  minimumColumnWidth = 250,
  columns,
  data,
  renderHeader,
  renderCell,
  renderActions,
  isColumnSortable,
  isRowDeleted,
  isRowSelected,
  isRowChecked,
  expectedLength = 3,
  onRowClick,
  setActionCellOuiaId,
  setRowOuiaId,
  tableOuiaId,
  children,
  variant,
  onCheck,
  areAllRowsChecked,
  onBulkCheck,
}: PropsWithChildren<ResponsiveTableProps<TRow, TCol>>) => {
  const [width, setWidth] = useState(1000);
  let animationHandle: number;
  /**
   * resize the columns on a rAF loop to render the table at 60fps
   * @param width
   */
  const onResize = ({ width }: { width: number | undefined }) => {
    if (animationHandle) {
      cancelAnimationFrame(animationHandle);
    }
    if (width) {
      animationHandle = requestAnimationFrame(() => {
        setWidth(width);
      });
    }
  };
  const { ref } = useResizeObserver({ onResize });
  const showColumns = width >= 576;

  const canColumnBeHidden = useCallback(
    (index: number) =>
      showColumns && index !== 0 && index !== columns.length - 1,
    [columns, showColumns]
  );

  const header = useMemo(() => {
    return columns.map((column, index) => {
      const Th = forwardRef<HTMLTableCellElement, ThProps>(
        ({ children, ...props }, ref) => {
          return (
            <ResponsiveTh
              position={index}
              tableWidth={width}
              columnWidth={minimumColumnWidth}
              canHide={canColumnBeHidden(index)}
              sort={isColumnSortable ? isColumnSortable(column) : undefined}
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
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        key: `header_${column}`,

        column,
        colIndex: index,
      });
    });
  }, [
    canColumnBeHidden,
    columns,
    isColumnSortable,
    minimumColumnWidth,
    renderHeader,
    width,
  ]);

  const getTd = useCallback(
    (index: number) => {
      const Td = forwardRef<HTMLTableCellElement, TdProps>(
        ({ children, ...props }, ref) => {
          return (
            <ResponsiveTd
              position={index}
              tableWidth={width}
              columnWidth={minimumColumnWidth}
              canHide={canColumnBeHidden(index)}
              {...props}
              ref={ref}
            >
              {children}
            </ResponsiveTd>
          );
        }
      );
      Td.displayName = "ResponsiveTdCurried";
      return Td;
    },
    [canColumnBeHidden, minimumColumnWidth, width]
  );
  const TdList = useMemo(
    () => columns.map((_, index) => getTd(index)),
    [columns, getTd]
  );

  const allChecked = areAllRowsChecked != undefined && areAllRowsChecked();

  const isBulkCheckPropsValid = () => {
    if (
      (onBulkCheck != undefined && areAllRowsChecked == undefined) ||
      (onBulkCheck == undefined && areAllRowsChecked != undefined)
    )
      throw new Error(
        `${
          onBulkCheck == undefined ? `onBulkCheck` : `areAllRowsChecked`
        } for bullk check rows is not defined`
      );
  };

  const isRowCheckPropsValid = () => {
    if (
      (isRowChecked != undefined && onCheck == undefined) ||
      (isRowChecked == undefined && onCheck != undefined)
    )
      throw new Error(
        `${
          isRowChecked == undefined ? `isRowChecked` : `onCheck`
        } for check rows is not defined`
      );
  };

  return (
    <TableComposable
      aria-label={ariaLabel}
      gridBreakPoint=""
      ref={ref}
      className={showColumns ? "" : "pf-m-grid"}
      ouiaId={tableOuiaId}
      variant={variant}
    >
      <Thead>
        {isBulkCheckPropsValid()}
        {isRowCheckPropsValid()}
        <Tr>
          {onCheck != undefined && isRowChecked != undefined && (
            <Th
              select={
                allChecked != undefined && onBulkCheck != undefined
                  ? {
                      isSelected: allChecked,
                      onSelect: (_event, isSelecting) => {
                        onBulkCheck && onBulkCheck(isSelecting);
                      },
                    }
                  : undefined
              }
            ></Th>
          )}
          {header}
        </Tr>
      </Thead>
      <Tbody>
        {data === undefined && (
          <TableSkeleton
            columns={columns.length}
            rows={expectedLength}
            getTd={getTd}
          />
        )}
        {data?.map((row, rowIndex) => {
          const deleted =
            isRowDeleted !== undefined && isRowDeleted({ row: row, rowIndex });
          const selected =
            isRowSelected !== undefined &&
            isRowSelected({ row: row, rowIndex });

          const checked =
            isRowChecked != undefined && isRowChecked({ row: row, rowIndex });

          const onClick =
            !deleted && onRowClick
              ? () => onRowClick({ row, rowIndex })
              : undefined;
          const cells = columns.map((column, colIndex) => {
            return renderCell({
              Td: TdList[colIndex],
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              key: `row_${rowIndex}_cell_${column}`,
              column,
              colIndex,
              rowIndex,
              row,
            });
          });
          const action = !deleted && renderActions && (
            <ResponsiveTd
              position={columns.length}
              tableWidth={width}
              columnWidth={minimumColumnWidth}
              canHide={false}
              isActionCell={true}
              data-testid={
                setActionCellOuiaId
                  ? setActionCellOuiaId({ row, rowIndex })
                  : `actions-for-row-${rowIndex}`
              }
            >
              {renderActions({ rowIndex, row, ActionsColumn })}
            </ResponsiveTd>
          );
          return (
            <DeletableRow
              key={`row_${rowIndex}`}
              isDeleted={deleted}
              isSelected={selected}
              onClick={onClick}
              rowOuiaId={setRowOuiaId?.({ row, rowIndex })}
            >
              {onCheck != undefined && isRowChecked != undefined && (
                <Td
                  select={{
                    rowIndex,
                    isSelected: checked,
                    onSelect: (_event, isSelecting, rowIndex) => {
                      onCheck && onCheck(isSelecting, rowIndex);
                    },
                  }}
                />
              )}
              {cells}
              {action}
            </DeletableRow>
          );
        })}
        {data?.length === 0 && (
          <Tr>
            <Td colSpan={columns.length}>{children}</Td>
          </Tr>
        )}
      </Tbody>
    </TableComposable>
  );
};

export type ResponsiveThProps = {
  position: number;
  tableWidth: number;
  columnWidth: number;
  canHide: boolean;
  checkCol?: ThSelectType;
} & Omit<ThProps, "ref">;
export const ResponsiveTh = memo(
  forwardRef<HTMLTableCellElement, ResponsiveThProps>((props, ref) => {
    const {
      tableWidth,
      columnWidth,
      position,
      canHide,
      className = "",
      children,
      checkCol,
      ...otherProps
    } = props;
    const responsiveClass =
      canHide && tableWidth < columnWidth * (position + 1)
        ? "pf-m-hidden"
        : "pf-m-visible";

    return (
      <Th
        ref={ref}
        className={`${responsiveClass} ${className}`}
        select={checkCol}
        {...otherProps}
      >
        {children}
      </Th>
    );
  })
);
ResponsiveTh.displayName = "ResponsiveTh";

export type ResponsiveTdProps = {
  position: number;
  tableWidth: number;
  columnWidth: number;
  canHide: boolean;
} & Omit<TdProps, "ref">;
export const ResponsiveTd = memo(
  forwardRef<HTMLTableCellElement, ResponsiveTdProps>((props, ref) => {
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
      <Td
        ref={ref}
        className={`${responsiveClass} ${className}`}
        {...otherProps}
      >
        {children}
      </Td>
    );
  })
);
ResponsiveTd.displayName = "ResponsiveTd";

export type DeletableRowProps = {
  isSelected: boolean;
  isDeleted: boolean;
  onClick?: () => void;
  rowOuiaId?: string;
};
export const DeletableRow: FunctionComponent<DeletableRowProps> = memo(
  ({ isDeleted, isSelected, onClick, children, rowOuiaId }) => {
    return (
      <Tr
        isHoverable={!isDeleted && onClick !== undefined}
        onRowClick={(e) => {
          if (e?.target instanceof HTMLElement) {
            if (!["a", "button"].includes(e.target.tagName.toLowerCase())) {
              onClick && onClick();
            }
          }
        }}
        ouiaId={rowOuiaId}
        isRowSelected={isSelected}
        className={isDeleted ? "mas--ResponsiveTable__Tr--deleted" : undefined}
        data-testid={[isSelected && "row-selected", isDeleted && "row-deleted"]
          .filter((v) => !!v)
          .join(" ")}
        role={"row"}
      >
        {children}
      </Tr>
    );
  }
);
DeletableRow.displayName = "DeletableRow";

const TableSkeleton: VoidFunctionComponent<{
  columns: number;
  rows: number;
  getTd: (index: number) => typeof Td;
}> = ({ columns, rows, getTd }) => {
  const { t } = useTranslation();
  const skeletonCells = new Array(columns).fill(0).map((_, index) => {
    const Td = getTd(index);
    return (
      <Td key={`cell_${index}`}>
        <Skeleton
          screenreaderText={
            index === 0
              ? t("common:skeleton_loader_screenreader_text")
              : undefined
          }
        />
      </Td>
    );
  });
  const skeletonRows = new Array(rows)
    .fill(0)
    .map((_, index) => <Tr key={`row_${index}`}>{skeletonCells}</Tr>);
  return <>{skeletonRows}</>;
};
