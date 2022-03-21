import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";
import "./styles.css";
import React from "react";

import { Text } from "@patternfly/react-core";

class KafkaInstanceLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <span class="pf-c-label mas-m-solid smaller-label pf-m-grey ">
            <span class="pf-c-label__content">KI</span>
          </span>
        </div>
      </div>
    );
  }
}

export default KafkaInstanceLabel;
