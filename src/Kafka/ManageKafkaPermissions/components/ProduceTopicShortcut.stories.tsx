import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ProduceTopicShortcut } from "./ProduceTopicShortcut";
import { TableComposable } from "@patternfly/react-table";

export default {
  component: ProduceTopicShortcut,
  args: {
    prefixRuleValue: "Starts with",
    submitted: false,
    onFetchResourceNameOptions: (filter: string) => {
      return ["foo-topic", "test", "my-test", "random-topic-name"].filter((v) =>
        v.includes(filter)
      );
    },
  },
} as ComponentMeta<typeof ProduceTopicShortcut>;

const Template: ComponentStory<typeof ProduceTopicShortcut> = (args) => (
  <TableComposable variant="compact">
    <ProduceTopicShortcut {...args} />
  </TableComposable>
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
  prefixRuleValue: "Is",
  multipleShorctutPermissions: false,
};

PrefixRuleVariant.parameters = {
  docs: {
    description: {
      story: `Story variant when the prefix rule is set to 'is'`,
    },
  },
};
