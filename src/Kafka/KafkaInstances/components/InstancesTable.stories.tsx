import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { InstancesTable as InstancesTableComp } from "./InstancesTable";
import { instances } from "../storiesHelper";
import { ReadyStatuses } from "../../types";

export default {
  component: InstancesTableComp,
  args: {
    getUrlForInstance: () => "",
    names: [],
    owners: [],
    statuses: [],
    isRefreshing: false,
    canChangeOwner: (row) =>
      row.owner === "baz-owner" || row.status === "suspended",
    canOpenConnection: (row) => row.status !== "suspended",
    canDelete: (row) => row.owner === "baz-owner",
    canHaveInstanceLink: (row) => ReadyStatuses.includes(row["status"]),
  },
} as ComponentMeta<typeof InstancesTableComp>;

const Template: ComponentStory<typeof InstancesTableComp> = (args) => (
  <InstancesTableComp {...args} />
);

export const FirstLoadShowsSpinner = Template.bind({});
FirstLoadShowsSpinner.args = {
  instances: null,
};

export const LoadingDataAfterFilteringShowsASkeleton = Template.bind({});
LoadingDataAfterFilteringShowsASkeleton.args = {
  instances: undefined,
  names: ["foo"],
};

export const NoInitialDataShowsTheRightEmptyState = Template.bind({});
NoInitialDataShowsTheRightEmptyState.args = {
  instances: [],
};

export const NoDataWithAFilterShowsTheRightEmptyState = Template.bind({});
NoDataWithAFilterShowsTheRightEmptyState.args = {
  instances: [],
  names: ["foo"],
};

export const InstancesTable = Template.bind({});
InstancesTable.args = {
  instances: instances,
};
