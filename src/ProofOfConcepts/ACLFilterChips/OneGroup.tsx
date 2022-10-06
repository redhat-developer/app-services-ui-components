import { VoidFunctionComponent } from "react";
import React from "react";
import Toolbar from "./toolbarOneGroup";
import Chips from "./optionOneGroup";

export const OneGroupChips: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      {/* Mock toolbar with options pre-checked*/}
      <Toolbar />
      &emsp;
      <Chips />
    </React.Fragment>
  );
};
