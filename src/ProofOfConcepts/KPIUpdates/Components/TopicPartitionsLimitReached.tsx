import { Alert } from "@patternfly/react-core";
import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-circle-icon";
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

export const TopicPartitionsLimitReached: VoidFunctionComponent = () => {
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
            1000 {""}
            <ExclamationCircleIcon color="var(--pf-global--danger-color--100)" />
          </Title>
          <TextContent>
            <Text>Limit 1000 partitions.</Text>
          </TextContent>
        </CardBody>
        <CardFooter>
          <Alert
            isExpandable
            isInline
            variant="danger"
            title="This Kafka instance reached the partition limit"
          >
            <p>
              This Kafka instance has reached its maximum partition limit and
              might experience degraded performance.
            </p>
          </Alert>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};
