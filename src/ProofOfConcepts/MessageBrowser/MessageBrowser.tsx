import {
  TableClass,
  PartitionSelectorClass,
  OffsetSelectorGroupClass,
} from "./components";
import { ToolbarIconsClass } from "./components/searchAndReload";
import { OffsetRangeClass } from "./components/offsetRange";

import { VoidFunctionComponent } from "react";
import React from "react";
import {
  Dropdown,
  DropdownItem,
  DropdownPosition,
  DropdownSeparator,
  DropdownToggle,
  TextInput,
  Toolbar,
  ToolbarContent,
  ToolbarFilter,
  ToolbarGroup,
  ToolbarItem,
  ToolbarToggleGroup,
} from "@patternfly/react-core";

export const MessageBrowser: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      <Toolbar>
        <ToolbarContent>
          <ToolbarGroup>
            <PartitionSelectorClass />
            <OffsetSelectorGroupClass />
            <ToolbarIconsClass />
          </ToolbarGroup>
          <ToolbarGroup alignment={{ default: "alignRight" }}>
            <OffsetRangeClass />
          </ToolbarGroup>
        </ToolbarContent>
      </Toolbar>
      <TableClass />
    </React.Fragment>
  );
};
