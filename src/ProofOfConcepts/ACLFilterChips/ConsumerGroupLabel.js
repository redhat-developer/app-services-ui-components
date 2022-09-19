import React from "react";
import { Label } from "@patternfly/react-core";
import "./customStyles.css";

class ConsumerGroupLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <Label color="green" className="pf-c-label mas-m-solid" isCompact>
            G
          </Label>
        </div>
      </div>
    );
  }
}

export default ConsumerGroupLabel;
