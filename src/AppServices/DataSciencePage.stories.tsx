import { ComponentMeta, ComponentStory } from "@storybook/react";
import { DataSciencePage as DataSciencePageComp } from "./DataSciencePage";

export default {
  component: DataSciencePageComp,
  args: {},
} as ComponentMeta<typeof DataSciencePageComp>;

const Template: ComponentStory<typeof DataSciencePageComp> = (args) => (
  <DataSciencePageComp {...args} />
);

export const DataSciencePage = Template.bind({});
