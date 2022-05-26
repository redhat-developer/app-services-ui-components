import { TableComposable } from "@patternfly/react-table";
import { Form } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { fakeApi } from "../../../shared/storiesHelpers";
import { AssignPermissionsManual } from "./AssignPermissionsManual";

export default {
  component: AssignPermissionsManual,
  args: {
    onFetchResourceNameOptions: (filter) =>
      fakeApi<string[]>(
        ["foo-topic", "test", "my-test", "random-topic-name"].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    resourceType: undefined,
    // onChangeResourceType: (value: ResourceTypeValue | undefined) => void;
    submitted: false,
    resourcePrefix: "is",
    // onChangeResourcePrefix: (value: ResourcePrefixRuleValue) => void;
    resourceName: undefined,
    // onChangeResource: (value: string | undefined) => void;
    resourcePermission: "allow",
    // onChangeResourcePermission: (value: ResourcePermissionValue) => void,
    resourceOperation: undefined,
    //onChangeResourceOperation: (value: ResourceOperationValue | undefined ) => void;
    multipleShorctutPermissions: false,
  },
} as ComponentMeta<typeof AssignPermissionsManual>;

const Template: ComponentStory<typeof AssignPermissionsManual> = (args) => (
  <Form>
    <TableComposable variant="compact">
      <AssignPermissionsManual {...args} />
      {args.multipleShorctutPermissions && (
        <AssignPermissionsManual {...args} resourceType={"kafka-instance"} />
      )}
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

/*
export const PrefixRuleVariant = Template.bind({});
PrefixRuleVariant.args = {
  topicPrefixRuleValue: "is",
  consumerPrefixRuleValue: "is",
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
*/
