import { ComponentMeta, ComponentStory } from "@storybook/react";
import { OverviewPageV2 } from "./OverviewPageV2";

export default {
  component: OverviewPageV2,
  args: {
    toKafkaHref: "/to-kafka",
    toServiceRegistryHref: "/to-service",
    toConnectorsHref: "/to-connectors",
  },
} as ComponentMeta<typeof OverviewPageV2>;

const Template: ComponentStory<typeof OverviewPageV2> = (args) => (
  <OverviewPageV2 {...args} />
);

export const Example = Template.bind({});
