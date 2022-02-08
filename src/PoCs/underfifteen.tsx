import { Button, Spinner, HelperText, HelperTextItem, Flex, FlexItem, Split, SplitItem} from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import "./style.css";


/**
*<strong> Introduction/Background </strong>
*These are the various statuses that show in the Kafka Instances table under the "Status" header.
*<br><br>
*<h3>Creating (<15 minutes)</h3>
*
*A user has just selected to create a Kafka Instance. Their instance is not ready for use yet. The "Creating" status is shown in the table along with some grey text informing the user that their instance will be ready shortly. The "Creating" status is clickable which opens a popover with more in-depth information about the creation process.
*/

export const OnTime: VoidFunctionComponent  = () => {
    return (
        <div>
        <Split hasGutter className="mas-c-status">
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