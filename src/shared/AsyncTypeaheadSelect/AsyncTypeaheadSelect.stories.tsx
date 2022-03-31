import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AsyncTypeaheadSelect } from "./AsyncTypeaheadSelect";
import {
  getSelectOptions,
  invalidTopic,
  invalidConsumerGroup,
} from "../storiesHelpers";
import { Form } from "@patternfly/react-core";
import { userEvent, within } from "@storybook/testing-library";

export default {
  component: AsyncTypeaheadSelect,
  args: {
    value: undefined,
    invalid: false,
    onFetchOptions: () => getSelectOptions("topic", 100),
    placeholderText: "Enter name",
    onValidationCheck: (value: string | undefined) => invalidTopic(""),
    resourceType: undefined,
  },
} as ComponentMeta<typeof AsyncTypeaheadSelect>;

const Template: ComponentStory<typeof AsyncTypeaheadSelect> = (args) => (
  <Form>
    <AsyncTypeaheadSelect {...args} />
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

export const InvalidTopicLength = Template.bind({});
InvalidTopicLength.args = {
  value: "..",
  invalid: true,
  onValidationCheck: (value: string | undefined) => invalidTopic(".."),
};
InvalidTopicLength.parameters = {
  docs: {
    description: {
      story: `A user types a value that is either '.' or '..' while selecting resource for a 'Topic' that has a resource prefix condition 'Is' `,
    },
  },
};
export const InvalidLength = Template.bind({});
InvalidLength.args = {
  value: "this-is-a-very-long-invalid-name-exceeding--32-characters",
  invalid: true,
  onValidationCheck: (value: string | undefined) =>
    invalidTopic("this-is-a-very-long-invalid-name-exceeding--32-characters"),
};
InvalidLength.parameters = {
  docs: {
    description: {
      story: `A user types a value that exceeds maximum characters allowed `,
    },
  },
};
export const InvalidTopicCharacters = Template.bind({});
InvalidTopicCharacters.args = {
  value: "$!",
  invalid: true,
  onValidationCheck: (value: string | undefined) => invalidTopic("$!"),
};
InvalidTopicCharacters.parameters = {
  docs: {
    description: {
      story: `A user types a value that has invalid characters `,
    },
  },
};
export const InvalidConsumerGroupCharacters = Template.bind({});
InvalidConsumerGroupCharacters.args = {
  value: "$!",
  invalid: true,
  onValidationCheck: (value: string | undefined) => invalidConsumerGroup("$!"),
};
InvalidConsumerGroupCharacters.parameters = {
  docs: {
    description: {
      story: `A user types a value that has invalid characters `,
    },
  },
};

export const PlaceHolderVariation = Template.bind({});
PlaceHolderVariation.args = { placeholderText: "Enter prefix" };
PlaceHolderVariation.parameters = {
  docs: {
    description: {
      story: `A user select prefix rule as 'Starts with', a different placeholderText is displayed for that `,
    },
  },
};

export const LoadingSuggestions = Template.bind({});
LoadingSuggestions.args = {
  onFetchOptions: () => new Promise(() => false),
};

LoadingSuggestions.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.click(await canvas.findByPlaceholderText("Enter name"));
};
LoadingSuggestions.parameters = {
  docs: {
    description: {
      story: `A user clicks on the typeahead select. Until the list of suggestions is ready to be dispayed, a spinner shows `,
    },
  },
};

export const CreatableText = Template.bind({});
CreatableText.args = {};

CreatableText.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    await canvas.findByPlaceholderText("Enter name"),
    "test-topic-name"
  );
};
CreatableText.parameters = {
  docs: {
    description: {
      story: `A user clicks on the typeahead select and types a value. a cretable suggestion appears in the typeaead select list of options`,
    },
  },
};
