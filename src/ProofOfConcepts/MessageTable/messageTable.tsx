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
  offset: string;
  timestamp: string | object;
  key: string | object;
  value: string | object;
  header: string | object;
}

export const Table: VoidFunctionComponent = () => {
  // In real usage, this data would come from some external source like an API via props.
  const repositories: Repository[] = [
    {
      partition: "0",
      offset: "9",
      timestamp: "Feb 6, 2022, 11:26:00:456 AM",
      key: "this-is-a-sample-key",
      value: (
        <div className="text">
          {
            " {”menu”:{ ”id”:{“20”, ”value”:”File”, ”popup”:{ ”menuitem”:[ {”value”:”New”, ”onclick”:”CreateNewDoc()”}, {”value”:” . . . "
          }
          <a>Show more</a>
        </div>
      ),
      header: (
        <div className="text">
          {
            '{”key”: Struct{order_id=3}”, ”payload”:{“order_id”:{ "string”:”3” }, ”customer_id”:{“string”:”695” }, ”order_total_en . . . '
          }
          <a>Show more</a>
        </div>
      ),
    },

    {
      partition: "0",
      offset: "8",
      timestamp: "Feb 6, 2022, 11:25:55:999 AM",
      key: "this-is-another-sample-key",
      value: (
        <div className="text">
          {
            "{”menu”:{ ”id”:{“19”, ”value”:”File”, ”popup”:{ ”menuitem”:[ {”value”:”New”, ”onclick”:”CreateNewDoc()”}, {”value”:” . . .  "
          }
          <a>Show more</a>
        </div>
      ),
      header: '{”trace-id”: "b1cf7a545dg6sa8d7ac:dc7a9fg651ad767j83:1”}',
    },

    {
      partition: "0",
      offset: "7",
      timestamp: "Feb 6, 2022, 11:24:53:123 AM",
      key: "null",
      value: "Test",
      header: "[]",
    },

    {
      partition: "0",
      offset: "6",
      timestamp: "Feb 6, 2022, 11:20:00:321 AM",
      key: "15",
      value:
        "{”menu”:{ ”id”:{“19”, ”popup”:{ ”menuitem”:[ {”value”:”New”, ”onclick”:”CreateNewDoc()”} ] } }}",
      header: "[]",
    },

    {
      partition: "0",
      offset: "5",
      timestamp: "Feb 6, 2022, 11:18:10:001 AM",
      key: "15",
      value: '{"test":{ "id":"10"}}',
      header: "{”test-id”: 11”}",
    },

    {
      partition: "0",
      offset: "4",
      timestamp: "Feb 6, 2022, 11:16:00:007 AM",
      key: "this-is-a-long-sample-key-something-something",
      value: '{"test":{ "id":"10"}}',
      header: (
        <div className="text">
          {
            '{"menu":{ "id":"19", "value":"File", "popup":{"menuitem":[ {"value":"New", "onclick": "CreateNewDoc()"}, {"value": . . .'
          }{" "}
          <a>Show more</a>
        </div>
      ),
    },

    {
      partition: "0",
      offset: "3",
      timestamp: "Feb 6, 2022, 11:15:50:978 AM",
      key: "15",
      value: '{"test":{ "id":"9"}}',
      header: "{”test-id”: 110”}",
    },

    {
      partition: "0",
      offset: "2",
      timestamp: "Feb 6, 2022, 11:15:01:567 AM",
      key: (
        <div className="text">
          {
            "this-is-a-super-long-sample-key-something-something-something-else-on..."
          }
          <a>Show more</a>
        </div>
      ),
      value: '{"test":{ "id":"10"}}',
      header: "[]",
    },

    {
      partition: "0",
      offset: "1",
      timestamp: "Feb 6, 2022, 11:00:00:777 AM",
      key: "12",
      value: '{"test":{ "id":"9}}',
      header: "{”test-id”: 110”}",
    },
    {
      partition: "0",
      offset: "0",
      timestamp: "Feb 6, 2022, 10:55:08:133 AM",
      key: "null",
      value: " Hello world",
      header: "[]",
    },
  ];

  const columnNames = {
    partition: "Partition",
    offset: "Offset",
    timestamp: "Timestamp",
    key: "Key",
    value: "Value",
    header: "Header",
  };

  // In this example, selected rows are tracked by the repo names from each row. This could be any unique identifier.
  // This is to prevent state from being based on row order index in case we later add sorting.
  const [selectedRepoNames, setSelectedRepoNames] = React.useState<string[]>(
    []
  );
  const setRepoSelected = (repo: Repository, isSelecting = true) =>
    setSelectedRepoNames((prevSelected) => {
      const otherSelectedRepoNames = prevSelected.filter(
        (r) => r !== repo.offset
      );
      return isSelecting
        ? [...otherSelectedRepoNames, repo.offset]
        : otherSelectedRepoNames;
    });
  const isRepoSelected = (repo: Repository) =>
    selectedRepoNames.includes(repo.offset);

  return (
    <TableComposable aria-label="Hoverable table">
      <Thead>
        <Tr>
          <Th modifier="nowrap">{columnNames.partition}</Th>
          <Th>{columnNames.offset}</Th>
          <Th>{columnNames.timestamp}</Th>
          <Th>{columnNames.key}</Th>
          <Th>{columnNames.value}</Th>
          <Th>{columnNames.header}</Th>
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
            <Td modifier="nowrap" dataLabel={columnNames.timestamp}>
              {repo.timestamp}
            </Td>
            <Td dataLabel={columnNames.key}>{repo.key}</Td>
            <Td modifier="wrap" dataLabel={columnNames.value}>
              {repo.value}
            </Td>
            <Td dataLabel={columnNames.header}>{repo.header}</Td>
          </Tr>
        ))}
      </Tbody>
    </TableComposable>
  );
};
