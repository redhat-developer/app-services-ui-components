import React from "react";
import { FunctionComponent } from "react";

import {
  Alert,
  Card,
  CardFooter,
  Divider,
  Flex,
  FlexItem,
  Text,
  TextContent,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
  TextVariants,
  Title,
  TitleSizes,
  CardTitle,
  Split,
  SplitItem,
} from "@patternfly/react-core";
import {
  global_success_color_100,
  global_danger_color_100,
} from "@patternfly/react-tokens";

import { ExclamationIcon } from "@patternfly/react-icons";
import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";

import "./ConnectorDrawer.css";

export type ConnectorDrawerMessageStatisticsProps = {
  sent: string;
  notSent: string;
};

export const ConnectorDrawerMessageStatistics: FunctionComponent<
  ConnectorDrawerMessageStatisticsProps
> = ({ sent, notSent }) => {
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
      <FlexItem>
        <Title headingLevel="h3">Processed messages</Title>
      </FlexItem>
      <FlexItem>
        <Card>
          <CardTitle>
            <Title headingLevel="h3" size={TitleSizes["lg"]}>
              <Split>
                <SplitItem isFilled>
                  <CheckIcon color={global_success_color_100.value} />
                  {sent} sent
                </SplitItem>
                <SplitItem isFilled>
                  <ExclamationIcon color={global_danger_color_100.value} />
                  {notSent} not sent
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
              <Text component={TextVariants.h3}>Error handling method</Text>
            </TextListItem>
            <TextListItem component={TextListItemVariants.dd}>
              Dead letter queue
            </TextListItem>
            <TextListItem component={TextListItemVariants.dt}>
              <Text component={TextVariants.h3}>Dead letter queue topic</Text>
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
