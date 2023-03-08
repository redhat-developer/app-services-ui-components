import React from "react";
import { FunctionComponent } from "react";

import {
  Card,
  CardBody,
  CardTitle,
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Divider,
  Flex,
  FlexItem,
  Split,
  SplitItem,
  Title,
  TitleSizes,
} from "@patternfly/react-core";
import {
  global_success_color_100,
  global_danger_color_100,
} from "@patternfly/react-tokens";

import { ExclamationIcon } from "@patternfly/react-icons";
import CheckIcon from "@patternfly/react-icons/dist/esm/icons/check-icon";

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
        <Title headingLevel="h3">Processed messages</Title>
      </FlexItem>

      <FlexItem>
        <Split hasGutter>
          <SplitItem isFilled>
            <Card>
              <CardTitle>
                <Title headingLevel="h2" size={TitleSizes["lg"]}>
                  {sent} sent
                </Title>
              </CardTitle>
              <CardBody>
                <CheckIcon color={global_success_color_100.value} />
              </CardBody>
            </Card>
          </SplitItem>
          <SplitItem isFilled>
            <Card>
              <CardTitle>
                <Title headingLevel="h2" size={TitleSizes["lg"]}>
                  {notSent} not sent
                </Title>
              </CardTitle>
              <CardBody>
                <ExclamationIcon color={global_danger_color_100.value} />
              </CardBody>
            </Card>
          </SplitItem>
        </Split>
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
