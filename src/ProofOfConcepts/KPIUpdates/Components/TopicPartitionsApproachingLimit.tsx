import { Alert } from "@patternfly/react-core";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";

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
          Topic partitions {""}
          <Popover
            aria-label="{title}"
            headerContent={<div>"title"</div>}
            bodyContent={<div>"description"</div>}
          >
            <OutlinedQuestionCircleIcon />
          </Popover>
        </CardTitle>
        <CardBody>
          <Title headingLevel="h3" size="4xl">
            950 {""}
            <ExclamationTriangleIcon color="var(--pf-global--warning-color--100)" />
          </Title>
          <TextContent>
            <Text>Limit 1000 partitions.</Text>
          </TextContent>
        </CardBody>
        <CardFooter>
          <Alert
            isExpandable
            isInline
            variant="warning"
            title="This Kafka instance is close to reaching the partition limit"
          >
            <p>
              This Kafka instance is approaching the partition limit. If the
              Kafka instance exceeds 1000 partitions, it might experience
              degraded performance. 
            </p>
          </Alert>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};
