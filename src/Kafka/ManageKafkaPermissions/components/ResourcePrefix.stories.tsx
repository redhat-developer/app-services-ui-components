import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResourcePrefix } from "./ResourcePrefix";
import { Form } from "@patternfly/react-core";

export default {
  component: ResourcePrefix,
  args: {
    value: undefined,
    invalid: false,
  },
} as ComponentMeta<typeof ResourcePrefix>;

const Template: ComponentStory<typeof ResourcePrefix> = (args) => (
  <Form>
    <ResourcePrefix {...args} />
  </Form>
);

export const InitialState = Template.bind({});
InitialState.args = {};
InitialState.parameters = {
  docs: {
    description: {
      story: `Initial, empty state of the text input with placeholder text. A user can type a prefix value `,
    },
  },
};

export const ValidInput = Template.bind({});
ValidInput.args = { value: "pet" };
ValidInput.parameters = {
  docs: {
    description: {
      story: `A user types a valid prefix value `,
    },
  },
};

export const InvalidInput = Template.bind({});
InvalidInput.args = { value: undefined, invalid: true };
InvalidInput.parameters = {
  docs: {
    description: {
      story: `A user clicks submit without entering a valid value `,
    },
  },
};
