import { Form, Modal } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ResourcePrefixRule } from "./ResourcePrefixRule";

export default {
  component: ResourcePrefixRule,
  args: {},
} as ComponentMeta<typeof ResourcePrefixRule>;

const Template: ComponentStory<typeof ResourcePrefixRule> = (args, { id }) => {
  return (
    <div id={id} style={{ transform: "scale(1)", minHeight: 450 }}>
      <Modal
        title="Simple modal header"
        isOpen={true}
        appendTo={() => document.getElementById(id) || document.body}
        disableFocusTrap={true}
      >
        <Form>
          <ResourcePrefixRule {...args} />
        </Form>
      </Modal>
    </div>
  );
};

export const WorksWithModal = Template.bind({});
WorksWithModal.args = { initialOpen: true, value: "Starts with" };
WorksWithModal.parameters = {
  docs: {
    description: {
      story: `Story to show behaviour of select when inside a modal `,
    },
  },
};

export const InitialState = Template.bind({});
InitialState.args = { value: "Starts with" };
InitialState.parameters = {
  docs: {
    description: {
      story: `A default value 'Is' is initially given to the permission select option`,
    },
  },
};
