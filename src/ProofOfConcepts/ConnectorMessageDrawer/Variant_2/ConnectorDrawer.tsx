import React from "react";
import { FunctionComponent } from "react";

import {
  DescriptionList,
  DescriptionListTerm,
  DescriptionListGroup,
  DescriptionListDescription,
  Flex,
  FlexItem,
  Tab,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
  TextVariants,
} from "@patternfly/react-core";
import {
  global_warning_color_100,
  global_success_color_100,
} from "@patternfly/react-tokens";
import { OutlinedClockIcon, CheckCircleIcon } from "@patternfly/react-icons";
import { ConnectorDrawerMessageStatistics } from "./ConnectorDrawerMessageStatistics";

export type ConnectorDrawerProps = {
  sent: string;
  notSent: string;
};

export const ConnectorDrawer: FunctionComponent<ConnectorDrawerProps> = ({
  sent,
  notSent,
}) => {
  return (
    <Flex direction={{ default: "column" }}>
      <TextContent>
        <Text component={TextVariants.small}>Connector Name</Text>
        <Flex direction={{ default: "row" }}>
          <Text component={TextVariants.h2}>w-1jk-987yubhjudd2121</Text>
          <FlexItem>
            <CheckCircleIcon color={global_success_color_100.value} />
          </FlexItem>
          <FlexItem>Ready</FlexItem>
        </Flex>
      </TextContent>
      <Tabs>
        <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>}>
          <ConnectorDrawerMessageStatistics sent={sent} notSent={notSent} />
          <FlexItem>
            <DescriptionList isHorizontal>
              <DescriptionListGroup>
                <DescriptionListTerm>Connector</DescriptionListTerm>
                <DescriptionListDescription>
                  4980-9c9c-48285f163
                </DescriptionListDescription>
                <DescriptionListTerm>Connector ID</DescriptionListTerm>
                <DescriptionListDescription>
                  ccp6jj6qe20inajk5090
                </DescriptionListDescription>
                <DescriptionListTerm>Bootstrap server</DescriptionListTerm>
                <DescriptionListDescription>
                  cestay-ins-ccor--pa-bavtg--g-
                </DescriptionListDescription>
                <DescriptionListTerm>Kafka instance</DescriptionListTerm>
                <DescriptionListDescription className="pf-u-link-color">
                  MK-instance-test
                </DescriptionListDescription>
                <DescriptionListTerm>Namespace</DescriptionListTerm>
                <DescriptionListDescription>
                  Redhat-eval-namespace
                  <TextContent>
                    <Text className="text-color">
                      <OutlinedClockIcon
                        color={global_warning_color_100.value}
                      />
                      Expire in 23 hours 37 minutes
                    </Text>
                  </TextContent>
                </DescriptionListDescription>
              </DescriptionListGroup>
            </DescriptionList>
          </FlexItem>
        </Tab>
      </Tabs>
    </Flex>
  );
};
