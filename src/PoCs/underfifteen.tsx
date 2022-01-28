import { Button, Spinner } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";

export const OnTime: VoidFunctionComponent  = () => {
    return (
        <div>
            <Spinner isSVG size="md"/>Creating
            <p>This will be ready shortly.</p>
        </div>
    );
};