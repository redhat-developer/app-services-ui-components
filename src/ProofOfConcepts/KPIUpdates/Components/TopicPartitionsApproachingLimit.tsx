import OutlinedQuestionCircleIcon from "@patternfly/react-icons/dist/esm/icons/outlined-question-circle-icon";
import ExclamationTriangleIcon from "@patternfly/react-icons/dist/esm/icons/exclamation-triangle-icon";

import { VoidFunctionComponent } from "react";
import React from "react";
import {
  Alert,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Title,
  Popover,
  Text,
  TextContent,
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
            title="This Kafka Instance is close to reaching the partition limit"
          >
            <p>
              This Kafka Instance is approaching the partition limit. If the
              Kafka Instance exceeds 1000 partitions, it might experience
              degraded performance.
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
