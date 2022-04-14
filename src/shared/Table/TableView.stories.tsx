import { ComponentMeta, ComponentStory } from "@storybook/react";
import { actions } from "@storybook/addon-actions";
import { DEFAULT_PERPAGE, TableView, TableViewProps } from "./TableView";
import {
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateIcon,
  EmptyStateVariant,
  SearchInput,
  Title,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { InfoIcon } from "@patternfly/react-icons";
import { useMemo, VoidFunctionComponent } from "react";
import {
  columnLabels,
  defaultActions,
  deletingSign,
  sampleData,
  SampleDataType,
  sampleToolbarWithFilter,
} from "./storybookHelpers";

const eventsFromNames = actions("onRowClick");

const TableViewSampleType: VoidFunctionComponent<
  TableViewProps<SampleDataType>
> = (props) => <TableView {...props} />;

export default {
  component: TableView,
  args: {
    ariaLabel: "Table title",
    minimumColumnWidth: 250,
    selectedRow: 3,
    expectedLength: 3,
    page: 1,
    perPage: 10,
    itemCount: 397,
    data: sampleData,
    toolbarContent: (
      <ToolbarGroup>
        <ToolbarItem>
          <SearchInput />
        </ToolbarItem>
        <ToolbarItem>
          <Button>Sample</Button>
        </ToolbarItem>
      </ToolbarGroup>
    ),
  },
} as ComponentMeta<typeof TableViewSampleType>;

const Template: ComponentStory<typeof TableViewSampleType> = (args) => {
  const { itemCount, page, perPage = DEFAULT_PERPAGE, data } = args;
  const slicedData = useMemo(() => {
    if (data) {
      if (data.length > 0) {
        return new Array(Math.min(perPage, itemCount - (page - 1) * perPage))
          .fill(0)
          .map((_, index) => {
            return data[index % sampleData.length];
          });
      }
      return [];
    }
    return undefined;
  }, [data, itemCount, page, perPage]);
  return (
    <TableView
      {...args}
      data={slicedData}
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
      isRowSelected={
        args.selectedRow
          ? ({ rowIndex }) => rowIndex === args.selectedRow - 1
          : undefined
      }
      isRowDeleted={({ row }) => row[5] === deletingSign}
      {...eventsFromNames}
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
    </TableView>
  );
};

export const Example = Template.bind({});
Example.args = {};

export const UpdatingResults = Template.bind({});
UpdatingResults.args = {
  data: undefined,
  itemCount: undefined,
  toolbarContent: sampleToolbarWithFilter,
};

export const NoResults = Template.bind({});
NoResults.args = {
  data: [],
  toolbarContent: sampleToolbarWithFilter,
};

export const SinglePage = Template.bind({});
SinglePage.args = {
  itemCount: sampleData.length,
};

export const LastPage = Template.bind({});
LastPage.args = {
  itemCount: 27,
  page: 3,
};

export const LoadingNewPage = Template.bind({});
LoadingNewPage.args = {
  data: undefined,
  itemCount: 27,
  page: 3,
};
