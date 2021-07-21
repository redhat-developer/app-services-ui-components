import React from "react";
import {
  ToolbarContent,
  Toolbar,
  ToolbarProps,
  ToolbarItemProps as PFToolbarItemProps,
  ToolbarToggleGroup,
  ToolbarItem,
  ToolbarToggleGroupProps,
} from "@patternfly/react-core";

export type ToolbarItemProps = Omit<PFToolbarItemProps, "children"> & {
  item: React.ReactElement;
};
export type AppServicesToolbarProps = {
  toolbarProps: Omit<ToolbarProps, "children" | "ref">;
  toggleGroupProps?: Omit<ToolbarToggleGroupProps, "children">;
  toggleGroupItems?: any;
  toolbarItems?: ToolbarItemProps[];
};

const AppServicesToolbar: React.FunctionComponent<AppServicesToolbarProps> = ({
  toolbarProps,
  toggleGroupProps,
  toolbarItems,
  toggleGroupItems,
}) => {
  const {
    id,
    clearAllFilters,
    collapseListedFiltersBreakpoint = "md",
    inset,
    ...restToolbarProps
  } = toolbarProps;

  return (
    <>
      <Toolbar
        id={id}
        clearAllFilters={clearAllFilters}
        inset={inset}
        collapseListedFiltersBreakpoint={collapseListedFiltersBreakpoint}
        {...restToolbarProps}
      >
        <ToolbarContent>
          {toggleGroupProps && (
            <ToolbarToggleGroup
              toggleIcon={toggleGroupProps.toggleIcon}
              {...toggleGroupProps}
            >
              {toggleGroupItems}
            </ToolbarToggleGroup>
          )}
          {toolbarItems?.map((toolbarItem, index) => {
            const {
              key = "appServices",
              variant,
              className,
              id,
              alignment,
              item,
              ...restItemProps
            } = toolbarItem;
            return (
              <ToolbarItem
                key={`${key}-${index}`}
                variant={variant}
                className={className}
                id={id}
                alignment={alignment}
                {...restItemProps}
              >
                {item}
              </ToolbarItem>
            );
          })}
        </ToolbarContent>
      </Toolbar>
    </>
  );
};

export { AppServicesToolbar };
