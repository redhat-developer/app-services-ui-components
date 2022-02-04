import { Button, Spinner, HelperText, HelperTextItem, Flex, FlexItem, Split, SplitItem, Alert } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import "./style.css";
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';
export const OnTime: VoidFunctionComponent  = () => {
    return (
        <div>
        <Split hasGutter className="foo">
        <SplitItem>
            <Spinner size="md" />
        </SplitItem>
        <SplitItem>
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
        </SplitItem>
        </Split>   
        </div>
    );
}; 