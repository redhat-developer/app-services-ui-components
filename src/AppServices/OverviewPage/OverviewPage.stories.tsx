import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { OverviewPage } from "./OverviewPage";

export default {
  component: OverviewPage,
  args: {
    toKafkaHref: "/to-kafka",
    toServiceRegistryHref: "/to-service",
  },
} as ComponentMeta<typeof OverviewPage>;

const Template: ComponentStory<typeof OverviewPage> = (args) => (
  <OverviewPage {...args} />
);

export const Example = Template.bind({});
