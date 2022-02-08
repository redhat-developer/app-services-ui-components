import { Split, SplitItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import "./style.css";

export const ReadyForUse: VoidFunctionComponent  = () => {
    return (
        <div>       
            <Split hasGutter className="mas-c-status">
                <SplitItem>
                    <CheckCircleIcon className="mas-c-status__icon" color="#3E8635" />      
                </SplitItem>
                <SplitItem>
                    Ready
                </SplitItem>   
            </Split>   
        </div>
    );
};