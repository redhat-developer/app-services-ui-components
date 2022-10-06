import "./customStyles.css";
import React from "react";

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
