import { VoidFunctionComponent } from "react";
import React from "react";
import Toolbar from "./toolbar";
import Chips from "./option";

//export const parameters = {
//backgrounds: {
//default: "--pf-global--BackgroundColor--200",
//},
//};

export const ACLFilterChips: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      {/* Mock toolbar with options pre-checked*/}
      <Toolbar />
      <br></br>
      &emsp;
      <Chips />
    </React.Fragment>
  );
};
