import { Split, SplitItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import "./style.css";


export const InstanceCreationFailed: VoidFunctionComponent  = () => {
    return (
        <div>       
            <Split hasGutter className="mas-c-status">
                <SplitItem>
                    <ExclamationCircleIcon className="mas-m-failed"/>      
                </SplitItem>
                <SplitItem>
                    Failed
                </SplitItem>   
            </Split>      
        </div>
    );
};  