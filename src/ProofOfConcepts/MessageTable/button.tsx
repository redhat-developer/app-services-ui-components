import React, { VoidFunctionComponent } from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@patternfly/react-table";
// This example has been simplified to focus on the text modifier props. In real usage,
// you may want to derive your rows from typed underlying data and minimal state. See other examples.

const columnNames = {
  partition: "Partition (width 20%)",
  offset: "Offset",
  timestamp: "Timestamp",
  key: "Key",
  value: "Value",
  header: "Header",
};

export const Button: VoidFunctionComponent = () => (
  <TableComposable aria-label="Controlling text">
    <Thead>
      <Tr>
        <Th width={20}>{columnNames.partition}</Th>
        <Th>{columnNames.offset}</Th>
        <Th>{columnNames.timestamp}</Th>
        <Th>{columnNames.key}</Th>
        <Th>{columnNames.value}</Th>
        <Th>{columnNames.header}</Th>
      </Tr>
    </Thead>
    <Tbody>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          9
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:26:00:456 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          this-is-a-sample-key
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          <div>
            {
              "{”menu”:{ ”id”:{“20”, ”value”:”File”, ”popup”:{ ”menuitem”:[ {”value”:”New”, ”onclick”:”CreateNewDoc()”}, {”value”:”…show more’..."
            }
            <a>Show more</a>
          </div>
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          <div>
            {
              '{”key”: Strut{order_id=3}”, ”payload”:{“order_id”:{ "string”:”3” }, ”customer_id”:{“string”:”695” }, ”order_total_en...'
            }
            <a>Show more</a>
          </div>
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          8
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:25:55:999 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          this-is-another-sample-key
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          <div>
            {
              "{”menu”:{ ”id”:{“19”, ”value”:”File”, ”popup”:{ ”menuitem”:[ {”value”:”New”, ”onclick”:”CreateNewDoc()”}, {”value”:”…show more’..."
            }
            <a>Show more</a>
          </div>
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          {'{”trace-id”: "b1cf7a545dg6sa8d7ac:dc7a9fg651ad767j83:1” '}
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          7
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:24:53:123 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          null
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          Test
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          []
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          6
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:20:00:321 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          15
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          {
            "{”menu”:{ ”id”:{“19”, ”popup”:{ ”menuitem”:[ {”value”:”New”, ”onclick”:”CreateNewDoc()”} ] } }}"
          }
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          []
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          5
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:18:10:001 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          15
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          {'"test":{ "id":"11"'}
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          {"{”test-id”: 110”"}
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          4
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:16:00:007 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          this-is-a-long-sample-key-something-something
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          {'"test":{ "id":"10"'}
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          []
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          3
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:15:50:978 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          15
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          {'"test":{ "id":"9"'}
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          {'{”test-id”: "110}”'}
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          2
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:15:01:567 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          <div>
            {
              "this-is-a-super-long-sample-key-something-something-something-else-on..."
            }
            <a>Show more</a>
          </div>
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          {'"test":{ "id":"10"'}
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          []
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          1
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 11:00:00:777 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          12
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          {'"test":{ "id":"9"'}
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          {'{”test-id”: "110}”'}
        </Td>
      </Tr>
      <Tr>
        <Td dataLabel={columnNames.partition} modifier="truncate">
          0
        </Td>
        <Td dataLabel={columnNames.offset} modifier="breakWord">
          0
        </Td>
        <Td dataLabel={columnNames.timestamp} modifier="breakWord">
          Feb 6, 2022, 10:55:08:133 AM
        </Td>
        <Td dataLabel={columnNames.key} modifier="breakWord">
          null
        </Td>
        <Td dataLabel={columnNames.value} modifier="breakWord">
          Hello world
        </Td>
        <Td dataLabel={columnNames.header} modifier="breakWord">
          []
        </Td>
      </Tr>
    </Tbody>
  </TableComposable>
);
