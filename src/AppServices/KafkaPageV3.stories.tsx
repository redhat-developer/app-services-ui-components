import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaPageV3 as KafkaPageV3Comp } from "./KafkaPageV3";

export default {
  component: KafkaPageV3Comp,
  args: {},
} as ComponentMeta<typeof KafkaPageV3Comp>;

const Template: ComponentStory<typeof KafkaPageV3Comp> = (args) => (
  <KafkaPageV3Comp {...args} />
);

export const KafkaPageV3 = Template.bind({});
