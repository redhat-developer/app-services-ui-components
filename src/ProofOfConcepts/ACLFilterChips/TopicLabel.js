import "./customStyles.css";
import React from "react";
import { Label } from "@patternfly/react-core";

class TopicLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <Label color="blue" className="pf-c-label mas-m-solid" isCompact>
            T
          </Label>
        </div>
      </div>
    );
  }
}

export default TopicLabel;
