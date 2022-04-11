import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AsyncTypeaheadSelect } from "./AsyncTypeaheadSelect";
import { Form } from "@patternfly/react-core";
import { userEvent, within } from "@storybook/testing-library";
import { fakeApi } from "../storiesHelpers";

export default {
  component: AsyncTypeaheadSelect,
  args: {
    id: "sample",
    value: undefined,
    ariaLabel: "my aria label",
    onFetchOptions: (filter) =>
      fakeApi<string[]>(
        ["foo", "bar", "baz", `random ${Math.random()}`].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    onValidationCheck: () => ({ isValid: true, message: undefined }),
    placeholderText: "Enter name",
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
      story: `Initial, empty state of the async typeahead with a placeholder text. A user can type a prefix value and select from a list of suggestions `,
    },
  },
};

export const ValidInput = Template.bind({});
ValidInput.args = { value: "foo" };
ValidInput.parameters = {
  docs: {
    description: {
      story: `A user selects a valid value `,
    },
  },
};

export const PlaceHolderVariation = Template.bind({});
PlaceHolderVariation.args = { placeholderText: "Enter prefix" };
PlaceHolderVariation.parameters = {
  docs: {
    description: {
      story: `A variation of the async typeahead with a different placholder`,
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
      story: `A user clicks on the async typeahead. Until the list of suggestions is ready to be dispayed, a spinner shows `,
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
