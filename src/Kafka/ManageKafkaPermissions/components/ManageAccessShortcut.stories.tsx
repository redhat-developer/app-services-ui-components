import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { ManageAccessShortcut } from "./ManageAccessShortcut";
import { Form } from "@patternfly/react-core";
import { TableComposable } from "@patternfly/react-table";

export default {
  component: ManageAccessShortcut,
  args: { instanceName: "story-instance" },
} as ComponentMeta<typeof ManageAccessShortcut>;

const Template: ComponentStory<typeof ManageAccessShortcut> = (args) => (
  <Form>
    <TableComposable variant="compact">
      <ManageAccessShortcut {...args} />
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
