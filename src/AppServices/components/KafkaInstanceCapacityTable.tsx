import {
  TableComposable,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@patternfly/react-table";
import type { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";

interface CapacityTable {
  name: string;
  firstStreamingUnit: string;
  secondStreamingUnit: string;
}

export const KafkaInstanceCapacityTable: FunctionComponent = () => {
  const { t } = useTranslation("kafkaoverview-v2");

  const capacityTable: CapacityTable[] = [
    {
      name: "Ingress (MB/second)",
      firstStreamingUnit: "up to 50",
      secondStreamingUnit: "up to 100",
    },
    {
      name: "Egress (MB/second)",
      firstStreamingUnit: "up to 100",
      secondStreamingUnit: "up to 200",
    },
    {
      name: "Storage* (GB)",
      firstStreamingUnit: "up to 1000",
      secondStreamingUnit: "up to 2000",
    },
    {
      name: "Topic partitions",
      firstStreamingUnit: "up to 1500",
      secondStreamingUnit: "up to 3000",
    },
    {
      name: "Client connections",
      firstStreamingUnit: "up to 9000",
      secondStreamingUnit: "up to 18000",
    },
    {
      name: "Connection rate (connections/second)",
      firstStreamingUnit: "up to 100",
      secondStreamingUnit: "up to 200",
    },
    {
      name: "Message size (MB)",
      firstStreamingUnit: "up to 1",
      secondStreamingUnit: "up to 1",
    },
  ];

  const columnNames = {
    name: "",
    firstStreamingUnit: t("firstStreamingUnit"),
    secondStreamingUnit: t("secondStreamingUnit"),
  };

  return (
    <TableComposable>
      <Thead>
        <Tr>
          <Th>{columnNames.name}</Th>
          <Th>{columnNames.firstStreamingUnit}</Th>
          <Th>{columnNames.secondStreamingUnit}</Th>
        </Tr>
      </Thead>
      <Tbody>
        {capacityTable.map((table) => {
          return (
            <Tr key={table.name}>
              <Td dataLabel={columnNames.name}>{table.name}</Td>
              <Td dataLabel={columnNames.firstStreamingUnit}>
                {table.firstStreamingUnit}
              </Td>
              <Td dataLabel={columnNames.secondStreamingUnit}>
                {table.secondStreamingUnit}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </TableComposable>
  );
};
