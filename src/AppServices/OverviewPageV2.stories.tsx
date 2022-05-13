import { ComponentMeta, ComponentStory } from "@storybook/react";
import { OverviewPageV2 as OverviewPageV2Comp } from "./OverviewPageV2";

export default {
  component: OverviewPageV2Comp,
  args: {
    toKafkaHref: "/to-kafka",
    toServiceRegistryHref: "/to-service",
    toConnectorsHref: "/to-connectors",
  },
} as ComponentMeta<typeof OverviewPageV2Comp>;

const Template: ComponentStory<typeof OverviewPageV2Comp> = (args) => (
  <OverviewPageV2Comp {...args} />
);

export const OverviewPageV2 = Template.bind({});
