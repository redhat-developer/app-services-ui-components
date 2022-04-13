import { ComponentMeta, ComponentStory } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import { ResponsiveTable, ResponsiveTableProps } from "./ResponsiveTable";
import {
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  Title,
} from "@patternfly/react-core";
import { InfoIcon } from "@patternfly/react-icons";
import { VoidFunctionComponent } from "react";
import {
  columnLabels,
  defaultActions,
  deletingSign,
  sampleData,
  SampleDataType,
} from "./storybookHelpers";

const eventsFromNames = actions("onRowClick");

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
        Empty state to show when the data is filtered but has no results
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

export const UndefinedDataShowsSkeleton = Template.bind({});
UndefinedDataShowsSkeleton.args = {
  data: undefined,
};

export const NoResults = Template.bind({});
NoResults.args = {
  data: [],
};
