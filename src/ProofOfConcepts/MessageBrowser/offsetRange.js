import React from "react";
import {
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
  TextContent,
  Text,
  TextVariants
} from "@patternfly/react-core";
import { Button } from "@patternfly/react-core";
import SearchIcon from "@patternfly/react-icons/dist/esm/icons/search-icon";
import SyncIcon from "@patternfly/react-icons/dist/esm/icons/sync-icon";

// Follow the PF Pagination component styling here.
// i.e. use default body copy size 16px (pf-global—fontsize—med)
// and apply medium weight to the numbers.
export class OffsetRangeClass extends React.Component {
  render() {
    const items = (
      <React.Fragment>
        <ToolbarGroup alignment={{ default: 'alignRight' }}>
          <React.Fragment>
            <ToolbarItem>
              <TextContent className="pf-u-font-size">
                <Text>Offset{" "}
                  <Text className="custom-text">0</Text>
                  -
                  <Text className="custom-text">9</Text>
                </Text>
              </TextContent>
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
