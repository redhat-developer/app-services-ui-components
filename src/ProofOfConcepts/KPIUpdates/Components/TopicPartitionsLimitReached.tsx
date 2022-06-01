import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Popover,
  Text,
  TextContent,
  Title,
} from "@patternfly/react-core";
import {
  ExclamationCircleIcon,
  OutlinedQuestionCircleIcon,
} from "@patternfly/react-icons";
import React, { VoidFunctionComponent } from "react";

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
            title="This Kafka Instance reached the partition limit"
          >
            <p>
              This Kafka Instance has reached its maximum partition limit and
              might experience degraded performance.
              <p></p>
              To create more partitions, consider migrating to a larger Kafka
              Instance or splitting your workloads across multiple instances.
            </p>
          </Alert>
        </CardFooter>
      </Card>
    </React.Fragment>
  );
};
