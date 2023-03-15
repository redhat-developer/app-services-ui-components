import { TableComposable } from "@patternfly/react-table";
import { Form } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ConsumeTopicShortcut } from "./ConsumeTopicShortcut";

export default {
  component: ConsumeTopicShortcut,
  args: {
    onFetchConsumerResourceNameOptions: (filter: string) => {
      return [
        "foo-consumer",
        "test",
        "my-consumer",
        "random-consumer-name",
      ].filter((v) => v.includes(filter));
    },
    onFetchTopicResourceNameOptions: (filter: string) => {
      return ["foo-topic", "test", "my-test", "random-topic-name"].filter((v) =>
        v.includes(filter)
      );
    },
    topicPrefixRuleValue: "Starts with",
    consumerPrefixRuleValue: "Starts with",
    submitted: false,
  },
} as ComponentMeta<typeof ConsumeTopicShortcut>;

const Template: ComponentStory<typeof ConsumeTopicShortcut> = (args) => (
  <Form>
    <TableComposable variant="compact">
      <ConsumeTopicShortcut {...args} />
    </TableComposable>
  </Form>
);

export const OnlyRowInTheTable = Template.bind({});
OnlyRowInTheTable.args = { multipleShorctutPermissions: false };

OnlyRowInTheTable.parameters = {
  docs: {
    description: {
      story:
        "This is the first row in the table, we see the table headers in this scenario",
    },
  },
};

export const MultipleRowsExist = Template.bind({});
MultipleRowsExist.args = { multipleShorctutPermissions: true };

MultipleRowsExist.parameters = {
  docs: {
    description: {
      story:
        "Rows in assign permission already exist, in this scenario table header is not visible",
    },
  },
};

export const PrefixRuleVariant = Template.bind({});
PrefixRuleVariant.args = {
  topicPrefixRuleValue: "Is",
  consumerPrefixRuleValue: "Is",
  multipleShorctutPermissions: false,
};

PrefixRuleVariant.parameters = {
  docs: {
    description: {
      story: `Story variant when the prefix rule is set to 'is'`,
    },
  },
};
export const FormSubmitted = Template.bind({});
FormSubmitted.args = {
  submitted: true,
};

FormSubmitted.parameters = {
  docs: {
    description: {
      story: `Form submitted without providing value`,
    },
  },
};
