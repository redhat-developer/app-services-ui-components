import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { VoidFunctionComponent } from "react";
import { DataSciencePage as DataSciencePageComp } from "./DataSciencePage";
import {
  argTypes,
  clusterResponseOptions,
  clusterResponseTypes,
} from "./Stories/storiesHelpers";

export default {
  component: DataSciencePageComp,
  args: {
    loadClusters: clusterResponseTypes[0],
  },
  argTypes,
} as ComponentMeta<VoidFunctionComponent<{ loadClusters: string }>>;

const Template: ComponentStory<
  VoidFunctionComponent<{ loadClusters: string }>
> = ({ loadClusters, ...args }) => {
  const loadClustersInternal = clusterResponseOptions[loadClusters];
  console.log({ args, loadClusters });
  return <DataSciencePageComp {...args} loadClusters={loadClustersInternal} />;
};

export const DataSciencePage = Template.bind({});
