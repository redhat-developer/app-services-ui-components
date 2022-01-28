import { Button, Spinner, Alert } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";

export const Warning: VoidFunctionComponent  = () => {
    return (
        <div>
            <Spinner isSVG size="md"/>Creating
            <Alert variant="warning" isInline isPlain title="This is taking longer than expected." />
        </div>
    );
}; 