import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { ResourceTypeOperationFilter } from "./ResourceTypeOperationFilter";

export default {
  component: ResourceTypeOperationFilter,
  args: {},
} as ComponentMeta<typeof ResourceTypeOperationFilter>;

const Template: ComponentStory<typeof ResourceTypeOperationFilter> = () => {
  const [checkedItems, setCheckedItems] = useState([]);
  return (
    <ResourceTypeOperationFilter
      setCheckedItems={setCheckedItems}
      checkedItems={checkedItems}
    />
  );
};

export const ResourceTypeOperationFilterStory = Template.bind({});
ResourceTypeOperationFilterStory.storyName = "ResourceTypeOperationFilter";
