import { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaPage } from "./KafkaPage";

export default {
  component: KafkaPage,
  args: {},
} as ComponentMeta<typeof KafkaPage>;

const Template: ComponentStory<typeof KafkaPage> = (args) => (
  <KafkaPage {...args} />
);

export const Example = Template.bind({});
