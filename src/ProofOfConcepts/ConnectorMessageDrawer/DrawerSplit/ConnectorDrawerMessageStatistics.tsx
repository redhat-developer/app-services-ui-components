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
  Split,
  SplitItem,
  Text,
  TextContent,
  TextListItem,
  TextListItemVariants,
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
            <Split hasGutter>
              <SplitItem isFilled>
                {/** displaysize in description list will be better use then utilites classes, but throwing errors for some reason */}
                <Flex
                  spaceItems={{ default: "spaceItemsSm" }}
                  className="pf-u-font-size-xl"
                  direction={{ default: "row" }}
                >
                  <FlexItem>
                    <CheckIcon color={global_success_color_100.value} />
                  </FlexItem>
                  <FlexItem className="pf-u-flex-nowrap">
                    {sent}&nbsp;sent
                  </FlexItem>
                </Flex>
              </SplitItem>
              <SplitItem isFilled>
                <Flex
                  spaceItems={{ default: "spaceItemsSm" }}
                  className="pf-u-font-size-xl"
                  direction={{ default: "row" }}
                >
                  <FlexItem>
                    <ExclamationIcon color={global_danger_color_100.value} />
                  </FlexItem>
                  <FlexItem className="pf-u-flex-nowrap">
                    {notSent}
                    &nbsp;not sent
                  </FlexItem>
                </Flex>
              </SplitItem>
            </Split>
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
