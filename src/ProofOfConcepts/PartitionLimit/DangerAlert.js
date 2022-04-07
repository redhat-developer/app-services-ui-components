import ReactDOM from "react-dom";
import React from "react";
import { Alert } from "@patternfly/react-core";

export const ExpandableDangerAlert = () => (
  <React.Fragment>
    <Alert
      isExpandable
      isInline
      variant="danger"
      title="This Kafka instance reached the partition limit"
    >
      <p>
        This Kafka instance has reached its maximum partition limit and might
        experience degraded performance.
      </p>
    </Alert>
  </React.Fragment>
);
