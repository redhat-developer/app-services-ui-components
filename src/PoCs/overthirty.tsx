import { Button, Spinner, Alert, Split, SplitItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import "./style.css";
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';

export const Error: VoidFunctionComponent  = () => {
    return (
        <div>      
            <Split hasGutter className="mas-c-status">
                <SplitItem>
                    <Spinner size="md" />
                </SplitItem>
                <SplitItem>
                    <Button variant="link" isInline>
                        Creating
                    </Button>
                </SplitItem>
            </Split>     
            <Alert variant="danger" isInline isPlain title="This is taking longer than expected." />                 
        </div>
    );
}; 