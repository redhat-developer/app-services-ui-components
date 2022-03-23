import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
// import "./fonts.css";
import React from "react";
import Toolbar from "./toolbar";
import Chips1 from "./option1";
import Chips2 from "./option2";
import Chips3 from "./option3";
import Chips4 from "./option4";
import Chips5 from "./option5";
import Chips6 from "./option6";

export class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        {/* Mock toolbar with options pre-checked*/}
        <Toolbar />
        {/* Chip options */}
        {/* Option 1 description:
      With each checkbox click, a new chip/icon is added.
      This will help to visually confirm that the click action has resulted into a new chip.
      Selecting the Resource type checkbox would show the same chip as selecting all the
      individual Operations under a Resource type. 
      Also, note that the labels in the chips are smaller than what we see in the table
      and treeview dropdown.*/}
        <br></br>
        <br></br>
        &emsp;
        <Chips1 />
        {/* Option 2 description:
     With border and background color */}
        <br></br>
        <br></br>
        &emsp;
        <Chips2 />
        {/* Option 3 description:
     With color coordinated border only */}
        <br></br>
        <br></br>
        &emsp;
        <Chips3 />
        {/* Option 4 description:
     With black broder only */}
        <br></br>
        <br></br>
        &emsp;
        <Chips4 />
        {/* Option 5 description:
     With color coordinated background only */}
        <br></br>
        <br></br>
        &emsp;
        <Chips5 />
        {/* Option 6 description:
     No border or background color. 
     Just grouped with labels acting as separators */}
        <br></br>
        <br></br>
        &emsp;
        <Chips6 />
      </React.Fragment>
    );
  }
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
