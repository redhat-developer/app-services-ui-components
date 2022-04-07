import { ExpandableWarningAlert } from "./WarningAlert";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";

import { VoidFunctionComponent } from "react";
import React from "react";
import {
  Bullseye,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Flex,
  FlexItem,
  Stack,
  StackItem,
  Title,
  Popover,
  Text,
  TextContent,
  TextListVariants,
} from "@patternfly/react-core";

export const TopicPartitionsApproachingLimit: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      <Card isFullHeight data-testid="TopicPartitions">
        <CardTitle component="h3">
          Topic Partitions {""}
          <Popover
            aria-label="{title}"
            headerContent={<div>"title"</div>}
            bodyContent={<div>"description"</div>}
          >
            <OutlinedQuestionCircleIcon />
          </Popover>
        </CardTitle>
        <CardBody>
          {/* <br/> */}
          <Title headingLevel="h3" size="4xl">
            950
          </Title>
        </CardBody>
        <CardFooter>
          <TextContent>
            <Text>Limit 1000 partitions.</Text>
          </TextContent>
        </CardFooter>
        <CardFooter>
          <ExpandableWarningAlert />
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};
