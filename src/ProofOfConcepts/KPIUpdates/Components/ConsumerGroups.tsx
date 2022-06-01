import {
  Card,
  CardBody,
  CardTitle,
  Popover,
  Title,
} from "@patternfly/react-core";
import { OutlinedQuestionCircleIcon } from "@patternfly/react-icons";
import React, { VoidFunctionComponent } from "react";

export const ConsumerGroups: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      <Card isFullHeight data-testid="TopicPartitions">
        <CardTitle component="h3">
          Consumer groups {""}
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
            3
          </Title>
        </CardBody>
      </Card>
    </React.Fragment>
  );
};
