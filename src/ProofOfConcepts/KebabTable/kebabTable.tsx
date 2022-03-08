/* eslint-disable no-console */
import React from "react";
import {
  TableComposable,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  ActionsColumn,
  IAction,
} from "@patternfly/react-table";

interface Repository {
  name: string;
  cloudProvider: string;
  region: string;
  owner: string;
  status: string;
  timeCreated: string;
}
export const KebabTable: React.FunctionComponent = () => {
  // In real usage, this data would come from some external source like an API via props.
  const repositories: Repository[] = [
    {
      name: "instanceName",
      cloudProvider: "Amazon Web Services",
      region: "US East, N. Virginia ",
      owner: "owner@redhat.com",
      status: "Ready",
      timeCreated: "1 day ago",
    },
    {
      name: "instanceName2",
      cloudProvider: "Amazon Web Services",
      region: "US East, N. Virginia ",
      owner: "owner2@redhat.com",
      status: "Ready",
      timeCreated: "1 day ago",
    },
  ];
  const columnNames = {
    name: "Name",
    cloudProvider: "Cloud provider",
    region: "Region",
    owner: "Owner",
    status: "Status",
    timeCreated: "Time created",
  };

  const defaultActions = (repo: Repository): IAction[] => [
    {
      title: "Details",
      onClick: () => console.log(`clicked on Details, on row ${repo.name}`),
    },
    {
      title: "Connections",
      onClick: () => console.log(`clicked on Connections, on row ${repo.name}`),
    },
    {
      title: "[primary data plane tab]",
      onClick: () =>
        console.log(`clicked on [primary data plane tab], on row ${repo.name}`),
    },
    {
      isSeparator: true,
    },
    {
      title: "Change owner",
      onClick: () =>
        console.log(`clicked on Change owner, on row ${repo.name}`),
    },
    {
      title: "Delete instance",
      onClick: () =>
        console.log(`clicked on Delete instance, on row ${repo.name}`),
    },
  ];
  return (
    <TableComposable aria-label="Actions table">
      <Thead>
        <Tr>
          <Th>{columnNames.name}</Th>
          <Th>{columnNames.cloudProvider}</Th>
          <Th>{columnNames.region}</Th>
          <Th>{columnNames.owner}</Th>
          <Th>{columnNames.status}</Th>
          <Th>{columnNames.timeCreated}</Th>
          <Td></Td>
        </Tr>
      </Thead>
      <Tbody>
        {repositories.map((repo) => {
          // Arbitrary logic to determine which rows get which actions in this example
          let rowActions: IAction[] | null = defaultActions(repo);

          return (
            <Tr key={repo.name}>
              <Td dataLabel={columnNames.name}>{repo.name}</Td>
              <Td dataLabel={columnNames.cloudProvider}>
                {repo.cloudProvider}
              </Td>
              <Td dataLabel={columnNames.region}>{repo.region}</Td>
              <Td dataLabel={columnNames.owner}>{repo.owner}</Td>
              <Td dataLabel={columnNames.status}>{repo.status}</Td>
              <Td dataLabel={columnNames.timeCreated}>{repo.timeCreated}</Td>
              <Td isActionCell>
                {rowActions ? <ActionsColumn items={rowActions} /> : null}
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </TableComposable>
  );
};
