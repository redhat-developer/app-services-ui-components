import {
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
} from "@patternfly/react-core";
import React, { VoidFunctionComponent } from "react";
import { AppServicesLoading } from "../..";

export const EmptyStateInitialLoading: VoidFunctionComponent = () => {
  return (
    <EmptyState variant={EmptyStateVariant.xs}>
      <EmptyStateBody>
        <AppServicesLoading />
      </EmptyStateBody>
    </EmptyState>
  );
};
