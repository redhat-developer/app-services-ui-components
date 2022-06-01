import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaPage as KafkaPageComp } from "./KafkaPage";

export default {
  component: KafkaPageComp,
  args: {},
} as ComponentMeta<typeof KafkaPageComp>;

const Template: ComponentStory<typeof KafkaPageComp> = (args) => (
  <KafkaPageComp {...args} />
);

export const KafkaPage = Template.bind({});
