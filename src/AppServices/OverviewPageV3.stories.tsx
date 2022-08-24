import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { OverviewPageV3 as OverviewPageV3Comp } from "./OverviewPageV3";

export default {
  component: OverviewPageV3Comp,
  args: {
    toKafkaHref: "/to-kafka",
    toServiceRegistryHref: "/to-service",
    toConnectorsHref: "/to-connectors",
  },
} as ComponentMeta<typeof OverviewPageV3Comp>;

const Template: ComponentStory<typeof OverviewPageV3Comp> = (args) => (
  <OverviewPageV3Comp {...args} />
);

export const OverviewPageV3 = Template.bind({});
