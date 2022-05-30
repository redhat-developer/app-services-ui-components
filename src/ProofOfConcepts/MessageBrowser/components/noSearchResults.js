import React from "react";
import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { SearchIcon } from "@patternfly/react-icons";

// This example has been simplified to focus on the empty state. In real usage,
// you may want to derive your rows from typed underlying data and minimal state. See other examples.

// export const ComposableTableEmptyState: React.FunctionComponent = () => (
export class ComposableTableEmptyStateClass extends React.Component {
  render() {
    return (
      <TableComposable aria-label="Empty state table">
        <Thead>
          <Tr>
            <Th>Partition</Th>
            <Th>Offset</Th>
            <Th>Timestamp</Th>
            <Th>Key</Th>
            <Th>Value</Th>
            <Th>Headers</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td colSpan={8}>
              <Bullseye>
                <EmptyState variant={EmptyStateVariant.small}>
                  <EmptyStateIcon icon={SearchIcon} />
                  <Title headingLevel="h2" size="lg">
                    No messages data
                  </Title>
                  <EmptyStateBody>
                    Adjust your selection criteria and try again.
                  </EmptyStateBody>
                  <Button variant="link">Show latest messages</Button>
                </EmptyState>
              </Bullseye>
            </Td>
          </Tr>
        </Tbody>
      </TableComposable>
    );
  }
}
