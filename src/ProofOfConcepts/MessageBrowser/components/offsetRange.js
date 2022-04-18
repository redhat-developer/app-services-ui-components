import React from "react";
import { TextContent, Text } from "@patternfly/react-core";

// Follow the PF Pagination component styling here.
// i.e. use default body copy size 16px (pf-global—fontsize—med)
// and apply medium weight to the numbers.
export class OffsetRangeClass extends React.Component {
  render() {
    return (
      <React.Fragment>
        <TextContent className="pf-u-font-size">
          <Text>
            Offset <Text className="custom-text">0</Text> -{" "}
            <Text className="custom-text">9</Text>
          </Text>
        </TextContent>
      </React.Fragment>
    );
  }
}
