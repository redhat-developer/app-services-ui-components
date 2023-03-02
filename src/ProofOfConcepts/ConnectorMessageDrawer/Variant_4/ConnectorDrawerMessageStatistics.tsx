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
  DescriptionList,
  DescriptionListGroup,
  DescriptionListDescription,
  DescriptionListTerm,
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
          <CardBody>
            <DescriptionList columnModifier={{ default: "2Col" }}>
              <DescriptionListGroup>
                <DescriptionListTerm>
                  <Title headingLevel="h3" size={TitleSizes["lg"]}>
                    Messages sent
                  </Title>
                </DescriptionListTerm>
                <DescriptionListDescription>
                  <CheckIcon color={global_success_color_100.value} />
                  {sent}
                </DescriptionListDescription>
              </DescriptionListGroup>
              <DescriptionListGroup>
                <DescriptionListTerm>
                  <Title headingLevel="h3" size={TitleSizes["lg"]}>
                    Messages not sent
                  </Title>
                </DescriptionListTerm>
                <DescriptionListDescription>
                  <ExclamationIcon color={global_danger_color_100.value} />
                  {notSent}
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </CardBody>
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
