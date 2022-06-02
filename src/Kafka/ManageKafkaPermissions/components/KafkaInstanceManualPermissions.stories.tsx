import { TableComposable } from "@patternfly/react-table";
import { Form } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { KafkaInstanceManualPermissions } from "./KafkaInstanceManualPermissions";

export default {
  component: KafkaInstanceManualPermissions,
  args: {
    resourceType: "kafka-instance",
    submitted: false,
    resourcePermission: "allow",
    resourceOperation: undefined,
  },
} as ComponentMeta<typeof KafkaInstanceManualPermissions>;

const Template: ComponentStory<typeof KafkaInstanceManualPermissions> = (
  args
) => (
  <Form>
    <TableComposable variant="compact">
      <KafkaInstanceManualPermissions {...args} />
    </TableComposable>
  </Form>
);

export const MultipleRowsExist = Template.bind({});
MultipleRowsExist.args = {
  resourceType: "kafka-instance",
};

MultipleRowsExist.parameters = {
  docs: {
    description: {
      story:
        "Rows in assign permission already exist, in this scenario table header is not visible",
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
