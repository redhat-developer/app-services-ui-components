import "./customStyles.css";
import React from "react";
import { Label } from "@patternfly/react-core";

class ConsumerGroupLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <Label
            className="pf-c-label mas-m-solid smaller-label pf-m-green"
            isCompact
          >
            <span class="pf-c-label__content">G</span>
          </Label>
        </div>
      </div>
    );
  }
}

export default ConsumerGroupLabel;
