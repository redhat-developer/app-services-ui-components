import { ComponentMeta, ComponentStory } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import { ResponsiveTable, ResponsiveTableProps } from "./ResponsiveTable";
import { IAction } from "@patternfly/react-table";
import { KafkaInstanceStatus } from "../../Kafka";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { InfoIcon } from "@patternfly/react-icons";
import { VoidFunctionComponent } from "react";

const eventsFromNames = actions("onRowClick");

const columnLabels: { [key: string]: string } = {
  name: "Name",
  owner: "Owner",
  timeCreated: "Time created",
  cloudProvider: "Cloud Provider",
  region: "Region",
  status: "Status",
};

const readySign = (
  <KafkaInstanceStatus
    status={"ready"}
    createdAt={new Date()}
    onClickConnectionTabLink={() => false}
    onClickSupportLink={() => false}
  />
);
const creationPendingSign = (
  <KafkaInstanceStatus
    status={"preparing"}
    createdAt={new Date()}
    onClickConnectionTabLink={() => false}
    onClickSupportLink={() => false}
  />
);
const deletingSign = (
  <KafkaInstanceStatus
    status={"deleting"}
    createdAt={new Date()}
    onClickConnectionTabLink={() => false}
    onClickSupportLink={() => false}
  />
);
type SampleDataType = [
  string,
  string,
  string,
  string,
  string,
  typeof readySign | typeof creationPendingSign | typeof deletingSign
];
const sampleData: Array<SampleDataType> = [
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
    deletingSign,
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

const ResponsiveTableSampleType: VoidFunctionComponent<
  ResponsiveTableProps<SampleDataType>
> = (props) => <ResponsiveTable {...props} />;

export default {
  component: ResponsiveTable,
  args: {
    ariaLabel: "Table title",
    minimumColumnWidth: 250,
    data: sampleData,
    columns: Object.keys(columnLabels),
    hasActions: true,
    isRowClickable: true,
    selectedRow: 3,
    expectedLength: 3,
  },
  argTypes: {
    hasActions: { control: "boolean" },
    isRowClickable: { control: "boolean" },
    selectedRow: { control: "number" },
  },
} as ComponentMeta<typeof ResponsiveTableSampleType>;

const Template: ComponentStory<typeof ResponsiveTableSampleType> = (args) => (
  <ResponsiveTable
    {...args}
    renderHeader={({ column, Th, key }) => (
      <Th key={key}>{columnLabels[column]}</Th>
    )}
    renderCell={({ column, rowData, colIndex, Td, key }) => (
      <Td key={key} dataLabel={columnLabels[column]}>
        {rowData[colIndex]}
      </Td>
    )}
    renderActions={({ rowData, ActionsColumn }) =>
      args.hasActions && <ActionsColumn items={defaultActions(rowData)} />
    }
    isRowSelected={
      args.selectedRow
        ? ({ rowIndex }) => rowIndex === args.selectedRow - 1
        : undefined
    }
    isRowDeleted={({ row }) => row[5] === deletingSign}
    {...(args.isRowClickable ? eventsFromNames : {})}
  >
    <EmptyState variant={EmptyStateVariant.large}>
      <EmptyStateIcon icon={InfoIcon} />
      <Title headingLevel="h4" size="lg">
        You can set up you own empty state
      </Title>
      <EmptyStateBody>
        The <code>children</code> property will be used when no data is
        available as the empty state.
      </EmptyStateBody>
    </EmptyState>
  </ResponsiveTable>
);

export const Example = Template.bind({});
Example.args = {};

export const WithoutActions = Template.bind({});
WithoutActions.args = {
  hasActions: false,
};

export const NonClickableRows = Template.bind({});
NonClickableRows.args = {
  isRowClickable: false,
};

export const NoSelectedRow = Template.bind({});
NoSelectedRow.args = {
  selectedRow: undefined,
};

export const Loading = Template.bind({});
Loading.args = {
  data: undefined,
};

export const NoData = Template.bind({});
NoData.args = {
  data: [],
};
