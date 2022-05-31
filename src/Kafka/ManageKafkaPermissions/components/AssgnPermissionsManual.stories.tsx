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
    submitted: false,
    resourcePrefix: "is",
    resourceName: undefined,
    resourcePermission: "allow",
    resourceOperation: undefined,
    multipleShorctutPermissions: false,
  },
} as ComponentMeta<typeof AssignPermissionsManual>;

const Template: ComponentStory<typeof AssignPermissionsManual> = (args) => (
  <Form>
    <TableComposable variant="compact">
      <AssignPermissionsManual {...args} />
      {args.multipleShorctutPermissions && (
        <AssignPermissionsManual {...args} />
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

export const MultiplePermissionsExist = Template.bind({});
MultiplePermissionsExist.args = { multipleShorctutPermissions: true };

MultiplePermissionsExist.parameters = {
  docs: {
    description: {
      story: "Multiple rows exist in assign permissions",
    },
  },
};

export const PrefixRuleVariant = Template.bind({});
PrefixRuleVariant.args = {
  resourcePrefix: "Starts with",
};

PrefixRuleVariant.parameters = {
  docs: {
    description: {
      story: `Story variant when the prefix rule is set to 'starts-with'`,
    },
  },
};

export const KafkaInstancePermission = Template.bind({});
KafkaInstancePermission.args = {
  resourceType: "kafka-instance",
};

KafkaInstancePermission.parameters = {
  docs: {
    description: {
      story: `Story variant when the resource type is 'Kafka Instance'`,
    },
  },
};
export const TopicPermission = Template.bind({});
TopicPermission.args = {
  resourceType: "topic",
};

TopicPermission.parameters = {
  docs: {
    description: {
      story: `Story variant when the resource type is 'Topic'`,
    },
  },
};
export const ConsumerGroupPermission = Template.bind({});
ConsumerGroupPermission.args = {
  resourceType: "consumer-group",
};

ConsumerGroupPermission.parameters = {
  docs: {
    description: {
      story: `Story variant when the resource type is 'Consumer group'`,
    },
  },
};
export const TransactionalIdPermission = Template.bind({});
TransactionalIdPermission.args = {
  resourceType: "transactional-id",
};

TransactionalIdPermission.parameters = {
  docs: {
    description: {
      story: `Story variant when the resource type is 'Transactional-id'`,
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
