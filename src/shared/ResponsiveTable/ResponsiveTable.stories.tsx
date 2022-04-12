import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResponsiveTable } from "./ResponsiveTable";
import Success from "@patternfly/react-icons/dist/js/icons/check-circle-icon";
import Creating from "@patternfly/react-icons/dist/js/icons/in-progress-icon";
import { IAction } from "@patternfly/react-table";

const columnLabels: { [key: string]: string } = {
  name: "Name",
  owner: "Owner",
  timeCreated: "Time created",
  cloudProvider: "Cloud Provider",
  region: "Region",
  status: "Status",
};

const readySign = (
  <p>
    <Success color="green" /> Ready
  </p>
);
const creationPendingSign = (
  <p>
    <Creating color="blue" /> Creation pending
  </p>
);
const sampleData = [
  [
    "kafka-test-instance",
    "username",
    "about 2 hours ago",
    "Amazon Web Services",
    "US East, N. Virginia",
    creationPendingSign,
  ],
  [
    "kafka-test-instance-2",
    "username2",
    "about 2 hours ago",
    "Amazon Web Services",
    "US East, N. Virginia",
    creationPendingSign,
  ],
  [
    "kafka-test-instance-3",
    "username3",
    "about 3 hours ago",
    "Amazon Web Services",
    "US East, N. Virginia",
    readySign,
  ],
  [
    "kafka-test-instance-4",
    "username4",
    "about 4 hours ago",
    "Amazon Web Services",
    "US East, N. Virginia",
    readySign,
  ],
  [
    "kafka-test-instance-5",
    "username5",
    "about 5 hours ago",
    "Amazon Web Services",
    "US East, N. Virginia",
    readySign,
  ],
];

const defaultActions = (data: any): IAction[] => [
  {
    title: "Some action",
    onClick: () => console.log(`clicked on Some action, on row ${data[0]}`),
  },
  {
    title: <a href="https://www.patternfly.org">Link action</a>,
  },
  {
    isSeparator: true,
  },
  {
    title: "Third action",
    onClick: () => console.log(`clicked on Third action, on row ${data[0]}`),
  },
];

export default {
  component: ResponsiveTable,
  args: {
    ariaLabel: "Table title",
    minimumColumnWidth: 250,
  },
} as ComponentMeta<typeof ResponsiveTable>;

export const Default: ComponentStory<typeof ResponsiveTable> = (args) => (
  <ResponsiveTable
    {...args}
    data={sampleData}
    columns={Object.keys(columnLabels)}
    renderHeader={({ column, Th, key }) => (
      <Th key={key}>{columnLabels[column]}</Th>
    )}
    renderCell={({ column, rowData, colIndex, Td, key }) => (
      <Td key={key} dataLabel={columnLabels[column]}>
        {rowData[colIndex]}
      </Td>
    )}
  />
);

export const ActionsAreNeverHidden: ComponentStory<typeof ResponsiveTable> = (
  args
) => (
  <ResponsiveTable
    {...args}
    data={sampleData}
    columns={Object.keys(columnLabels)}
    renderHeader={({ column, Th, key }) => (
      <Th key={key}>{columnLabels[column]}</Th>
    )}
    renderCell={({ column, rowData, colIndex, Td, key }) => (
      <Td key={key} dataLabel={columnLabels[column]}>
        {rowData[colIndex]}
      </Td>
    )}
    renderActions={({ rowData, ActionsColumn }) => (
      <ActionsColumn items={defaultActions(rowData)} />
    )}
  />
);
