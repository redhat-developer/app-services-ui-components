import { Form } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { FieldAZ as FieldAZComp } from "./FieldAZ";

export default {
  component: FieldAZComp,
  args: {
    value: undefined,
    validity: "valid",
    options: "multi",
    isDisabled: false,
  },
} as ComponentMeta<typeof FieldAZComp>;

const Template: ComponentStory<typeof FieldAZComp> = (args) => (
  <Form>
    <FieldAZComp {...args} />
  </Form>
);

export const Single = Template.bind({});
Single.args = {
  options: "single",
};

export const Multi = Template.bind({});
Multi.args = {
  options: "multi",
};

export const All = Template.bind({});
All.args = {
  options: "all",
};

export const Required = Template.bind({});
Required.args = {
  validity: "required",
};

export const Disabled = Template.bind({});
Disabled.args = {
  isDisabled: true,
};
