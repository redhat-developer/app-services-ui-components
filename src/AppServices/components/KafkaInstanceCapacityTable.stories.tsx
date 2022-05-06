import { ComponentStory, ComponentMeta } from "@storybook/react";
import { KafkaInstanceCapacityTable } from "./KafkaInstanceCapacityTable";

export default {
  component: KafkaInstanceCapacityTable,
} as ComponentMeta<typeof KafkaInstanceCapacityTable>;

const Template: ComponentStory<typeof KafkaInstanceCapacityTable> = (args) => (
  <KafkaInstanceCapacityTable {...args} />
);

export const CapacityTable = Template.bind({});
