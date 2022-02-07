import {
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarToggleGroup,
} from "@patternfly/react-core";
import { FilterIcon } from "@patternfly/react-icons";
import React from "react";
import { Search } from "./Search";

export const ServiceAccountToolbar: React.FunctionComponent = () => {
  return (
    <Toolbar
      id="service-account-toolbar"
      collapseListedFiltersBreakpoint={"md"}
      inset={{ xl: "insetLg" }}
    >
      <ToolbarContent>
        <ToolbarToggleGroup toggleIcon={<FilterIcon />} breakpoint="md">
          <ToolbarGroup variant="filter-group">
            <Search onSearch={() => true} />
          </ToolbarGroup>
        </ToolbarToggleGroup>
      </ToolbarContent>
    </Toolbar>
  );
};
