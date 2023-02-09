import React from "react";
import { FunctionComponent } from "react";

import {
  Alert,
  Card,
  CardFooter,
  Divider,
  Flex,
  FlexItem,
  TextContent,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  Title,
  TitleSizes,
  CardTitle,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import { ExclamationIcon } from "@patternfly/react-icons";
import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";

import "./ConnectorDrawer.css";

export const ConnectorDrawerMessageStatistics = () => {
  return (
    <Flex direction={{ default: "column" }}>
      <FlexItem>
        <Alert
          variant="warning"
          isInline
          title={
            "These numbers reflect the messages in the last 23 hours 37 minutes"
          }
        />
      </FlexItem>
      {/** size={TitleSizes['lg'] */}
      <FlexItem>
        <Title headingLevel="h3">Processed messages</Title>
      </FlexItem>
      <FlexItem>
        <Card>
          <CardTitle>
            <Title headingLevel="h3" size={TitleSizes["lg"]}>
              <Split>
                <SplitItem isFilled>
                  <CheckIcon className="pf-u-icon-color-green" />
                  1600 sent
                </SplitItem>
                <SplitItem>
                  <ExclamationIcon className="pf-u-icon-color-red" />
                  12 not sent
                </SplitItem>
              </Split>
            </Title>
          </CardTitle>
          <CardFooter className="grey-text">
            These numbers reflect the messages processed in the last 24 hours.
          </CardFooter>
        </Card>
      </FlexItem>
      <FlexItem>
        <TextContent>
          <TextList component={TextListVariants.dl}>
            <TextListItem component={TextListItemVariants.dt}>
              Error handling method
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              Dead letter queue
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              Dead letter queue topic
            </TextListItem>
            <TextListItem
              className="pf-u-link-color"
              component={TextListItemVariants.dd}
            >
              my-topic-2
            </TextListItem>
          </TextList>
        </TextContent>
      </FlexItem>
      <FlexItem>
        <Divider />
      </FlexItem>
    </Flex>
  );
};
