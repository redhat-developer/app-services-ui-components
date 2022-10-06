import React from "react";
import { Label } from "@patternfly/react-core";
import "./customStyles.css";

class KafkaInstanceLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <Label className="pf-c-label mas-m-solid" isCompact>
            KI
          </Label>
        </div>
      </div>
    );
  }
}

export default KafkaInstanceLabel;
