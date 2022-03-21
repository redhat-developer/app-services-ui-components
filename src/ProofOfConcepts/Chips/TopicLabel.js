import "@patternfly/react-core/dist/styles/base.css";
import "./fonts.css";
import "./styles.css";
import React from "react";

import { Text } from "@patternfly/react-core";

class TopicLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <span class="pf-c-label mas-m-solid smaller-label pf-m-blue">
            <span class="pf-c-label__content">T</span>
          </span>
        </div>
      </div>
    );
  }
}

export default TopicLabel;
