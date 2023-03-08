import React from "react";
import { FunctionComponent } from "react";

import {
  Card,
  CardBody,
  CardFooter,
  DescriptionList,
  DescriptionListGroup,
  DescriptionListDescription,
  DescriptionListTerm,
  Divider,
  Flex,
  FlexItem,
  Text,
  TextContent,
  TextVariants,
  Title,
  TitleSizes,
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
          <CardBody>
            <DescriptionList columnModifier={{ default: "2Col" }}>
              <DescriptionListGroup>
                <DescriptionListTerm>
                  <Title headingLevel="h4">Messages sent</Title>
                </DescriptionListTerm>
                <DescriptionListDescription>
                  <Flex direction={{ default: "row" }}>
                    <FlexItem>
                      <CheckIcon color={global_success_color_100.value} />
                    </FlexItem>
                    <FlexItem className="pf-u-font-size-2xl">{sent}</FlexItem>
                  </Flex>
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>
                  <Title headingLevel="h3" size={TitleSizes["lg"]}>
                    Messages not sent
                  </Title>
                </DescriptionListTerm>
                <DescriptionListDescription>
                  <Flex direction={{ default: "row" }}>
                    <FlexItem>
                      <ExclamationIcon color={global_danger_color_100.value} />
                    </FlexItem>
                    <FlexItem className="pf-u-font-size-2xl">
                      {notSent}
                    </FlexItem>
                  </Flex>
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
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
