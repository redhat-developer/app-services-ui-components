import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { JavaConfigCodeSnippet } from "./JavaConfigCodeSnippet";

export default {
  component: JavaConfigCodeSnippet,
  args: {},
  parameters: {
    backgrounds: {
      default: "Background color 100",
    },
  },
} as ComponentMeta<typeof JavaConfigCodeSnippet>;

const Template: ComponentStory<typeof JavaConfigCodeSnippet> = (args) => (
  <JavaConfigCodeSnippet {...args} />
);

export const JavaConfigCode = Template.bind({});
