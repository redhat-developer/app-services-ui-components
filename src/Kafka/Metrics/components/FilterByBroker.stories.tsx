import type { ComponentMeta, ComponentStory } from "@storybook/react";
import type { CSSProperties } from "react";
import { FilterByBroker } from "./FilterByBroker";

export default {
  component: FilterByBroker,
  args: {
    selectedBroker: undefined,
    brokerList: ["Broker1", "Broker2", "Broker3"],
  },
} as ComponentMeta<typeof FilterByBroker>;

const Template: ComponentStory<typeof FilterByBroker> = (
  args,
  { parameters }
) => (
  <div style={parameters.style as CSSProperties | undefined}>
    <FilterByBroker {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
