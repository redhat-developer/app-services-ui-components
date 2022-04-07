import ReactDOM from "react-dom";
import React from "react";
import { Alert } from "@patternfly/react-core";

export const ExpandableWarningAlert = () => (
  <React.Fragment>
    <Alert
      isExpandable
      isInline
      variant="warning"
      title="This Kafka instance is close to reaching the partition limit"
    >
      <p>
        This Kafka instance is approaching the partition limit. If the Kafka
        instance exceeds 1000 partitions, it might experience degraded
        performance.
      </p>
    </Alert>
  </React.Fragment>
);
