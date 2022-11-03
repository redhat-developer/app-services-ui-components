import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { CSSProperties } from "react";
import { FilterByPartition } from "./FilterByPartition";

export default {
  component: FilterByPartition,
  args: {
    selectedpartition: undefined,
    partitionList: ["Partition1", "Partition2", "Partition3"],
  },
} as ComponentMeta<typeof FilterByPartition>;

const Template: ComponentStory<typeof FilterByPartition> = (
  args,
  { parameters }
) => (
  <div style={parameters.style as CSSProperties | undefined}>
    <FilterByPartition {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
