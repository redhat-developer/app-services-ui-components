import { VoidFunctionComponent } from "react";
import React from "react";
import Toolbar from "./toolbar";
import Chips from "./option";

export const ACLFilterChips: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      {/* Mock toolbar with options pre-checked*/}
      <Toolbar />
      &emsp;
      <Chips />
    </React.Fragment>
  );
};
