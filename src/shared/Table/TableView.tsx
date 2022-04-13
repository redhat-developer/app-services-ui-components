import { PropsWithChildren, ReactNode } from "react";
import { Toolbar, ToolbarContent, ToolbarGroup } from "@patternfly/react-core";
import { Pagination } from "../Pagination";
import { ResponsiveTable, ResponsiveTableProps } from "./ResponsiveTable";

export const DEFAULT_PERPAGE = 10;

export type TableViewProps<TRow> = {
  toolbarContent: ReactNode;
  itemCount: number | undefined;
  page: number;
  perPage?: number;
  onPageChange: (page: number, perPage: number) => void;
  onClearAllFilters?: () => void;
} & ResponsiveTableProps<TRow>;
export const TableView = <TRow,>({
  toolbarContent,
  itemCount,
  page,
  perPage = DEFAULT_PERPAGE,
  onPageChange,
  onClearAllFilters,
  ...tableProps
}: PropsWithChildren<TableViewProps<TRow>>) => {
  const { data } = tableProps;
  const showPagination =
    data?.length !== 0 && itemCount && itemCount > DEFAULT_PERPAGE;
  return (
    <>
      {(toolbarContent || showPagination) && (
        <Toolbar clearAllFilters={onClearAllFilters}>
          <ToolbarContent>
            {toolbarContent}
            {showPagination && (
              <ToolbarGroup alignment={{ default: "alignRight" }}>
                <Pagination
                  itemCount={itemCount}
                  page={page}
                  perPage={perPage}
                  onChange={onPageChange}
                  isCompact
                />
              </ToolbarGroup>
            )}
          </ToolbarContent>
        </Toolbar>
      )}
      <ResponsiveTable {...tableProps} />
      {showPagination && (
        <Toolbar>
          <ToolbarContent>
            <ToolbarGroup alignment={{ default: "alignRight" }}>
              <Pagination
                itemCount={itemCount}
                page={page}
                perPage={perPage}
                onChange={onPageChange}
              />
            </ToolbarGroup>
          </ToolbarContent>
        </Toolbar>
      )}
    </>
  );
};
