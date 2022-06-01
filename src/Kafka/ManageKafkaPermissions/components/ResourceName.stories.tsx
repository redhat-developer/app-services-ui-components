import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ResourceName } from "./ResourceName";
import { Form } from "@patternfly/react-core";
import { userEvent, within } from "@storybook/testing-library";
import { fakeApi } from "../../../shared/storiesHelpers";

export default {
  component: ResourceName,
  args: {
    value: undefined,
    onFetchOptions: (filter) =>
      fakeApi<string[]>(
        ["foo-topic", "test", ",my-test", "random-topic-name"].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    submitted: false,
    resourcePrefixRule: "is",
    resourceType: "topic",
  },
} as ComponentMeta<typeof ResourceName>;

const Template: ComponentStory<typeof ResourceName> = (args) => (
  <div style={{ maxWidth: 200 }}>
    <Form>
      <ResourceName {...args} />
    </Form>
  </div>
);

export const InvalidTopicName = Template.bind({});
InvalidTopicName.args = {};

InvalidTopicName.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await userEvent.type(await canvas.findByPlaceholderText("Enter name"), "..");
  await userEvent.click(await canvas.findByText('Use ".."'));
};

InvalidTopicName.parameters = {
  docs: {
    description: {
      story: `A user types a value that is either '.' or '..' while selecting resource for a 'Topic' that has a resource prefix condition 'Is' `,
    },
  },
};

export const InvalidLength = Template.bind({});
InvalidLength.args = {};
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
  resourceType: "consumer-group",
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
InvalidTopicCharacters.args = {};
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

export const PrefixRuleVariation = Template.bind({});
PrefixRuleVariation.args = { resourcePrefixRule: "starts-with" };
PrefixRuleVariation.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  await canvas.findByPlaceholderText("Enter prefix");
};
PrefixRuleVariation.parameters = {
  docs: {
    description: {
      story: `Resource name variation when prefix rule is 'starts-with'`,
    },
  },
};
