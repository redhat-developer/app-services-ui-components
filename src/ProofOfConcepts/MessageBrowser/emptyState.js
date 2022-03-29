import React from "react";
import {
  Title,
  Button,
  EmptyState,
  EmptyStateVariant,
  EmptyStateIcon,
  EmptyStateBody,
  EmptyStateSecondaryActions,
} from "@patternfly/react-core";
import CubesIcon from "@patternfly/react-icons/dist/esm/icons/cubes-icon";

export class EmptyStateMessageClass extends React.Component {
  render() {
    return (
      <EmptyState variant={EmptyStateVariant.large}>
        <EmptyStateIcon icon={CubesIcon} />
        <Title headingLevel="h4" size="lg">
          No messages data
        </Title>
        <EmptyStateBody>
          Data will appear shortly after we receive produced messages.
        </EmptyStateBody>
      </EmptyState>
    );
  }
}
