import { Form } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { PROVIDERS } from "../Stories/storiesHelpers";

import { FieldCloudProvider as FieldCloudProviderComp } from "./FieldCloudProvider";

export default {
  component: FieldCloudProviderComp,
  args: {
    providers: PROVIDERS,
    isValid: true,
  },
} as ComponentMeta<typeof FieldCloudProviderComp>;

const Template: ComponentStory<typeof FieldCloudProviderComp> = (args) => (
  <Form>
    <FieldCloudProviderComp {...args} />
  </Form>
);

export const Default = Template.bind({});

export const Selected = Template.bind({});
Selected.args = {
  value: PROVIDERS[0].id,
};

export const Invalid = Template.bind({});
Invalid.args = {
  value: "(╯°□°)╯︵ ┻━┻ ",
  isValid: false,
};

export const Disabled = Template.bind({});
Disabled.args = {
  value: "Pizza",
  isDisabled: true,
};
