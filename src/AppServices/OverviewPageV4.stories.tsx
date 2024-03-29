import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { OverviewPageV4 as OverviewPageV4Comp } from "./OverviewPageV4";

export default {
  component: OverviewPageV4Comp,
} as ComponentMeta<typeof OverviewPageV4Comp>;

const Template: ComponentStory<typeof OverviewPageV4Comp> = (args) => (
  <OverviewPageV4Comp {...args} />
);

export const OverviewPageV4 = Template.bind({});
