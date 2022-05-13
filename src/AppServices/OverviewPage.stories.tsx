import { ComponentMeta, ComponentStory } from "@storybook/react";
import { OverviewPage as OverviewPageComp } from "./OverviewPage";

export default {
  component: OverviewPageComp,
  args: {
    toKafkaHref: "/to-kafka",
    toServiceRegistryHref: "/to-service",
  },
} as ComponentMeta<typeof OverviewPageComp>;

const Template: ComponentStory<typeof OverviewPageComp> = (args) => (
  <OverviewPageComp {...args} />
);

export const OverviewPage = Template.bind({});
