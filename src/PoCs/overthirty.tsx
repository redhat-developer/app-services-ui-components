import { Button, Spinner, Alert, Flex, FlexItem } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";

export const Error: VoidFunctionComponent  = () => {
    return (
        <div>
            <Flex direction={{ default: 'column' }}>
            <Flex spacer={{ default: 'spacerXs' }}>
                <FlexItem spacer={{ default: 'spacerSm' }}><Spinner isSVG size="md"/></FlexItem>
                <FlexItem>
                    <Button variant="link" isInline>
                        Creating              
                    </Button>
                    <Flex>
                        <FlexItem> 
                            <Alert variant="danger" isInline isPlain title="This is taking longer than expected." /> 
                        </FlexItem>
                    </Flex>
                </FlexItem>
            </Flex>
            </Flex>            
        </div>
    );
}; 