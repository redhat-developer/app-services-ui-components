import React from "react";
import { FunctionComponent } from "react";

import {
  Alert,
  Card,
  CardBody,
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
  Grid,
  GridItem,
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
        <Card>
          <CardTitle>
            <Title headingLevel="h3" size={TitleSizes["lg"]}>
              Processed messages
            </Title>
          </CardTitle>
          <CardBody>
            <Grid hasGutter span={8}>
              <GridItem span={4}>
                <Flex direction={{ default: "row" }}>
                  <Title headingLevel="h3">
                    <CheckIcon color={global_success_color_100.value} />
                    1600
                  </Title>
                  <GridItem span={1}>sent</GridItem>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex direction={{ default: "row" }}>
                  <Title headingLevel="h3">
                    <ExclamationIcon color={global_danger_color_100.value} />
                    12
                  </Title>
                  <GridItem span={1}>not sent</GridItem>
                </Flex>
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter className="processed-messages-info">
            These numbers reflect the messages processed in the last 24 hours
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
              <Text component={TextVariants.h3}> Dead letter queue topic</Text>
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
