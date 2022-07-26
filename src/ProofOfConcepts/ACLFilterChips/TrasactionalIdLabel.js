import "./customStyles.css";
import React from "react";
import { Label } from "@patternfly/react-core";

class TransactionalIdLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <Label className ="pf-c-label mas-m-solid smaller-label pf-m-orange" isCompact>
            <span class="pf-c-label__content">TI</span>
          </Label>
        </div>
      </div>
    );
  }
}

export default TransactionalIdLabel;
