import { Split, SplitItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import "./style.css";
export const ReadyForUse: VoidFunctionComponent  = () => {
    return (
        <div>       
            <Split hasGutter className="foo">
                <SplitItem>
                    <CheckCircleIcon style={{ color: "#3E8635" }} className="fixIcon" />
                </SplitItem>
                <SplitItem>
                    Ready
                </SplitItem>   
            </Split>     
        </div>
    );
};