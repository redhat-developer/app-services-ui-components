import "./customStyles.css";
import React from "react";

class TransactionalIdLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <span class="pf-c-label mas-m-solid smaller-label pf-m-orange ">
            <span class="pf-c-label__content">TI</span>
          </span>
        </div>
      </div>
    );
  }
}

export default TransactionalIdLabel;
