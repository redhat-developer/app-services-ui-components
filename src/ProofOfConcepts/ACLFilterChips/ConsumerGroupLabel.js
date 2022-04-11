import "./customStyles.css";
import React from "react";

class ConsumerGroupLabel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div class="row">
        <div class="child">
          <span class="pf-c-label mas-m-solid smaller-label pf-m-green ">
            <span class="pf-c-label__content">G</span>
          </span>
        </div>
      </div>
    );
  }
}

export default ConsumerGroupLabel;
