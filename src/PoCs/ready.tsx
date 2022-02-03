import { Button, Spinner, Flex, FlexItem, Alert } from "@patternfly/react-core";
import React, {VoidFunctionComponent } from "react";
import CheckCircleIcon from '@patternfly/react-icons/dist/js/icons/check-circle-icon';

export const ReadyForUse: VoidFunctionComponent  = () => {
    return (
        <div>
            <Flex>
            <Flex>
                <FlexItem spacer={{ default: 'spacerSm' }}><CheckCircleIcon style={{ color: "#3E8635" }}/></FlexItem>
                <FlexItem>Ready</FlexItem>
            </Flex>
            </Flex>
        </div>
    );
};