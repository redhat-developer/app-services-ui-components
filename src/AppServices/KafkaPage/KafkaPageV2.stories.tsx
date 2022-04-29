import { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaPageV2 } from "./KafkaPageV2";

export default {
  component: KafkaPageV2,
  args: {},
} as ComponentMeta<typeof KafkaPageV2>;

const Template: ComponentStory<typeof KafkaPageV2> = (args) => (
  <KafkaPageV2 {...args} />
);

export const Example = Template.bind({});
