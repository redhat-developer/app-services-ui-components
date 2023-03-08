import React from "react";
import { FunctionComponent } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Divider,
  Flex,
  FlexItem,
  Grid,
  GridItem,
  Text,
  TextContent,
  TextVariants,
  Title,
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
        <Card>
          <CardTitle>
            <Title headingLevel="h4">Processed messages</Title>
          </CardTitle>
          <CardBody>
            <Grid hasGutter span={12}>
              <GridItem span={5}>
                <Flex direction={{ default: "row" }}>
                  <CheckIcon color={global_success_color_100.value} />
                  <GridItem className="pf-u-font-size-2xl">
                    {sent}&nbsp;sent
                  </GridItem>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex direction={{ default: "row" }}>
                  <ExclamationIcon color={global_danger_color_100.value} />
                  <GridItem className="pf-u-font-size-2xl">
                    {notSent}&nbsp;not sent
                  </GridItem>
                </Flex>
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter>
            <TextContent>
              <Text component={TextVariants.small}>
                These numbers reflect the messages processed in the last 24
                hours.
              </Text>
            </TextContent>
          </CardFooter>
        </Card>
      </FlexItem>
      <FlexItem>
        <DescriptionList isHorizontal>
          <DescriptionListGroup>
            <DescriptionListTerm>Error handling method</DescriptionListTerm>
            <DescriptionListDescription>
              Dead letter queue
            </DescriptionListDescription>
            <DescriptionListTerm>Dead letter queue topic</DescriptionListTerm>
            <DescriptionListDescription className="pf-u-link-color">
              my-topic-2
            </DescriptionListDescription>
          </DescriptionListGroup>
        </DescriptionList>
      </FlexItem>
      <FlexItem>
        <Divider />
      </FlexItem>
    </Flex>
  );
};
