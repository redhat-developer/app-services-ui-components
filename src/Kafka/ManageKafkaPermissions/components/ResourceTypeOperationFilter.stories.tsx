import { useState } from "react";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import type { ResourceTypeDataItem } from "./ResourceTypeOperationFilter";
import { ResourceTypeOperationFilter } from "./ResourceTypeOperationFilter";

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
      id: `GROUP-ALL`,
      name: "ALL",
    },
    {
      id: `GROUP-READ`,
      name: "READ",
    },
    {
      id: `GROUP-DELETE`,
      name: "DELETE",
    },
    {
      id: `GROUP-DESCRIBE`,
      name: "DESCRIBE",
    },
    {
      id: `CLUSTER-ALTER`,
      name: "ALTER",
    },
  ],
};

export const AllItemsChecked = Template.bind({});
AllItemsChecked.args = {
  checkedItems: [
    {
      name: "ALL",
      id: `GROUP-ALL`,
      checkProps: { checked: true },
    },
    {
      name: "READ",
      id: `GROUP-READ`,
    },
    {
      name: "DELETE",
      id: `GROUP-DELETE`,
    },
    {
      name: "DESCRIBE",
      id: `GROUP-DESCRIBE`,
    },
    {
      name: "ALTER",
      id: `CLUSTER-ALTER`,
    },
    {
      name: "DESCRIBE",
      id: `CLUSTER-DESCRIBE`,
    },
    {
      name: "ALL",
      id: `TOPIC-ALL`,
    },
    {
      name: "ALTER",
      id: `TOPIC-ALTER`,
    },
    {
      name: "ALTERCONFIGS",
      id: `TOPIC-ALTER_CONFIGS`,
    },
    {
      name: "CREATE",
      id: `TOPIC-CREATE`,
    },
    {
      name: "DELETE",
      id: `TOPIC-DELETE`,
    },
    {
      name: "DESCRIBE",
      id: `TOPIC-DESCRIBE`,
    },
    {
      name: "DESCRIBECONFIGS",
      id: `TOPIC-DESCRIBE_CONFIGS`,
    },
    {
      name: "READ",
      id: `TOPIC-READ`,
    },
    {
      name: "WRITE",
      id: `TOPIC-WRITE`,
    },
    {
      name: "ALL",
      id: `TRANSACTIONAL_ID-ALL`,
    },
    {
      name: "ALTER",
      id: `TRANSACTIONAL_ID-ALTER`,
    },
    {
      name: "DESCRIBE",
      id: `TRANSACTIONAL_ID-DESCRIBE`,
    },
  ],
};

export const InteractiveExample: ComponentStory<
  typeof ResourceTypeOperationFilter
> = () => {
  const [checkedItems, setCheckedItems] = useState<ResourceTypeDataItem[]>([]);
  return (
    <ResourceTypeOperationFilter
      onCheckedItemsChange={setCheckedItems}
      checkedItems={checkedItems}
    />
  );
};
