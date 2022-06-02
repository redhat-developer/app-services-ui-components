import { TableComposable } from "@patternfly/react-table";
import { Form } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { fakeApi } from "../../../shared/storiesHelpers";
import { ConsumeTopicShortcut } from "./ConsumeTopicShortcut";
import { ProduceTopicShortcut } from "./ProduceTopicShortcut";
import { ManageAccessShortcut } from "./ManageAccessShortcut";

export default {
  component: ConsumeTopicShortcut,
  args: {
    onFetchConsumerResourceNameOptions: (filter) =>
      fakeApi<string[]>(
        ["foo-consumer", "test", "my-consumer", "random-consumer-name"].filter(
          (v) => v.includes(filter)
        ),
        100
      ),
    onFetchTopicResourceNameOptions: (filter) =>
      fakeApi<string[]>(
        ["foo-topic", "test", "my-test", "random-topic-name"].filter((v) =>
          v.includes(filter)
        ),
        100
      ),
    topicPrefixRuleValue: "Starts with",
    consumerPrefixRuleValue: "Starts with",
    submitted: false,
    multipleShorctutPermissions: false,
  },
} as ComponentMeta<typeof ConsumeTopicShortcut>;

const Template: ComponentStory<typeof ConsumeTopicShortcut> = (args) => (
  <Form>
    <TableComposable variant="compact">
      <ConsumeTopicShortcut {...args} />
      <ProduceTopicShortcut
        onChange={args.onChangeTopicResourcePrefixRule}
        prefixRuleValue={"Starts with"}
        resourceNameValue={""}
        onChangeResourceName={args.onChangeTopicResourceName}
        onFetchResourceNameOptions={args.onFetchTopicResourceNameOptions}
        submitted={args.submitted}
        onDelete={args.onDelete}
        multipleShorctutPermissions={true}
      />
      <ManageAccessShortcut
        onDelete={args.onDelete}
        instanceName={"story-instance"}
      />
    </TableComposable>
  </Form>
);

export const MultipleShortcutsView = Template.bind({});
MultipleShortcutsView.args = {};

MultipleShortcutsView.parameters = {
  docs: {
    description: {
      story: "Multiple shortcuts are shown in one view",
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
