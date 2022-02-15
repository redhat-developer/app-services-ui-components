import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ResourceTypeOperationFilter } from "./ResourceTypeOperationFilter";
import { AclResourceType, AclOperation } from "../../types";

export default {
  component: ResourceTypeOperationFilter,
  args: {},
} as ComponentMeta<typeof ResourceTypeOperationFilter>;

const Template: ComponentStory<typeof ResourceTypeOperationFilter> = (args) => {
  return <ResourceTypeOperationFilter {...args} />;
};

export const NoItemChecked = Template.bind({});

export const SomeItemChecked = Template.bind({});
SomeItemChecked.args = {
  checkedItems: [
    {
      id: `${AclResourceType.Group}-${AclOperation.All}`,
      name: AclOperation.All,
    },
    {
      id: `${AclResourceType.Group}-${AclOperation.Read}`,
      name: AclOperation.Read,
    },
    {
      id: `${AclResourceType.Group}-${AclOperation.Delete}`,
      name: AclOperation.Delete,
    },
    {
      id: `${AclResourceType.Group}-${AclOperation.Describe}`,
      name: AclOperation.Describe,
    },
    {
      id: `${AclResourceType.Cluster}-${AclOperation.Alter}`,
      name: AclOperation.Alter,
    },
  ],
};

export const AllItemsChecked = Template.bind({});
AllItemsChecked.args = {
  checkedItems: [
    {
      name: AclOperation.All,
      id: `${AclResourceType.Group}-${AclOperation.All}`,
    },
    {
      name: AclOperation.Read,
      id: `${AclResourceType.Group}-${AclOperation.Read}`,
    },
    {
      name: AclOperation.Delete,
      id: `${AclResourceType.Group}-${AclOperation.Delete}`,
    },
    {
      name: AclOperation.Describe,
      id: `${AclResourceType.Group}-${AclOperation.Describe}`,
    },
    {
      name: AclOperation.Alter,
      id: `${AclResourceType.Cluster}-${AclOperation.Alter}`,
    },
    {
      name: AclOperation.Describe,
      id: `${AclResourceType.Cluster}-${AclOperation.Describe}`,
    },
    {
      name: AclOperation.All,
      id: `${AclResourceType.Topic}-${AclOperation.All}`,
    },
    {
      name: AclOperation.Alter,
      id: `${AclResourceType.Topic}-${AclOperation.Alter}`,
    },
    {
      name: AclOperation.AlterConfigs,
      id: `${AclResourceType.Topic}-${AclOperation.AlterConfigs}`,
    },
    {
      name: AclOperation.Create,
      id: `${AclResourceType.Topic}-${AclOperation.Create}`,
    },
    {
      name: AclOperation.Delete,
      id: `${AclResourceType.Topic}-${AclOperation.Delete}`,
    },
    {
      name: AclOperation.Describe,
      id: `${AclResourceType.Topic}-${AclOperation.Describe}`,
    },
    {
      name: AclOperation.DescribeConfigs,
      id: `${AclResourceType.Topic}-${AclOperation.DescribeConfigs}`,
    },
    {
      name: AclOperation.Read,
      id: `${AclResourceType.Topic}-${AclOperation.Read}`,
    },
    {
      name: AclOperation.Write,
      id: `${AclResourceType.Topic}-${AclOperation.Write}`,
    },
    {
      name: AclOperation.All,
      id: `${AclResourceType.TransactionalId}-${AclOperation.All}`,
    },
    {
      name: AclOperation.Alter,
      id: `${AclResourceType.TransactionalId}-${AclOperation.Alter}`,
    },
    {
      name: AclOperation.Describe,
      id: `${AclResourceType.TransactionalId}-${AclOperation.Describe}`,
    },
  ],
};

export const InteractiveExample = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  return (
    <ResourceTypeOperationFilter
      onCheckedItemsChange={setCheckedItems}
      checkedItems={checkedItems}
    />
  );
};
