import React from "react";
import {
  Button,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { SearchIcon, SyncIcon } from "@patternfly/react-icons";

export class ToolbarIconsClass extends React.Component {
  render() {
    const iconButtonGroupItems = (
      <React.Fragment>
        <ToolbarItem>
          <Button variant="plain" aria-label="sync" isDisabled>
            <SearchIcon />
          </Button>
        </ToolbarItem>
        <ToolbarItem>
          <Button variant="plain" aria-label="sync">
            <SyncIcon />
          </Button>
        </ToolbarItem>
      </React.Fragment>
    );

    const items = (
      <React.Fragment>
        <ToolbarGroup variant="icon-button-group">
          {iconButtonGroupItems}
        </ToolbarGroup>
      </React.Fragment>
    );

    return (
      <Toolbar id="toolbar-group-types">
        <ToolbarContent>{items}</ToolbarContent>
      </Toolbar>
    );
  }
}
