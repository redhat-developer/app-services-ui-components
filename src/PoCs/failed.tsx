import { Split, SplitItem, Label } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import ExclamationCircleIcon from '@patternfly/react-icons/dist/js/icons/exclamation-circle-icon';
import "./style.css";


export const InstanceCreationFailed: VoidFunctionComponent  = () => {
    return (
        <div>       
            <Label color="red" icon={<ExclamationCircleIcon />}>
                Failed
            </Label>    
        </div>
    );
};