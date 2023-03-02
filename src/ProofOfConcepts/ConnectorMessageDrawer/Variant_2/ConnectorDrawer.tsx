import React from "react";
import { FunctionComponent } from "react";

import {
  Flex,
  FlexItem,
  Tab,
  Tabs,
  TabTitleText,
  Text,
  TextContent,
  TextList,
  TextListVariants,
  TextListItem,
  TextListItemVariants,
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
          <CheckCircleIcon color={global_success_color_100.value} />
          Ready
        </Flex>
      </TextContent>
      <Tabs>
        <Tab eventKey={0} title={<TabTitleText>Details</TabTitleText>}>
          <ConnectorDrawerMessageStatistics sent={sent} notSent={notSent} />
          <FlexItem>
            <TextContent>
              <TextList component={TextListVariants.dl}>
                <TextListItem component={TextListItemVariants.dt}>
                  <Text component={TextVariants.h3}>Connector</Text>
                </TextListItem>
                <TextListItem component={TextListItemVariants.dd}>
                  4980-9c9c-48285f163
                </TextListItem>
                <TextListItem component={TextListItemVariants.dt}>
                  <Text component={TextVariants.h3}>Connector ID</Text>
                </TextListItem>
                <TextListItem component={TextListItemVariants.dd}>
                  ccp6jj6qe20inajk5090
                </TextListItem>
                <TextListItem component={TextListItemVariants.dt}>
                  <Text component={TextVariants.h3}>Bootstrap server</Text>
                </TextListItem>
                <TextListItem component={TextListItemVariants.dd}>
                  cestay-ins-ccor--pa-bavtg--g-
                </TextListItem>
                <TextListItem component={TextListItemVariants.dt}>
                  <Text component={TextVariants.h3}>Kafka instance</Text>
                </TextListItem>
                <TextListItem
                  className="pf-u-link-color"
                  component={TextListItemVariants.dd}
                >
                  MK-instance-test
                </TextListItem>
                <TextListItem component={TextListItemVariants.dt}>
                  <Text component={TextVariants.h3}>Namespace</Text>
                </TextListItem>
                <TextListItem component={TextListItemVariants.dd}>
                  Redhat-eval-namespace
                </TextListItem>
                <TextListItem
                  component={TextListItemVariants.dd}
                  className="text-color"
                >
                  <OutlinedClockIcon color={global_warning_color_100.value} />
                  Expire in 23 hours 37 minutes
                </TextListItem>
              </TextList>
            </TextContent>
          </FlexItem>
        </Tab>
      </Tabs>
    </Flex>
  );
};
