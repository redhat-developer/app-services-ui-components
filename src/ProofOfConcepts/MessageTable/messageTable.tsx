import React, { VoidFunctionComponent } from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";

interface Repository {
  partition: string;
  offset: string | null;
  timestamp: string | null;
  key: string;
  value: string;
  headers: string;
}

export const Table: VoidFunctionComponent = () => {
  // In real usage, this data would come from some external source like an API via props.
  const repositories: Repository[] = [
    {
      partition: "0",
      offset: "9",
      timestamp: "Feb 6, 2022, 11:26:00:456 AM",
      key: "this-is-a-sample-key",
      value:
        '{"menu":{ "id":{"20", "value":"File", "popup":{ "menuitem":[ {"value":"New", "onclick":"CreateNewDoc()"}, {"value":"...show more',
      headers:
        '{"key": Strut{order_id=3}", "payload":{"order_id":{ "string":"3" }, "customer_id":{"string":"695" }, "order_total_en... ',
    },
    {
      partition: "0",
      offset: "8",
      timestamp: "Feb 6, 2022, 11:26:00:456 AM",
      key: "this-is-a-sample-key",
      value:
        '{"menu":{ "id":{"20", "value":"File", "popup":{ "menuitem":[ {"value":"New", "onclick":"CreateNewDoc()"}, {"value":"...show more',
      headers:
        '{"key": Strut{order_id=3}", "payload":{"order_id":{ "string":"3" }, "customer_id":{"string":"695" }, "order_total_en... ',
    },
    {
      partition: "0",
      offset: "7",
      timestamp: "Feb 6, 2022, 11:26:00:456 AM",
      key: "this-is-a-sample-key",
      value:
        '{"menu":{ "id":{"20", "value":"File", "popup":{ "menuitem":[ {"value":"New", "onclick":"CreateNewDoc()"}, {"value":"...show more',
      headers:
        '{"key": Strut{order_id=3}", "payload":{"order_id":{ "string":"3" }, "customer_id":{"string":"695" }, "order_total_en... ',
    },
  ];

  const columnNames = {
    partition: "Partition",
    offset: "Offset",
    timestamp: "Time Stamp",
    key: "Key",
    value: "Value",
    headers: "Headers",
  };

  // In this example, selected rows are tracked by the repo names from each row. This could be any unique identifier.
  // This is to prevent state from being based on row order index in case we later add sorting.
  const [selectedRepoNames, setSelectedRepoNames] = React.useState<string[]>(
    []
  );
  const setRepoSelected = (repo: Repository, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== repo.partition
      );
      return isSelecting
        ? [...otherSelectedRepoNames, repo.partition]
        : otherSelectedRepoNames;
    });
  const isRepoSelected = (repo: Repository) =>
    selectedRepoNames.includes(repo.partition);

  return (
    <TableComposable aria-label="Hoverable table">
      <Thead>
        <Tr>
          <Th>{columnNames.partition}</Th>
          <Th>{columnNames.offset}</Th>
          <Th>{columnNames.timestamp}</Th>
          <Th>{columnNames.key}</Th>
          <Th>{columnNames.value}</Th>
          <Th>{columnNames.headers}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {repositories.map((repo) => (
          <Tr
            key={repo.partition}
            onRowClick={() => setRepoSelected(repo, !isRepoSelected(repo))}
            isHoverable
            isRowSelected={isRepoSelected(repo)}
          >
            <Td dataLabel={columnNames.partition}>{repo.partition}</Td>
            <Td dataLabel={columnNames.offset}>{repo.offset}</Td>
            <Td dataLabel={columnNames.timestamp}>{repo.timestamp}</Td>
            <Td dataLabel={columnNames.key}>{repo.key}</Td>
            <Td dataLabel={columnNames.value}>{repo.value}</Td>
            <Td dataLabel={columnNames.headers}>{repo.headers}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};
