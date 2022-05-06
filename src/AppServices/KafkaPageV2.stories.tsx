import { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaPageV2 as KafkaPageV2Comp } from "./KafkaPageV2";

export default {
  component: KafkaPageV2Comp,
  args: {},
} as ComponentMeta<typeof KafkaPageV2Comp>;

const Template: ComponentStory<typeof KafkaPageV2Comp> = (args) => (
  <KafkaPageV2Comp {...args} />
);

export const KafkaPageV2 = Template.bind({});
