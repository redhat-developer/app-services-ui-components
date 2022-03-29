import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResourcePrefix } from "./ResourcePrefix";
import { getSelectOptions } from "../storiesHelpers";
import { Form } from "@patternfly/react-core";

export default {
  component: ResourcePrefix,
  args: {
    value: undefined,
    invalid: false,
    onFetchOptions: () => getSelectOptions("topic", 100),
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
      story: `Initial, empty state of the typeahead select with placeholder text. A user can type a prefix value and select from a list of suggestions `,
    },
  },
};

export const ValidInput = Template.bind({});
ValidInput.args = { value: "topic" };
ValidInput.parameters = {
  docs: {
    description: {
      story: `A user selects a valid prefix value `,
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

export const PlaceHolderVariation = Template.bind({});
PlaceHolderVariation.args = { resourceCondition: "Starts with" };
PlaceHolderVariation.parameters = {
  docs: {
    description: {
      story: `A user select prefix rule as 'Starts with', a different placeholderText is displayed for that `,
    },
  },
};
