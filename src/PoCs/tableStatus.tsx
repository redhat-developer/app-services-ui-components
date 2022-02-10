import {  Alert, Button, Spinner, HelperText, HelperTextItem, Flex, FlexItem, Split, SplitItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import "./style.css";


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
