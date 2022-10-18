import React from "react";
import { Toolbar, ToolbarContent, ToolbarGroup } from "@patternfly/react-core";
import {
  InnerScrollContainer,
  OuterScrollContainer,
} from "@patternfly/react-table";
import type { PropsWithChildren, ReactNode } from "react";
import { Pagination } from "../../shared/Pagination";
import type { ResponsiveTableProps } from "../../shared/Table/ResponsiveTable";
import { ResponsiveTable } from "../../shared/Table/ResponsiveTable";
import { POCRefreshButton } from "./Variant3";

export const DEFAULT_PERPAGE = 10;

export type TableViewProps<TRow, TCol> = {
  toolbarContent: ReactNode;
  itemCount: number | undefined;
  page: number;
  perPage?: number;
  onPageChange: (page: number, perPage: number) => void;
  onClearAllFilters?: () => void;
} & ResponsiveTableProps<TRow, TCol> &
  POCRefreshButton;
export const TableView = <TRow, TCol>({
  toolbarContent,
  itemCount,
  page,
  perPage = DEFAULT_PERPAGE,
  onPageChange,
  onClearAllFilters,
  isRefreshing,
  lastUpdated = new Date(),
  ariaLabel,
  onRefresh,
  ...tableProps
}: PropsWithChildren<TableViewProps<TRow, TCol>>) => {
  const { data } = tableProps;
  const showPagination =
    data?.length !== 0 && itemCount && itemCount > DEFAULT_PERPAGE;
  return (
    <OuterScrollContainer>
      {(toolbarContent || showPagination) && (
        <Toolbar clearAllFilters={onClearAllFilters}>
          <ToolbarContent>
            {toolbarContent}
            <POCRefreshButton
              ariaLabel={ariaLabel}
              onClick={onRefresh}
              isRefreshing={isRefreshing}
            />
            {showPagination && (
              <ToolbarGroup>
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
      <InnerScrollContainer>
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
