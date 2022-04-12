import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AsyncTypeaheadSelect } from "../../../shared";
import { validationCheck } from "../storiesHelpers";
import { Form } from "@patternfly/react-core";
import { userEvent, within } from "@storybook/testing-library";
import { fakeApi } from "../../../shared/storiesHelpers";

export default {
  component: AsyncTypeaheadSelect,
  args: {
    id: "sample",
    value: undefined,
    ariaLabel: "my aria label",
    onFetchOptions: (filter) =>
      fakeApi<string[]>(
        ["foo-topic", "test", ",my-test", "random-topic-name"].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    onValidationCheck: () => ({ isValid: true, message: undefined }),
    placeholderText: "Enter name",
  },
} as ComponentMeta<typeof AsyncTypeaheadSelect>;

const Template: ComponentStory<typeof AsyncTypeaheadSelect> = (args) => (
  <div style={{ maxWidth: 200 }}>
    <Form>
      <AsyncTypeaheadSelect {...args} />
    </Form>
  </div>
);

export const InvalidTopicLength = Template.bind({});
InvalidTopicLength.args = {
  onValidationCheck: () => validationCheck("topic", "is", ".."),
};

InvalidTopicLength.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(await canvas.findByPlaceholderText("Enter name"), "..");
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
  onValidationCheck: () =>
    validationCheck(
      "topic",
      "starts-with",
      "this-is-a-very-long-invalid-name-exceeding--32-characters"
    ),
};
InvalidLength.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(
    await canvas.findByPlaceholderText("Enter name"),
    "this-is-a-very-long-invalid-name-exceeding--32-characters"
  );
};

InvalidLength.parameters = {
  docs: {
    description: {
      story: `A user types a value that exceeds maximum characters allowed `,
    },
  },
};

export const InvalidConsumerGroupCharacters = Template.bind({});
InvalidConsumerGroupCharacters.args = {
  onValidationCheck: () =>
    validationCheck("consumer-group", "starts-with", "$!"),
};
InvalidConsumerGroupCharacters.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(await canvas.findByPlaceholderText("Enter name"), "$!");
};
InvalidConsumerGroupCharacters.parameters = {
  docs: {
    description: {
      story: `A user types a value that has invalid characters for a Consumer group resource `,
    },
  },
};

export const RequiredField = Template.bind({});
RequiredField.args = {
  required: true,
  submitted: true,
};
RequiredField.parameters = {
  docs: {
    description: {
      story: `A user submits form without selecting or creating a value in the field `,
    },
  },
};

export const InvalidTopicCharacters = Template.bind({});
InvalidTopicCharacters.args = {
  onValidationCheck: () => validationCheck("topic", "starts-with", "$!"),
};
InvalidTopicCharacters.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(await canvas.findByPlaceholderText("Enter name"), "$!");
};
InvalidTopicCharacters.parameters = {
  docs: {
    description: {
      story: `A user types a value that has invalid characters for a topic resource `,
    },
  },
};
