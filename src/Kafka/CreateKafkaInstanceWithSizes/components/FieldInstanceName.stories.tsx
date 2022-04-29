import { Form } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { FieldInstanceName as FieldInstanceNameComp } from "./FieldInstanceName";

export default {
  component: FieldInstanceNameComp,
  args: {
    validity: "valid",
  },
} as ComponentMeta<typeof FieldInstanceNameComp>;

const Template: ComponentStory<typeof FieldInstanceNameComp> = (args) => (
  <Form>
    <FieldInstanceNameComp {...args} />
  </Form>
);

export const Default = Template.bind({});

export const Required = Template.bind({});
Required.args = {
  validity: "required",
};

export const Invalid = Template.bind({});
Invalid.args = {
  value: "(╯°□°)╯︵ ┻━┻ ",
  validity: "invalid",
};

export const Taken = Template.bind({});
Taken.args = {
  value: "Pizza",
  validity: "taken",
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "Pizza",
  isDisabled: true,
};
