import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { KafkaSampleCode } from "./KafkaSampleCode";

export default {
  component: KafkaSampleCode,
  args: {
    value: "java",
  },
} as ComponentMeta<typeof KafkaSampleCode>;

const Template: ComponentStory<typeof KafkaSampleCode> = (args) => (
  <KafkaSampleCode {...args} />
);

export const JavaSampleCode = Template.bind({});

export const PythonSampleCode = Template.bind({});
PythonSampleCode.args = {
  value: "python",
};

export const QuarkusSampleCode = Template.bind({});
QuarkusSampleCode.args = {
  value: "quarkus",
};

export const SpringbootSampleCode = Template.bind({});
QuarkusSampleCode.args = {
  value: "springboot",
};
