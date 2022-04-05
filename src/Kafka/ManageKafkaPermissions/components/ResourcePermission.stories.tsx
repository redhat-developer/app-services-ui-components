import { Modal, Form } from "@patternfly/react-core";
import { ComponentMeta, ComponentStory } from "@storybook/react";

import { ResourcePermission } from "./ResourcePermission";

export default {
  component: ResourcePermission,
  args: {
    value: "allow",
  },
} as ComponentMeta<typeof ResourcePermission>;

const Template: ComponentStory<typeof ResourcePermission> = (args, { id }) => {
  return (
    <div id={id} style={{ transform: "scale(1)", minHeight: 450 }}>
      <Modal
        title="Simple modal header"
        isOpen={true}
        appendTo={() => document.getElementById(id) || document.body}
        disableFocusTrap={true}
      >
        <Form>
          <ResourcePermission {...args} />
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

export const InitialState = Template.bind({});
InitialState.args = { value: "Allow" };
InitialState.parameters = {
  docs: {
    description: {
      story: `A default value 'Allow' is initially given to the permission select option`,
    },
  },
};
