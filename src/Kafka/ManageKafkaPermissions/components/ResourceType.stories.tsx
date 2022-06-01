import { Form, Modal } from "@patternfly/react-core";
import type { ComponentMeta, ComponentStory } from "@storybook/react";

import { ResourceType } from "./ResourceType";

export default {
  component: ResourceType,
  args: {
    value: undefined,
    invalid: false,
  },
} as ComponentMeta<typeof ResourceType>;

const Template: ComponentStory<typeof ResourceType> = (args, { id }) => {
  return (
    <div id={id} style={{ transform: "scale(1)", minHeight: 450 }}>
      <Modal
        title="Simple modal header"
        isOpen={true}
        appendTo={() => document.getElementById(id) || document.body}
        disableFocusTrap={true}
      >
        <Form>
          <ResourceType {...args} />
        </Form>
      </Modal>
    </div>
  );
};

export const WorksWithModal = Template.bind({});
WorksWithModal.args = { initialOpen: true };
WorksWithModal.parameters = {
  docs: {
    description: {
      story: `Story to show behaviour of select when inside a modal `,
    },
  },
};
export const InvalidSelection = Template.bind({});
InvalidSelection.args = { invalid: true };
InvalidSelection.parameters = {
  docs: {
    description: {
      story: `Form error when user clicks on submit without selecting a valid value `,
    },
  },
};

export const ValidSelection = Template.bind({});
ValidSelection.args = { value: "topic" };
ValidSelection.parameters = {
  docs: {
    description: {
      story: `When a user selects a valid value from the dropdown `,
    },
  },
};
