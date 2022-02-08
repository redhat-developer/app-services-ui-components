import { Split, SplitItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import "./style.css";

/**
*<strong> Introduction/Background </strong>
*These are the various statuses that show in the Kafka Instances table under the "Status" header.
*<br><br>
*<h3>Ready</h3>
*The Kafka instance is ready for use
*
*/

export const ReadyForUse: VoidFunctionComponent  = () => {
    return (
        <div>       
            <Split hasGutter className="mas-c-status">
                <SplitItem>
                    <CheckCircleIcon className="mas-m-ready"  />      
                </SplitItem>
                <SplitItem>
                    Ready
                </SplitItem>   
            </Split>   
        </div>
    );
};