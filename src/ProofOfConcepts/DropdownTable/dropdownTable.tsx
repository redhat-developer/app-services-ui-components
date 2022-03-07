/* eslint-disable no-console */
import React from "react";
import {
  Button,
  DropdownToggle,
  ToggleGroup,
  ToggleGroupItem,
  ToggleGroupItemProps,
} from "@patternfly/react-core";
import {
  TableComposable,
  TableText,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  CustomActionsToggleProps,
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

type ExampleType = "defaultToggle" | "customToggle";

export const DropdownTable: React.FunctionComponent = () => {
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

  // This state is just for the ToggleGroup in this example and isn't necessary for TableComposable usage.
  const [exampleChoice, setExampleChoice] =
    React.useState<ExampleType>("defaultToggle");
  const onExampleTypeChange: ToggleGroupItemProps["onChange"] = (
    _isSelected,
    event
  ) => {
    const id = event.currentTarget.id;
    setExampleChoice(id as ExampleType);
  };

  const customActionsToggle = (props: CustomActionsToggleProps) => (
    <DropdownToggle onToggle={props.onToggle} isDisabled={props.isDisabled}>
      Actions
    </DropdownToggle>
  );

  const defaultActions = (repo: Repository): IAction[] => [
    {
      title: "View details",
      onClick: () =>
        console.log(`clicked on View details, on row ${repo.name}`),
    },
    {
      title: "View connections information",
      onClick: () =>
        console.log(
          `clicked on View connections information, on row ${repo.name}`
        ),
    },
    {
      isSeparator: true,
    },
    {
      title: "Delete instance",
      onClick: () =>
        console.log(`clicked on Delete instance, on row ${repo.name}`),
    },
  ];

  const lastRowActions = (repo: Repository): IAction[] => [
    {
      title: "Some action",
      onClick: () => console.log(`clicked on Some action, on row ${repo.name}`),
    },
    {
      title: <div>Another action</div>,
      onClick: () =>
        console.log(`clicked on Another action, on row ${repo.name}`),
    },
    {
      isSeparator: true,
    },
    {
      title: "Third action",
      onClick: () =>
        console.log(`clicked on Third action, on row ${repo.name}`),
    },
  ];

  return (
    <React.Fragment>
      <ToggleGroup aria-label="Default uses kebab toggle">
        <ToggleGroupItem
          text="Default actions toggle"
          buttonId="defaultToggle"
          isSelected={exampleChoice === "defaultToggle"}
          onChange={onExampleTypeChange}
        />
        <ToggleGroupItem
          text="Custom actions toggle"
          buttonId="customToggle"
          isSelected={exampleChoice === "customToggle"}
          onChange={onExampleTypeChange}
        />
      </ToggleGroup>
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
            if (repo.name === "a") {
              rowActions = null;
            }
            if (repo.name === "5") {
              rowActions = lastRowActions(repo);
            }
            let singleActionButton = null;
            if (repo.singleAction !== "") {
              singleActionButton = (
                <TableText>
                  <Button variant="secondary">{repo.singleAction}</Button>
                </TableText>
              );
            }

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
                  {rowActions ? (
                    <ActionsColumn
                      items={rowActions}
                      isDisabled={repo.name === "4"} // Also arbitrary for the example
                      actionsToggle={
                        exampleChoice === "customToggle"
                          ? customActionsToggle
                          : undefined
                      }
                    />
                  ) : null}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </TableComposable>
    </React.Fragment>
  );
};
