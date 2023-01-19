import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { KafkaSampleCode } from "./KafkaSampleCode";

export default {
  component: KafkaSampleCode,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof KafkaSampleCode>;

const Template: ComponentStory<typeof KafkaSampleCode> = (args) => (
  <KafkaSampleCode {...args} />
);

export const SampleCodeSnippet = Template.bind({});
