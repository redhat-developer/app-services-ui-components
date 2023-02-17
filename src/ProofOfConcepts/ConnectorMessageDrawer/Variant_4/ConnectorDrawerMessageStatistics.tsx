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
  TextContent,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
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
      <FlexItem>
        {/** headingLevel="h3" size={TitleSizes['lg']}*/}
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
                  1600
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
                  12
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
