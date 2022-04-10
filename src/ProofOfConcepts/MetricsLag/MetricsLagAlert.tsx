import { VoidFunctionComponent } from "react";
import React from "react";

import {
    Alert,
    AlertActionCloseButton,
    AlertActionLink
} from "@patternfly/react-core";

export const MetricsLagAlert: VoidFunctionComponent = () => {
  return (
    <React.Fragment>
      <Alert
      isInline
      variant="info"
      title="Metrics experience lag"
      actionClose={
        <AlertActionCloseButton
          onClose={() => alert("Clicked the close button")}
        />
      }
    >
      <p>
        Metrics regularly experience lag, and do not automatically refresh. This
        might result in metrics appearing out-of-sync and with details displayed
        on other pages.
      </p>
    </Alert>
    </React.Fragment>
  );
};