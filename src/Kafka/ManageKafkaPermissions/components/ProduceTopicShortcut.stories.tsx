import { ComponentMeta, ComponentStory } from "@storybook/react";
import { fakeApi } from "../../../shared/storiesHelpers";
import { ProduceTopicShortcut } from "./ProduceTopicShortcut";
import { Form } from "@patternfly/react-core";

export default {
  component: ProduceTopicShortcut,
  args: {
    prefixRuleValue: "starts-with",
    submitted: false,
    onFetchResourceNameOptions: (filter) =>
      fakeApi<string[]>(
        [
          "foo-topic",
          "test",
          "my-test",
          "random-topic-name",
          "...topic",
        ].filter((v) => v.includes(filter)),
        100
      ),
  },
} as ComponentMeta<typeof ProduceTopicShortcut>;

const Template: ComponentStory<typeof ProduceTopicShortcut> = (args) => (
  <Form>
    <ProduceTopicShortcut {...args} />
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
  prefixRuleValue: "is",
  multipleShorctutPermissions: false,
};

PrefixRuleVariant.parameters = {
  docs: {
    description: {
      story: `Story variant when the prefix rule is set to 'is'`,
    },
  },
};
