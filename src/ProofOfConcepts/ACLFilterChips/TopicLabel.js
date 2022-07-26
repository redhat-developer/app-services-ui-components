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
          <Label className ="pf-c-label mas-m-solid smaller-label pf-m-blue" isCompact>
            <span class="pf-c-label__content">T</span>
          </Label>
        </div>
      </div>
    );
  }
}

export default TopicLabel;
