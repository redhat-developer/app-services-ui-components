import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";

import React from "react";
import {
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem
} from "@patternfly/react-core";
import {
    Button
} from "@patternfly/react-core";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import SyncIcon from "@patternfly/react-icons/dist/esm/icons/sync-icon";

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
