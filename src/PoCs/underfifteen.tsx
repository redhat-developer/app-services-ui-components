import { Button, Spinner, HelperText, HelperTextItem, Flex, FlexItem, Alert } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";

export const OnTime: VoidFunctionComponent  = () => {
    return (
        <div>
        <Flex  direction={{ default: 'column' }}>
        <Flex spacer={{ default: 'spacerXs' }}>
            <FlexItem spacer={{ default: 'spacerSm' }}>
                <Spinner isSVG size="md"/>
            </FlexItem>
            <FlexItem>
                <Button variant="link" isInline>
                Creating 
                </Button>
                <Flex>
                    <FlexItem>
                        <HelperText>
                        <HelperTextItem variant="indeterminate">This will be ready shortly.</HelperTextItem>
                        </HelperText> 
                    </FlexItem>  
                </Flex>  
            </FlexItem>
        </Flex>  
        </Flex>     
        </div>
    );
};