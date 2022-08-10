import type { ToolbarProps } from "@patternfly/react-core";
import { Toolbar, ToolbarContent, ToolbarGroup } from "@patternfly/react-core";
import {
  InnerScrollContainer,
  OuterScrollContainer,
} from "@patternfly/react-table";
import type { PropsWithChildren, ReactNode } from "react";
import { Pagination } from "../Pagination";
import type { ResponsiveTableProps } from "./ResponsiveTable";
import { ResponsiveTable } from "./ResponsiveTable";

export const DEFAULT_PERPAGE = 20;

export type TableViewProps<TRow, TCol> = {
  toolbarBreakpoint?: ToolbarProps["collapseListedFiltersBreakpoint"];
  toolbarContent: ReactNode;
  itemCount: number | undefined;
  page: number;
  perPage?: number;
  onPageChange: (page: number, perPage: number) => void;
  onClearAllFilters?: () => void;
} & ResponsiveTableProps<TRow, TCol>;
export const TableView = <TRow, TCol>({
  toolbarBreakpoint,
  toolbarContent,
  itemCount,
  page,
  perPage = DEFAULT_PERPAGE,
  onPageChange,
  onClearAllFilters,
  ...tableProps
}: PropsWithChildren<TableViewProps<TRow, TCol>>) => {
  const { data } = tableProps;
  const showPagination =
    data?.length !== 0 && itemCount && itemCount > DEFAULT_PERPAGE;
  return (
    <OuterScrollContainer className={"pf-u-h-100"}>
      {(toolbarContent || showPagination) && (
        <Toolbar
          clearAllFilters={onClearAllFilters}
          collapseListedFiltersBreakpoint={toolbarBreakpoint}
        >
          <ToolbarContent>
            {toolbarContent}
            {showPagination && (
              <ToolbarGroup alignment={{ default: "alignRight" }}>
                <Pagination
                  itemCount={itemCount}
                  page={page}
                  perPage={perPage}
                  onChange={onPageChange}
                  variant={"top"}
                  isCompact
                />
              </ToolbarGroup>
            )}
          </ToolbarContent>
        </Toolbar>
      )}
      <InnerScrollContainer className={"pf-u-h-100"}>
        <ResponsiveTable {...tableProps} />
      </InnerScrollContainer>
      {showPagination && (
        <Pagination
          itemCount={itemCount}
          page={page}
          perPage={perPage}
          variant={"bottom"}
          onChange={onPageChange}
        />
      )}
    </OuterScrollContainer>
  );
};
