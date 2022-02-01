import { Button, Spinner, HelperText, HelperTextItem, Flex, FlexItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";

export const OnTime: VoidFunctionComponent  = () => {
    return (
        <div>
        <Spinner isSVG size="md"/>  Creating    
        <HelperText>
            <HelperTextItem variant="indeterminate">This will be ready shortly.</HelperTextItem>
        </HelperText>   
        </div>
    );
};