import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";

import React from "react";
import {
    Toolbar,
    ToolbarContent,
    ToolbarGroup,
    ToolbarItem,
    Text
} from "@patternfly/react-core";
import {
    Button
} from "@patternfly/react-core";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import SyncIcon from "@patternfly/react-icons/dist/esm/icons/sync-icon";

export class OffsetRangeClass extends React.Component {
    render() {
        const items = (
            <React.Fragment>
                <ToolbarGroup>
                    <React.Fragment>
                        <ToolbarItem>
                            <Text>
                                Offset 0 - 9
                            </Text>
                        </ToolbarItem>
                    </React.Fragment>
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
